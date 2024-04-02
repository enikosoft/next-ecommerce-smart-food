import {notFound} from 'next/navigation';
import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Product} from '@/lib/types';

import {mapResponseProduct} from '../utils';
import {imageSelect} from './resolvers';

export const getProductById = cache(async (id: number): Promise<Product> => {
  try {
    const product = await prismadb.products.findUnique({
      where: {id},
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

    if (!product) return notFound();

    return mapResponseProduct(product);
  } catch (error) {
    console.error('[PRODUCT_BY_ID]', error);
    return notFound();
  }
});
