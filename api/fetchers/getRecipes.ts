import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {List, Pagination, Recipe} from '@/lib/types';

import {mapResponseRecipe} from '../utils';
import {imageSelect, shortProductSelect} from './resolvers';

export const getRecipes = cache(
  async (id?: number, categoryId?: number, page = 1, limit = 6): Promise<List<Recipe>> => {
    try {
      if (!id && page < 1) {
        throw new Error('Page must be more than 0');
      }

      if (!id && !Number(limit)) {
        throw new Error('Limite per page must be a number');
      }

      const categoryIdNumber = categoryId && Number(categoryId);

      const condition = {
        ...(id ? {id} : {}),
        ...(!id && categoryIdNumber ? {categoryId: categoryIdNumber} : {}),
      };

      let [result, total] = await prismadb.$transaction([
        prismadb.recipes.findMany({
          where: condition,
          take: Number(limit),
          skip: (page - 1) * limit,
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
          orderBy: [
            {
              createdAt: 'desc',
            },
            {id: 'desc'},
          ],
        }),
        prismadb.recipes.count({where: condition}),
      ]);

      const pageInfo: Pagination = {
        currentPage: Number(page),
        perPage: Number(limit),
        totalPages: Math.ceil(total / limit),
        totalCount: total,
        hasPrev: page > 1,
        hasNext: page < Math.ceil(total / limit),
      };

      return {
        data: result.map(mapResponseRecipe) || [],
        meta: {
          pagination: pageInfo,
        },
      };
    } catch (error) {
      console.error('[GET_RECIPES]', error);
      return {
        data: [],
        meta: {
          pagination: {
            currentPage: 0,
            perPage: 0,
            totalPages: 0,
            totalCount: 0,
            hasPrev: false,
            hasNext: false,
          },
        },
      };
    }
  }
);
