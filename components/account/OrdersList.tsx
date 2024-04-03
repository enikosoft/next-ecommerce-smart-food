'use client';

import {format} from 'date-fns';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React from 'react';
import {MdOutlineRepeatOn} from 'react-icons/md';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableRow} from '@/components/ui/table';

import {useCartStore} from '@/stores/cart';
import {Order, OrdersList} from '@/lib/types'
import CustomImage from '../ui/custom-image';
import noImg from '@/public/images/home/products/no-product-image.png';

export default function OrdersList({orders}: {orders: OrdersList}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace, push} = useRouter();

  const {pagination} = orders.meta;
  const {currentPage, hasNext} = pagination;

  const handleLoadMore = () => {
    if (hasNext) {
      const params = new URLSearchParams(searchParams);
      const nextPage = currentPage + 1;
      params.set('page', nextPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const {add, clear} = useCartStore((state) => state);

  const handleAddToStore = (order: Order) => () => {
    const {orderItems} = order;
    const products = orderItems.map((item) => item.product);

    if (products.length) {
      clear();
      orderItems.forEach((item) => {
        add(item.product, item.quantity);
      });
      push('/checkout');
    }
  };

  return (
    <div className="lg:px-24">
      <h5 className="border-b border-mediumGrey py-4 pl-8">Orders history</h5>

      <Accordion type="single" collapsible>
        {orders.data.map((order, index) => (
          <div key={`${order.id}-${index}`}>
            <AccordionItem
              value={order.id.toString()}
              className="data-[state=open]:border-l-4 data-[state=open]:border-t data-[state=open]:border-primary"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="w-[150px] font-rubik text-base text-primary">Order № {order.id}</div>
                <div className="text-sm">{format(order.createdAt, 'dd.MM.yy')}</div>

                <div className="text-sm text-primary">{order.status}</div>
                <Button onClick={handleAddToStore(order)} className="hidden md:block" variant={'outline'}>
                  Repeat Order
                </Button>
                <MdOutlineRepeatOn className="text-primary md:hidden" />
              </AccordionTrigger>
              <AccordionContent>
                {order?.shipping && (
                  <div className="pl-8">
                    <div className="flex items-center justify-between">
                      <div className="w-32 py-2 md:w-48">Order Date</div>
                      <div>{format(order.createdAt, 'dd.MM.yyyy HH:mm:ss')}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-32 py-2 md:w-48">Address Delivery</div>
                      <div>
                        {order?.shipping?.city}, {order?.shipping?.county} ({order?.shipping?.address})
                      </div>
                    </div>
                  </div>
                )}

                <Table>
                  <TableBody className="border-t">
                    {order.orderItems.map((orderItem, index) => (
                      <TableRow key={`${index}-${orderItem.product.id}`} className="border-0">
                        <TableCell className="w-20 p-0 md:p-4">
                          <CustomImage
                            quality={100}
                            width={90}
                            height={90}
                            cloudinaryId={orderItem.product.image?.cloudinaryId}
                            url={orderItem.product.image?.url || noImg}
                            alt={orderItem.product.name}
                            className="h-14 w-14"
                            style={{
                              objectFit: 'contain',
                            }}
                          />
                        </TableCell>
                        <TableCell className="max-w-24 font-rubik text-base md:max-w-56">
                          {orderItem.product.name}
                        </TableCell>
                        <TableCell className="items-baseline text-right text-base font-semibold">
                          {orderItem.price} $<span className="px-1 font-medium leading-5 text-darkGrey">/</span>
                          <span className="text-[12px] font-medium text-darkGrey">
                            {orderItem.product.weightPerServing}
                            {orderItem.product.measurement}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-[12px] text-darkGrey">x{orderItem.quantity}</TableCell>
                        <TableCell className="items-baseline text-right text-base font-semibold">
                          {(orderItem.price * orderItem.quantity).toFixed(2)} $
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="mt-4 border-t">
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-md items-baseline pt-5 text-right font-semibold">Total:</TableCell>
                      <TableCell className="items-baseline pt-5 text-right text-lg font-semibold">
                        {order.totalCost} $
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

      {hasNext && (
        <div onClick={handleLoadMore} className="border-0 bg-white text-primary underline hover:cursor-pointer m-auto w-32 mt-4">
          Load more
        </div>
      )}
    </div>
  );
}
