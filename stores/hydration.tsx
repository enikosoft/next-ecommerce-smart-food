'use client';

import * as React from 'react';

import {useCartStore} from '@/stores/cart';

const Hydration = () => {
  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
