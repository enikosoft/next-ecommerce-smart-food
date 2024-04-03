import {auth} from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import {List, Order, Pagination} from '@/lib/types';

import {mapResponseOrder} from '../utils';
import {orderSelect} from './resolvers';

export const getOrders = async (page = 1, limit = 10): Promise<List<Order>> => {
  try {
    const {getToken} = auth();
    const token = await getToken();

    const {userId} = auth();

    if (!userId || !token) {
      throw new Error('Unauthenticated');
    }

    let [result, total] = await prismadb.$transaction([
      prismadb.orders.findMany({
        where: {
          userId,
        },
        take: Number(limit) * page,
        select: orderSelect,
        orderBy: [{createdAt: 'desc'}, {id: 'desc'}],
      }),
      prismadb.orders.count({
        where: {
          userId,
        },
      }),
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
      data: result.map(mapResponseOrder) || [],
      meta: {
        pagination: pageInfo,
      },
    };
  } catch (error) {
    console.error('[GET_ORDERS]', error);
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
};
