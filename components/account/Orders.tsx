import {getOrders} from '@/api/fetchers/getOrders';
import React from 'react';

import OrdersList from './OrdersList';

export default async function Orders({pageId}: {pageId: number}) {
  const orders = await getOrders(pageId);

  return <OrdersList orders={orders} />;
}
