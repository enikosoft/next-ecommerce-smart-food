import {OrderItems, OrderStatus} from '@prisma/client';
import {headers} from 'next/headers';
import {NextResponse} from 'next/server';
import {Stripe} from 'stripe';

import prismadb from '@/lib/prismadb';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) as Stripe;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, {status: 400});
    }

    switch (event.type) {
      case 'payment_intent.created':
        const paymentIntenCreated = event.data.object;
        const cart = paymentIntenCreated.metadata.cart ? JSON.parse(paymentIntenCreated.metadata.cart) : [];
        const userId = paymentIntenCreated.metadata.userId;

        const cartItemsVal = (cart?.items as Pick<OrderItems, 'productId' | 'price' | 'quantity'>[]) || [];
        const totalCostVal = cart.totalCost;

        const result = await prismadb.orders.create({
          data: {
            userId,
            totalCost: totalCostVal,
            status: OrderStatus.IN_PROGRESS,
            orderItems: {
              createMany: {
                data: cartItemsVal,
              },
            },
          },
        });

        await stripe?.paymentIntents.update(paymentIntenCreated.id as string, {
          metadata: {
            orderId: result.id,
          },
        });

        break;
      case 'payment_intent.succeeded':
        const paymentIntenSucceeded = event.data.object;
        break;
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;

        const paymentIntent = await stripe?.paymentIntents.retrieve(chargeSucceeded.payment_intent as string);
        const orderId = paymentIntent.metadata?.orderId;
        const formattedOrderId = orderId && Number(orderId);
        const userDetails = chargeSucceeded?.billing_details;

        if (formattedOrderId) {
          await prismadb.orders.update({
            where: {id: formattedOrderId},
            data: {
              status: OrderStatus.SUCCESSED,
              userPhone: userDetails.phone,
              userName: userDetails.name || '',
              shipping: {
                create: {
                  county: userDetails.address?.country!,
                  city: userDetails.address?.city!,
                  postCode: userDetails.address?.postal_code!,
                  address: userDetails.address?.line1!,
                },
              },
            },
          });
        }
        break;

      case 'charge.failed':
        const chargeFailed = event.data.object;
        const paymentIntentForFail = await stripe?.paymentIntents.retrieve(chargeFailed.payment_intent as string);
        const orderIdForFail = paymentIntentForFail.metadata?.orderId;
        const formattedOrderIdForFail = orderIdForFail && Number(orderIdForFail);
        const userDetailsForFail = chargeFailed?.billing_details;

        if (formattedOrderIdForFail) {
          await prismadb.orders.update({
            where: {id: formattedOrderIdForFail},
            data: {
              status: OrderStatus.FAILED,
              userPhone: userDetailsForFail.phone,
              userName: userDetailsForFail.name || '',
            },
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json('ok');
  } catch (error) {
    console.log('[STRIPE_WEBHOOK]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}
