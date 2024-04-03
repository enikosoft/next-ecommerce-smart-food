'use client';

import {NextPage} from 'next';
import {redirect} from 'next/navigation';

import Cart from '@/components/cart/Cart';
import OrderProcessing from '@/components/checkout/OrderProcessing';
import Container from '@/components/ui/container';
import {Toaster} from '@/components/ui/toaster';

import {useCartStore} from '@/stores/cart';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const {totalCount} = useCartStore((state) => state);

  if (!totalCount) {
    redirect('/');
  }

  return (
    <Container>
      <div className="flex flex-col-reverse py-8 md:flex-row">
        <div className="h-full w-full flex-grow">
          <OrderProcessing />
        </div>
        <div className="min-w-[370px] lg:min-w-[500px]">
          <Cart />
        </div>
        <Toaster />
      </div>
    </Container>
  );
};

export default Page;
