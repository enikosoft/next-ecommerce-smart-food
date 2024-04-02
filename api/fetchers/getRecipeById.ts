import {notFound} from 'next/navigation';
import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Recipe} from '@/lib/types';

import {mapResponseRecipe} from '../utils';
import {imageSelect, shortProductSelect} from './resolvers';

export const getRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const recipe = await prismadb.recipes.findUnique({
      where: {id},
      include: {
        category: true,
        plateImg: {
          select: imageSelect,
        },
        bannerImg: {
          select: imageSelect,
        },
        recipesProducts: {
          include: {
            product: {
              select: shortProductSelect,
            },
          },
        },
      },
    });

    if (!recipe) return notFound();

    return mapResponseRecipe(recipe);
  } catch (error) {
    console.error('[RECIPE_BY_ID]', error);
    return notFound();
  }
};
