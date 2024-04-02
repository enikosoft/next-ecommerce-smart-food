'use client';

import React from 'react';

import CartItem from '@/components/cart/CartItem';

import {useCartStore} from '@/stores/cart';

export default function Cart() {
  const {items, totalCost} = useCartStore((state) => state);

  return (
    <div className="w-full rounded-sm border border-mediumGrey p-6">
      <h3 className="font-rubik text-base">Your order</h3>

      <div className="max-h-[384px] overflow-y-auto pr-5">
        {items.map((item, index) => (
          <CartItem key={index} cartItem={item} />
        ))}
      </div>

      <div className="text-md mt-4 flex justify-between font-sans text-darkGrey">
        <h6>Sum</h6>
        <span className="font-roboto">{totalCost} $</span>
      </div>

      <div className="text-md mt-1 flex justify-between font-sans text-darkGrey">
        <h6>Discount</h6>
        <span className="font-roboto">- {totalCost} $</span>
      </div>

      <div className="my-2 h-0.5 w-full bg-primary" />
      <div className="mt-4 flex justify-between font-sans text-lg">
        <h5>Total</h5>
        <span className="font-roboto font-semibold">{totalCost} $</span>
      </div>
    </div>
  );
}
