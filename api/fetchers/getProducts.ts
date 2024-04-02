import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {List, Pagination, Product} from '@/lib/types';

import {mapResponseProduct} from '../utils';
import {imageSelect} from './resolvers';

export const getAllProducts = cache(
  async (
    categoryId?: number,
    subcategoryId?: number,
    page = 1,
    limit = 9,
    sort = 'createdAt',
    order: 'asc' | 'desc' = 'desc'
  ): Promise<List<Product>> => {
    try {
      if (page < 1) {
        throw new Error('Page must be more than 0');
      }

      if (!Number(limit)) {
        throw new Error('Limite per page must be a number');
      }

      const subcategoryIdNumber = subcategoryId && Number(subcategoryId);
      const categoryIdNumber = categoryId && Number(categoryId);

      const condition = {
        ...(categoryIdNumber ? {categoryId: categoryIdNumber} : {}),
        ...(subcategoryIdNumber ? {subcategoryId: subcategoryIdNumber} : {}),
      };

      let [result, total] = await prismadb.$transaction([
        prismadb.products.findMany({
          where: condition,
          take: Number(limit),
          skip: (page - 1) * limit,
          include: {
            image: {
              select: imageSelect,
            },
            discount: {
              where: {
                isActive: true,
              },
            },
            categories: true,
            subcategories: true,
          },
          orderBy: [
            {
              createdAt: 'desc',
            },
            {id: 'desc'},
          ],
        }),
        prismadb.products.count({where: condition}),
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
        data: result.map(mapResponseProduct) || [],
        meta: {
          pagination: pageInfo,
        },
      };
    } catch (error) {
      console.error('[GET_PRODUCTS]', error);
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
