import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {CartItem, Product, ShortProduct} from '@/lib/types';

interface State {
  items: CartItem[];
  totalCost: number;
  totalCount: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingInfo: {
    address: string;
    country: string;
    city: string;
    zip: string;
    date: Date;
  };
  add: (product: Product | ShortProduct, quantity?: number) => void;
  clear: () => void;
  decreaseCount: (product: Product) => void;
  remove: (productId: number) => void;
  setPersonalInfo: (value: {firstName: string; lastName: string; phone: string}) => void;
  setShippingInfo: (value: {address?: string; city?: string; date?: Date; zip?: string; country?: string}) => void;
}

const calculateTotals = (items: CartItem[]) => ({
  totalCost: Number(items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)),
  totalCount: items.reduce((acc, item) => acc + item.quantity, 0),
});

export const useCartStore = create<State>()(
  persist(
    (set, get) => {
      return {
        items: [],
        totalCost: 0,
        totalCount: 0,
        personalInfo: {
          firstName: '',
          lastName: '',
          phone: '',
        },
        shippingInfo: {
          address: '',
          city: '',
          date: new Date(),
          zip: '',
          country: '',
        },
        add: (product: Product | ShortProduct, quantity?: number) =>
          set((state) => {
            const items = state.items;
            const item = items.find((i) => i.product.id === product.id);

            if (item) {
              if (quantity) {
                item.quantity = quantity;
              } else {
                item.quantity += 1;
              }
            } else {
              items.push({product, quantity: quantity || 1});
            }

            const {totalCost, totalCount} = calculateTotals(items);

            return {
              items,
              totalCost,
              totalCount,
            };
          }),
        clear: () => set(() => ({items: [], totalCost: 0, totalCount: 0})),

        decreaseCount: (product: Product) =>
          set((state) => {
            let items = state.items;
            const item = items.find((i) => i.product.id === product.id);

            if (item) {
              item.quantity -= 1;
            }

            const {totalCost, totalCount} = calculateTotals(items);

            if (item && !item.quantity) {
              items = items.filter((i) => i.product.id !== item.product.id);
            }

            return {
              items,
              totalCost,
              totalCount,
            };
          }),
        remove: (productId: number) =>
          set((state) => {
            const items = state.items.filter((i) => i.product.id !== productId);

            const {totalCost, totalCount} = calculateTotals(items);

            return {
              items,
              totalCost,
              totalCount,
            };
          }),
        setPersonalInfo: (value: {firstName: string; lastName: string; phone: string}) =>
          set((state) => {
            return {
              ...state,
              personalInfo: value,
            };
          }),
        setShippingInfo: (value: {address?: string; city?: string; date?: Date; zip?: string; country?: string}) =>
          set((state) => {
            return {
              ...state,
              shippingInfo: {
                address: value.address || '',
                city: value.city || '',
                date: value.date || new Date(),
                zip: value.zip || '',
                country: value.country || '',
              },
            };
          }),
      };
    },
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({items: state.items, totalCost: state.totalCost, totalCount: state.totalCount}),
    }
  )
);
