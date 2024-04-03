'use client';

import React from 'react';
import {IoTrashOutline} from 'react-icons/io5';

import {useCartStore} from '@/stores/cart';

import CustomImage from '../ui/custom-image';
import {Table, TableBody, TableCell, TableRow} from '../ui/table';
import CartCounter from './CartItemCounter';

import noImg from '@/public/images/home/products/no-product-image.png';

export default function Cart() {
  const {items, totalCost} = useCartStore((state) => state);

  const {remove} = useCartStore((state) => state);

  return (
    <div className="w-full rounded-sm border border-mediumGrey p-2 md:p-6">
      <h3 className="py-2 font-rubik text-base">Your order</h3>

      <Table>
        <TableBody className="block max-h-[400px] overflow-y-auto border-t">
          {items.map((item, index) => (
            <TableRow
              key={`${index}-${item.product.id}`}
              className="table w-[95%] border-0 border-b border-b-mediumGrey"
            >
              <TableCell className="w-24 px-0 md:px-0">
                <CustomImage
                  quality={100}
                  width={100}
                  height={100}
                  cloudinaryId={item.product.image?.cloudinaryId}
                  url={item.product.image?.url || noImg}
                  alt={item.product.name}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </TableCell>
              <TableCell className="text-center font-rubik text-base">
                <h6 className="pb-3">{item.product.name}</h6>
                <CartCounter cartItem={item} className="m-auto h-8 border-mediumGrey font-normal" />

                <div className="mt-2 items-baseline text-base font-semibold">
                  {item.product.price} $<span className="px-1 font-medium leading-5 text-darkGrey">/</span>
                  <span className="text-[12px] font-medium text-darkGrey">
                    {item.product.weightPerServing}
                    {item.product.measurement}
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-4 pr-6">
                <IoTrashOutline
                  onClick={() => remove(item.product.id)}
                  className="h-4 w-4 text-darkGrey hover:cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-md mr-6 flex justify-between border-t border-t-mediumGrey py-4 font-sans text-darkGrey">
        <h6>Sum</h6>
        <span className="font-roboto font-semibold">{totalCost} $</span>
      </div>

      <div className="text-md mt-1 flex justify-between pr-6 font-sans text-darkGrey">
        <h6>Discount</h6>
        <span className="font-roboto">- {totalCost} $</span>
      </div>

      <div className="my-5 mr-6 h-0.5 w-[95%] bg-primary" />
      <div className="mt-4 flex justify-between pr-6 font-sans text-lg">
        <h5>Total</h5>
        <span className="font-roboto font-semibold">{totalCost} $</span>
      </div>
    </div>
  );
}
