import {StoreApi, UseBoundStore, create} from 'zustand';

import {Product, Recipe} from '@/lib/types';

interface Breadcrumb {
  name: string;
  path: string;
}

interface State {
  breadcrumbs: Breadcrumb[];
  setProduct(value: Product): void;
  setRecipe(value: Recipe): void;
  setCategory(categoryName?: string, isRecipe?: boolean): void;
}

const initialBreadcrumb = {
  name: 'Home',
  path: '/',
};

export const useBreadcrumbs: UseBoundStore<StoreApi<State>> = create((set) => ({
  breadcrumbs: [initialBreadcrumb],

  setProduct: (value: Product) =>
    set(() => {
      const nextBreadcrumbs = [initialBreadcrumb];

      return {
        breadcrumbs: [
          ...nextBreadcrumbs,
          {
            path: `/products?category=${value.categories.name}`,
            name: value.categories.name,
          },
          {
            path: `/products/${value.id}`,
            name: value.name,
          },
        ],
      };
    }),
  setRecipe: (value: Recipe) =>
    set(() => {
      const nextBreadcrumbs = [initialBreadcrumb];

      return {
        breadcrumbs: [
          ...nextBreadcrumbs,
          {
            path: `/recipes?category=${value.category.name.toLowerCase()}`,
            name: value.category.name,
          },
          {
            path: `/recipes/${value.id}`,
            name: value.name,
          },
        ],
      };
    }),
  setCategory: (categoryName: string, isRecipe?: boolean) =>
    set(() => {
      const nextBreadcrumbs = [initialBreadcrumb];

      if (!categoryName) {
        return {
          breadcrumbs: [initialBreadcrumb],
        };
      }

      return {
        breadcrumbs: [
          ...nextBreadcrumbs,
          {
            path: `/${isRecipe ? 'recipes' : 'products'}?category=${categoryName}`,
            name: categoryName,
          },
        ],
      };
    }),
}));
