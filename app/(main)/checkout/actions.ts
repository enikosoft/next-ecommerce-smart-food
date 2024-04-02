'use server';

import {auth} from '@clerk/nextjs';

import {CartItem} from '@/lib/types';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createStripeIntent(amount: number, metadata: {cart: {items: CartItem[]; totalCost: number}}) {
  const {userId} = auth();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      cart: JSON.stringify({
        items: metadata.cart.items.map((item) => ({
          productId: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
        })),
        totalCost: metadata.cart.totalCost,
      }),
      userId,
    },
  });

  return paymentIntent.client_secret;
}
