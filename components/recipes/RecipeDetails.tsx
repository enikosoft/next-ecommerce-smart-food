'use client';

import React, {useEffect, useState} from 'react';
import {MdClose} from 'react-icons/md';

import {Product, Recipe, RecipeProduct} from '@/lib/types';

import Breadcrumbs from '@/components/ui/breadcrumbs';
import {Button} from '@/components/ui/button';

import {useBreadcrumbs} from '@/stores/breadcrumbs';
import {useCartStore} from '@/stores/cart';

import CustomImage from '../ui/custom-image';
import RecipeDetailsImage from './RecipeDetailsImage';

export default function RecipeDetails({recipe}: {recipe: Recipe}) {
  const {add} = useCartStore((state) => state);

  const {setRecipe} = useBreadcrumbs();

  useEffect(() => {
    setRecipe(recipe);
  }, [recipe]);

  const [recipeProducts, setRecipeProducts] = useState<RecipeProduct[]>(recipe.products);

  const handleRemoveProduct = (id: number) => (e: React.MouseEvent<SVGElement>) => {
    setRecipeProducts(recipeProducts.filter((item) => item.id !== id));
  };

  const calculateTotals = Number(recipeProducts.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));

  const [itemCount, setItemCount] = useState<number>(1);
  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const handleIncrease = () => setItemCount(itemCount + 1);

  useEffect(() => {
    setRecipeProducts(recipeProducts.map((item) => ({...item, quantity: itemCount})));
  }, [itemCount]);

  const handleAddToCart = () => {
    recipeProducts.forEach((product) => {
      const {quantity, ...restProduct} = product;
      add(restProduct as Product, product.quantity);
    });
    setItemCount(1);
  };

  return (
    <div className="pt-5">
      <Breadcrumbs />

      <div className="mt-8 flex flex-col-reverse md:mt-10 lg:flex-row">
        <div className="mt-8 md:mt-0 md:py-5 md:pl-16">
          <h2 className="text-xl font-semibold uppercase md:text-3xl">{recipe.name}</h2>
          <div className="my-4 items-baseline text-lg font-semibold md:text-2xl">{calculateTotals} $</div>

          <>
            <div className="items-baseline text-sm text-darkGrey">
              1 serving<span className="px-1 leading-5">/</span>
              <span>
                {recipe.weightPerServing}
                {recipe.measurement}
              </span>
            </div>

            <div className="mt-2 items-baseline text-sm text-darkGrey">{recipe.cookTime}</div>
          </>

          <div className="my-4 flex justify-between gap-8 md:justify-start md:gap-3">
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
              Buy products
            </Button>
          </div>

          <h4 className="py-2">This pack includes:</h4>
          <div className="hover:cursor-pointer lg:max-w-[464px]">
            {recipeProducts.map((product, index) => (
              <div key={`${index}-${product.id}`} className="mb-4 flex w-full justify-between gap-4 pb-2 sm:mb-0">
                <CustomImage
                  quality={100}
                  width={50}
                  height={50}
                  cloudinaryId={product.image?.cloudinaryId}
                  url={product.image?.url}
                  alt={product.name}
                  style={{
                    objectFit: 'contain',
                    width: '10%',
                  }}
                />

                <div className="flex w-[90%] items-center justify-between">
                  <h6 className="w-36 font-rubik text-base md:w-56">{product.name}</h6>
                  <div className="items-baseline text-base font-semibold">
                    {product.price} $<span className="px-1 font-medium leading-5 text-darkGrey">/</span>
                    <span className="text-[12px] font-medium text-darkGrey">
                      {product.weightPerServing}
                      {product.measurement}
                    </span>
                  </div>

                  <div className="text-right text-[10px] text-darkGrey">x{product.quantity}</div>
                  <MdClose
                    onClick={handleRemoveProduct(product.id)}
                    className="text-primary hover:font-semibold hover:text-black"
                  />
                </div>
              </div>
            ))}
          </div>

          <h4 className="py-5">Recipe</h4>
          <div className="flex flex-col gap-4 lg:max-w-96">
            <p>
              1. In the fillet make cuts, salt and pepper, mix with teriyaki sauce and leave to marinate for 15 minutes.
            </p>

            <p>
              2. Then fry the chicken on each side until golden brown and cut into thin slices. with sauce, add to
              salad.
            </p>
            <p>3. Chop onion, herbs, mix with sauce, add to salad. </p>
            <p> 4. Put the salad on a plate and sprinkle sesame seeds.</p>
          </div>
        </div>
        <RecipeDetailsImage name={recipe.name} recipeImg={recipe?.plateImg} products={recipe.products} />
      </div>
    </div>
  );
}
