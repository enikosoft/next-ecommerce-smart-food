import React from 'react';

import {CartItem, Product} from '@/lib/types';
import {cn} from '@/lib/utils';

import {Button} from '@/components/ui/button';

import {useCartStore} from '@/stores/cart';

export default function CartCounter({cartItem, className}: {cartItem: CartItem; className?: string}) {
  const {quantity, product} = cartItem;
  const {add, decreaseCount} = useCartStore((state) => state);

  const handleDecrease = () => {
    decreaseCount(product as Product);
  };

  const handleIncrease = () => {
    add(product);
  };

  const resetDefaultBehaviour = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <Button
      className={cn(
        'hover:bg-unset hover:text-unset flex w-1/2 items-center justify-around p-0 font-semibold lg:w-36',
        className
      )}
      variant={'outline'}
      onClick={resetDefaultBehaviour}
    >
      <div onClick={handleDecrease} className="h-5 w-6 text-xl leading-5">
        -
      </div>
      <input type="number" className="w-16 px-2 py-1 text-center focus:outline-none" value={quantity} readOnly />
      <div onClick={handleIncrease} className="h-5 w-6 text-xl leading-5">
        +
      </div>
    </Button>
  );
}
