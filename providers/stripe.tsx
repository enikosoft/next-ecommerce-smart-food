import {Elements} from '@stripe/react-stripe-js';
import {StripeElementsOptions, loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const appearance = {
  theme: 'stripe',
  rules: {
    '.Label': {
      opacity: '0',
    },
    '.Input': {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #8e9294',
      lineHeight: '24px',
    },
    '.Input:focus': {
      outline: 'none',
      boxShadow: 'none',
      border: '1px solid #90c12d',
    },
  },
};

const options = {
  mode: 'payment',
  amount: 1000,
  currency: 'usd',
  appearance,
  paymentMethodOrder: ['paypal', 'apple_pay', 'google_pay', 'card'],
  locale: 'en',
} as StripeElementsOptions;

export const StripeProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
};
