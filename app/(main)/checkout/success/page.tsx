import {getOrder} from '@/data/fetchers/getOrder';
import {redirect} from 'next/navigation';
import Stripe from 'stripe';

import {Order} from '@/lib/types';

import CompletedOrder from '@/components/checkout/CompletedOrder';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) as Stripe;

const Page = async ({searchParams}: {params: {slug: string}; searchParams?: {payment_intent: string} | undefined}) => {
  if (!searchParams?.payment_intent) {
    redirect('/checkout');
  }

  const stripeIntent = await stripe?.paymentIntents.retrieve(searchParams.payment_intent);

  const orderId = stripeIntent.metadata.orderId;

  if (!stripeIntent || !orderId) {
    redirect('/checkout');
  }

  const order: Order | null = await getOrder(Number(orderId));

  if (!order) {
    redirect('/checkout');
  }

  return (
    <div className="z-10 h-auto w-full rounded-md bg-white px-4 py-8 sm:max-h-[600px] sm:max-w-[500px] sm:px-0">
      <CompletedOrder order={order} />
    </div>
  );
};

export default Page;
