import {auth} from '@clerk/nextjs';
import {OrderStatus} from '@prisma/client';
import {notFound} from 'next/navigation';
import {cache} from 'react';

import prismadb from '@/lib/prismadb';
import {Order} from '@/lib/types';

import {mapResponseOrder} from '../utils';
import {orderSelect} from './resolvers';

export const getOrder = async (orderId: number): Promise<Order | null> => {
  try {
    const {getToken} = auth();
    const token = await getToken();

    const {userId} = auth();

    if (!userId || !token) {
      throw new Error('Unauthenticated');
    }

    if (!orderId) {
      throw new Error('Order id is required');
    }

    const order = await prismadb.orders.findUnique({
      where: {
        id: orderId,
        userId,
        status: OrderStatus.SUCCESSED,
      },
      select: orderSelect,
    });

    if (order) {
      return mapResponseOrder(order);
    }

    notFound();
  } catch (error) {
    console.error('[GET_ORDER_BY_ID]', error);
    notFound();
  }
};