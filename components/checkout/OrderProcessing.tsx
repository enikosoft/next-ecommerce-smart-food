'use client';

import {StripeProvider} from '@/providers/stripe';
import React, {useState} from 'react';

import Payment from './Payment';
import PersonalInfo from './PersonalInfo';
import ShippingInfo from './ShippingInfo';
import Stepper from './Stepper';

export default function OrderProcessing() {
  const STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  const data = [
    {
      step: 1,
      title: 'Personal Information',
      component: (
        <PersonalInfo title="Personal Information" currentStep={currentStep} step={1} onChangeStep={handleChangeStep} />
      ),
    },
    {
      step: 2,
      title: 'Shipping',
      component: <ShippingInfo title="Shipping" currentStep={currentStep} step={2} onChangeStep={handleChangeStep} />,
    },
    {
      step: 3,
      title: 'Payment',
      component: (
        <StripeProvider>
          <Payment title="Payment" currentStep={currentStep} step={3} onChangeStep={handleChangeStep} />
        </StripeProvider>
      ),
    },
  ];

  return <Stepper steps={STEPS} currentStep={currentStep} data={data} />;
}
