import React from 'react';

import {cn} from '@/lib/utils';

export default function Stepper({currentStep, steps, data}: {currentStep: number; steps: number; data: any}) {
  const stepsArray = Array.from(Array(steps), (_, i) => i + 1);

  const donedStep = (
    <svg className="h-5 w-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
        stroke="stroke-current"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="my-path"
      ></path>
    </svg>
  );

  return (
    <ol className="overflow-hidden">
      {stepsArray.map((step) => (
        <li
          key={step}
          className={cn(
            "relative flex-1 after:absolute after:-bottom-8 after:left-4 after:inline-block after:h-full after:w-[1px] after:bg-primary after:content-['']",
            currentStep < step ? 'after:bg-mediumGrey' : '',
            step === steps ? 'after:h-0' : ''
          )}
        >
          <a className="w-full items-baseline font-roboto">
            <span
              className={cn(
                'mr-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-transparent bg-primary text-sm text-white',
                currentStep < step ? 'bg-mediumGrey' : ''
              )}
            >
              {currentStep > step ? donedStep : step}
            </span>
            <div className="relative -top-7 ml-12">
              {currentStep < step
                ? data.find((item: any) => item.step === step)?.title
                : data.find((item: any) => item.step === step)?.component}
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}
