'use client';

import {useRouter} from 'next/navigation';

import {Product} from '@/lib/types';

import AddToCartButton from '@/components/cart/AddToCartButton';
import CartCounter from '@/components/cart/CartItemCounter';

import {useCartStore} from '@/stores/cart';

import CustomImage from '../ui/custom-image';

import noImg from '@/public/images/home/products/no-product-image.png';

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  const {product} = props;
  const router = useRouter();

  const handleRedirect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/products/${product.id}`);
  };

  const currentItem = useCartStore((state) => state.items.find((item) => item.product.id === product.id));
  const addToCart = useCartStore((state) => state.add);
  const quantity = currentItem?.quantity;

  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={handleRedirect}
      className="relative h-auto max-w-72 overflow-hidden rounded-md border border-mediumGrey p-2 hover:cursor-pointer hover:shadow-lg sm:p-5"
    >
      {product.hasDiscount && (
        <div className="absolute left-2 top-2 z-10 font-rubik before:absolute before:-left-12 before:-top-14 before:h-24 before:w-24 before:rounded-full before:bg-primaryRed">
          <span className="absolute w-20 text-sm text-white">-{product.discount?.discountPercentage}%</span>
        </div>
      )}
      <div className="relative m-auto h-[140px] w-[140px] lg:h-[225px] lg:w-[225px]">
        <CustomImage
          quality={100}
          sizes="100vw"
          fill
          cloudinaryId={product.image?.cloudinaryId}
          url={product.image?.url || noImg}
          alt={product.name}
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <h4 className="font-rubik text-sm sm:text-xl">{product.name}</h4>
      <p className="mt-1.5 hidden max-h-20 min-h-20 text-sm leading-6 text-darkGrey sm:block">{product.description}</p>
      <div className="flex flex-col justify-between pt-6 sm:pt-0 lg:flex-row">
        <div className="items-baseline text-sm font-medium sm:text-lg">
          {product.price} $<span className="px-1 leading-5 text-darkGrey">/</span>
          <span className="text-sm text-darkGrey">
            {product.weightPerServing}
            {product.measurement}
          </span>
        </div>
        {!quantity ? (
          <AddToCartButton onClick={handleAddToCart} className="mt-2 h-10 w-full lg:mt-0 lg:h-12 lg:w-12" />
        ) : (
          <CartCounter
            cartItem={currentItem}
            className="mt-2 h-10 w-full border-mediumGrey px-2 font-normal lg:mt-0 lg:w-28"
          />
        )}
      </div>
    </div>
  );
}
