import {createStripeIntent} from '@/app/(main)/checkout/actions';
import {formatAmountForStripe} from '@/utils/integer';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import React from 'react';

import {useCartStore} from '@/stores/cart';

import {Button} from '../ui/button';
import {useToast} from '../ui/use-toast';
import {StepperComponentProps} from './utils';

export default function Payment(props: StepperComponentProps) {
  const {personalInfo, shippingInfo, items, totalCost} = useCartStore((state) => state);

  const {title} = props;

  const stripe = useStripe();
  const elements = useElements();
  const {toast} = useToast();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await elements.submit();

    // get stripe intent key
    const clientSecret = await createStripeIntent(formatAmountForStripe(totalCost, 'usd'), {
      cart: {
        totalCost,
        items,
      },
    });

    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/checkout/success`,
        payment_method_data: {
          billing_details: {
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              country: shippingInfo.country,
              postal_code: shippingInfo.zip,
            },
            name: `${personalInfo.lastName} ${personalInfo.firstName}`,
            phone: personalInfo.phone,
          },
        },
      },
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: error?.message || 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="w-[405px]">
      <div className="flex">
        <h5 className="font-sans text-lg">{title}</h5>
      </div>

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />

        <Button className="mt-8" disabled={isLoading || !stripe || !elements} id="submit">
          Pay now
        </Button>
      </form>
    </div>
  );
}
