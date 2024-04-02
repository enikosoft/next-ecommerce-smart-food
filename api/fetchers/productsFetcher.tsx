import {Product, ProductsCarouselType} from '@/lib/types';

import {getDiscountedProducts} from './getDiscountedProducts';
import {getLastAddedProducts} from './getLastAddedProducts';
import {getRelatedProducts} from './getRelatedProducts';

export const getProductsDataForCarousel = async (type: ProductsCarouselType, product?: Product): Promise<Product[]> => {
  switch (type) {
    case ProductsCarouselType.NEW_ARRIVALS:
      return getLastAddedProducts();
    case ProductsCarouselType.DISCOUNTED_PRODUCTS:
      return getDiscountedProducts();
    case ProductsCarouselType.RELATED_PRODUCTS:
      if (!product) return [];
      return getRelatedProducts(product.id, product.categoryId, product.subcategoryId);
    default:
      return [];
  }
};
