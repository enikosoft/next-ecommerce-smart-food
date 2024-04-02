'use client';

import {useEffect, useState} from 'react';

import {Product} from '@/lib/types';

import Breadcrumbs from '@/components/ui/breadcrumbs';
import {Button} from '@/components/ui/button';

import {useBreadcrumbs} from '@/stores/breadcrumbs';
import {useCartStore} from '@/stores/cart';

import CustomImage from '../ui/custom-image';

import noImg from '@/public/images/home/products/no-product-image.png';

const NutrientItem = ({value, unit, label}: {value: number; unit: string; label: string}) => (
  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary">
    <div className="font-semibold leading-6">
      {value}
      <span className="text-xs font-thin">{unit}</span>
    </div>
    <div className="text-[10px] leading-3">{label}</div>
  </div>
);

export default function ProductDetails({product}: {product: Product}) {
  const currentItem = useCartStore((state) => state.items.find((item) => item.product.id === product.id));
  const addToCart = useCartStore((state) => state.add);

  const [itemCount, setItemCount] = useState<number>(1);
  useEffect(() => {
    setItemCount(currentItem?.quantity || 1);
  }, [currentItem?.quantity]);

  const [showNutrientItems, setShowNutrientItems] = useState<boolean>(false);
  const {setProduct} = useBreadcrumbs();

  useEffect(() => {
    setProduct(product);
  }, [product]);

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const handleIncrease = () => setItemCount(itemCount + 1);
  const handleAddToCart = () => addToCart(product, itemCount);

  return (
    <div className="pt-5">
      <Breadcrumbs />

      <div className="mt-8 flex flex-col md:mt-10 md:flex-row">
        <div
          onMouseEnter={() => setShowNutrientItems(!showNutrientItems)}
          onMouseLeave={() => setShowNutrientItems(!showNutrientItems)}
          className="relative h-56 w-full rounded-md border border-mediumGrey hover:cursor-pointer sm:h-72 md:h-96 md:w-[470px]"
        >
          {showNutrientItems && (
            <>
              <div className="absolute z-10 h-full w-full bg-white opacity-60"></div>
              <div className="absolute z-10 flex h-full w-full flex-row items-center justify-around p-5 font-sans text-lg text-primary-foreground md:flex-col md:items-start md:justify-between">
                {product?.calories && <NutrientItem value={product.calories} unit="" label="Calories" />}
                {product?.proteins && <NutrientItem value={product.proteins} unit="g" label="Protein" />}
                {product?.fats && <NutrientItem value={product.fats} unit="g" label="Fats" />}
                {product?.carbohydrates && <NutrientItem value={product.carbohydrates} unit="g" label="Carbs" />}
              </div>
            </>
          )}

          <CustomImage
            quality={100}
            sizes="(min-width: 768px) 470px, 350px"
            fill
            cloudinaryId={product.image?.cloudinaryId}
            url={product?.image?.url || noImg}
            alt={product.name}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        <div className="mt-6 flex flex-col justify-between font-sans md:mt-0 md:py-5 md:pl-16">
          <h2 className="text-xl font-semibold uppercase md:flex-1 md:text-3xl">{product.name}</h2>

          <div className="mt-4 items-baseline text-lg font-semibold md:flex-1 md:text-2xl">
            {product.price} $<span className="px-1 font-medium leading-5 text-darkGrey">/</span>
            <span className="text-sm font-medium text-darkGrey md:text-lg">
              {product.weightPerServing}
              {product.measurement}
            </span>
          </div>

          <p className="mt-7 font-roboto text-sm leading-6 text-darkGrey md:flex-[5_5_0%]">{product.description}</p>

          <div className="mt-4 flex justify-between gap-8 md:mt-0 md:justify-start md:gap-3">
            <Button
              variant={'outline'}
              className="hover:bg-unset hover:text-unset flex w-1/2 justify-around p-0 md:w-36"
            >
              <div onClick={handleDecrease} className="h-full w-6 text-xl leading-10">
                -
              </div>
              <input
                type="number"
                className="w-16 px-2 py-1 text-center font-semibold focus:outline-none"
                value={itemCount}
                readOnly
              />
              <div onClick={handleIncrease} className="h-full w-6 text-xl leading-10">
                +
              </div>
            </Button>
            <Button onClick={handleAddToCart} className="w-1/2 font-semibold md:w-36">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
