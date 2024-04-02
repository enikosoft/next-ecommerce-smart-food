import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Category} from '@/lib/types';

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const result = await prismadb.categories.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return result as Category[];
  } catch (error) {
    console.error('[GET_CATEGORIES]', error);
    return [];
  }
});

export const getRecipeCategories = cache(async (): Promise<Category[]> => {
  try {
    const result = await prismadb.recipeCategories.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return result as Category[];
  } catch (error) {
    console.error('[GET_RECIPE_CATEGORIES]', error);
    return [];
  }
});
