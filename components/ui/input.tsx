import * as React from 'react';

import {cn} from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  label?: string;
  disabledAndValid?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, isValid, label, disabled, disabledAndValid, errorMessage, ...props}, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <div
            className={cn(
              'absolute -top-1 left-2.5 flex h-2 items-center bg-white px-1 text-[10px] text-darkGrey',
              disabled ? 'z-10 bg-white' : '',
              !isValid ? 'text-primaryRed' : ''
            )}
          >
            <span>{label}</span>
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-darkGrey bg-background px-3 py-2 font-roboto text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-darkGrey focus-visible:border-primary focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isValid ? 'border-primary text-primary' : '',
            !isValid ? 'border-primaryRed text-primaryRed focus-visible:border-primaryRed' : '',
            className,
            disabledAndValid ? 'border-primary disabled:opacity-80' : ''
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {!isValid && errorMessage && <span className="text-sm text-primaryRed">{errorMessage}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export {Input};
