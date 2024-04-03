'use client';

import {useRouter} from 'next/navigation';
import React from 'react';

import {Recipe} from '@/lib/types';

import {Button} from '../ui/button';
import CustomImage from '../ui/custom-image';

interface Props {
  recipe: Recipe;
  small?: boolean;
  large?: boolean;
}

export default function RecipeCard({recipe, small, large}: Props) {
  const router = useRouter();

  const handleRedirect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div
      onClick={handleRedirect}
      className={`${small ? 'md:flex-col' : 'md:flex-row'} flex h-full w-full rounded-md border border-mediumGrey hover:cursor-pointer hover:shadow-lg`}
    >
      <div
        className={`flex ${small ? 'md:w-full' : large ? 'md:w-[40%]' : ''} w-1/2 flex-col justify-between p-2 sm:p-5`}
      >
        <h4 className="font-rubik text-lg font-semibold">{recipe.name}</h4>

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

        <Button className="mt-4 max-w-36">See ingredients</Button>
      </div>

      <div className={`relative  ${small ? 'md:h-[200px] md:w-full ' : large ? 'md:w-full' : ''} w-1/2`}>
        <CustomImage
          cloudinaryId={recipe?.bannerImg?.cloudinaryId}
          url={recipe?.bannerImg?.url}
          alt={recipe.name}
          quality={100}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
