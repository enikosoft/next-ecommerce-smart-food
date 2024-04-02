import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Product} from '@/lib/types';

import {mapResponseProduct} from '../utils';
import {imageSelect} from './resolvers';

export const getRelatedProducts = cache(
  async (productId: number, categoryId: number, subcategoryId: number): Promise<Product[]> => {
    try {
      const subcategoryIdNumber = subcategoryId && Number(subcategoryId);
      const categoryIdNumber = categoryId && Number(categoryId);

      const condition = {
        ...(categoryIdNumber ? {categoryId: categoryIdNumber} : {}),
        ...(subcategoryIdNumber ? {subcategoryId: subcategoryIdNumber} : {}),
      };

      const products = await prismadb.products.findMany({
        where: {
          NOT: {
            id: Number(productId),
          },
          AND: [condition],
        },
        take: 8,
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
      });

      return products.map(mapResponseProduct) || [];
    } catch (error) {
      console.error('[PRODUCTS_RELATED]', error);
      return [];
    }
  }
);
