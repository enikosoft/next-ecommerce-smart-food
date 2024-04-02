import {Slot} from '@radix-ui/react-slot';
import {type VariantProps, cva} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
        outline: 'border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground',
        disabled: 'bg-mediumGrey text-white hover:cursor-not-allowed',

        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',

        ghost: '',
        link: 'text-primary underline-offset-4 hover:underline',

        icon: 'w-12 h-12 px-0 py-0 p-0',
      },
      size: {
        lg: 'h-12 px-10 py-4 font-roboto tracking-wider text-lg font-bold',
        default: 'h-11 px-8 py-2 font-roboto font-medium text-sm',

        icon: 'h-12 w-12',
        'small-icon': 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
