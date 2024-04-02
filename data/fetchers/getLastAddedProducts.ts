import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Product} from '@/lib/types';

import {mapResponseProduct} from '../utils';
import {imageSelect} from './resolvers';

export const getLastAddedProducts = cache(async (): Promise<Product[]> => {
  try {
    const products = await prismadb.products.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
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
    console.error('[PRODUCTS_NEW_ARRIVALS]', error);
    return [];
  }
});
