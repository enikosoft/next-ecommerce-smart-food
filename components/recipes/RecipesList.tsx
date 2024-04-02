import Image from 'next/image';
import React from 'react';

import {RecipesList} from '@/lib/types';

import Pagination from '@/components/controls/pagination';

import RecipeCard from './RecipeCard';

import emptyImg from '@/public/images/home/empty-fetching.png';

interface Props {
  recipes: RecipesList;
}

export default function RecipesList(props: Props) {
  const {recipes} = props;

  const pagination = recipes.meta.pagination;

  if (!recipes.data.length) {
    return (
      <div className="flex flex-col items-center justify-center pt-8 md:pt-20">
        <h3 className="heading-2 text-center">No recipes in this category</h3>
        <Image src={emptyImg} alt="No recipes in this category" />
      </div>
    );
  }

  let gridRowClass = 'grid-rows-[200px]';

  if (recipes.data.length > 4) {
    gridRowClass = 'grid-rows-[200px_400px_200px]';
  } else if (recipes.data.length < 5 && recipes.data.length > 2) {
    gridRowClass = 'grid-rows-[200px_200px]';
  }

  return (
    <>
      <h2 className="heading-2 mb-5 pt-5 text-center font-sans">
        SMART FOOD <div className="text-primary">RECIPES</div>
      </h2>

      <div
        className={`
          grid
          grid-cols-1
          md:grid-cols-[48%_48%]
          md:${gridRowClass} grid-rows-6 md:grid-rows-none
          gap-8
        `}
      >
        {recipes.data.map((recipe, index) => (
          <div
            className={`
              h-full
              ${index === 2 && recipes.data.length >= 4 && 'md:w-[140%]'}
              ${index === 3 && recipes.data.length >= 4 && 'md:w-[60%] md:justify-self-end'}

            `}
            key={index}
          >
            <RecipeCard small={index === 3 && recipes.data.length >= 4}
            large={index === 2 && recipes.data.length >= 4}
            recipe={recipe} />
          </div>
        ))}
      </div>

      {recipes.data.length ? <Pagination pagination={pagination} className="mt-7" /> : null}
    </>
  );
}
