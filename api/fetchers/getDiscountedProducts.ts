import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Product} from '@/lib/types';

import {mapResponseProduct} from '../utils';
import {imageSelect} from './resolvers';

export const getDiscountedProducts = cache(async (): Promise<Product[]> => {
  try {
    const discountedProducts = await prismadb.discounts.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        isActive: true,
      },
      include: {
        product: {
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
        },
      },
      take: 10,
    });

    const products = discountedProducts.map(({product, ...discount}) => {
      return {
        ...product,
        discount,
      };
    });

    return products.map(mapResponseProduct) || [];
  } catch (error) {
    console.error('[DISCOUNTED_PRODUCTS]', error);
    return [];
  }
});
