'use client';

import {useRouter} from 'next/navigation';
import React from 'react';
import {BsCart3} from 'react-icons/bs';

import {Button} from '@/components/ui/button';

import {useCartStore} from '@/stores/cart';

export default function NavbarCartIcon() {
  const router = useRouter();

  const {totalCount} = useCartStore((state) => state);

  const handleRedirect = () => {
    if (totalCount) {
      router.push('/checkout', {scroll: false});
    }
  };

  return (
    <div>
      <Button onClick={handleRedirect} className="w-inherit relative" variant={'icon'} size={'icon'}>
        <BsCart3 className="size-5 sm:size-8" />
        <div className="absolute right-0 top-0.5 h-5 w-5 rounded-full border-2 border-white bg-primary">
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-rubik text-xs text-white">
            {totalCount}
          </span>
        </div>
      </Button>
    </div>
  );
}
