'use client';

import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';

import {Order} from '@/lib/types';

import {useCartStore} from '@/stores/cart';

import {Button} from '../ui/button';

export default function CompletedOrder({order}: {order: Order}) {
  const router = useRouter();
  const {clear} = useCartStore((state) => state);

  useEffect(() => {
    clear();
  }, []);

  const handleRedirect = () => {
    router.push('/products');
  };

  return (
    <div className="m-auto sm:w-3/4">
      <h2 className="heading-2 text-center font-sans">
        Your order has been <span className="text-primary">accepted!</span>
      </h2>
      <h5 className="pt-2 text-center text-lg">Order number {order.id}</h5>
      <p className="pt-2 text-center">Our manager will contact you within 10 minutes to confirm your order</p>

      <div className="mt-8">
        {order.orderItems.map((item, key) => (
          <div key={`${item.product.id}-${key}`} className="flex items-baseline justify-between py-1">
            <div className="w-[144px]">{item.product.name}</div>

            <div className="text-base">
              {item.quantity}
              <span className="font-medium leading-5 text-darkGrey">/</span>
              <span className="font-medium text-darkGrey">
                {item.product.weightPerServing}
                {item.product.measurement}
              </span>
            </div>

            <div className="text-darkGrey">{item.quantity * Number(item.price)} $</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between py-8 text-lg font-semibold">
        <div>Total:</div>
        <div>{Number(order.totalCost)} $</div>
      </div>

      <Button onClick={handleRedirect} className="mb-4 w-full">
        Browse More Products
      </Button>
    </div>
  );
}
