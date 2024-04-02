import React from 'react';
import {IoTrashOutline} from 'react-icons/io5';

import {useCartStore} from '@/stores/cart';
import {CartItem} from '@/lib/types'

import CustomImage from '../ui/custom-image';
import CartCounter from './CartItemCounter';

import noImg from '@/public/images/home/products/no-product-image.png';

interface Props {
  cartItem: CartItem;
}

export default function CartItem(props: Props) {
  const {cartItem} = props;
  const {product} = cartItem;
  const {remove} = useCartStore((state) => state);

  return (
    <div className="flex h-32 w-full items-center justify-between gap-10 border-b border-b-mediumGrey py-4">
      <CustomImage
        quality={100}
        width={90}
        height={90}
        cloudinaryId={product.image?.cloudinaryId}
        url={product.image?.url || noImg}
        alt={product.name}
        style={{
          objectFit: 'contain',
        }}
      />

      <div className="min-w-[124px]">
        <h6 className="pb-3 font-rubik text-base">{product.name}</h6>
        <CartCounter cartItem={cartItem} className="h-8 border-mediumGrey font-normal" />

        <div className="mt-2 items-baseline text-base font-semibold">
          {product.price} $<span className="px-1 font-medium leading-5 text-darkGrey">/</span>
          <span className="text-[12px] font-medium text-darkGrey">
            {product.weightPerServing}
            {product.measurement}
          </span>
        </div>
      </div>

      <IoTrashOutline onClick={() => remove(product.id)} className="h-4 w-4 text-darkGrey hover:cursor-pointer" />
    </div>
  );
}
