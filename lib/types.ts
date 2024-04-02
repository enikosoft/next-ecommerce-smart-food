import {OrderStatus, Prisma} from '@prisma/client';

// --- Pagination
export interface Pagination {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface List<T> {
  data: T[];
  meta: {
    pagination: Pagination;
  };
}
// --- Pagination End

export interface SearchQuery {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
}

export interface SearchDataQuery extends SearchQuery {
  category?: string;
  subcategory?: string;
}

export enum ProductsCarouselType {
  NEW_ARRIVALS = 'NEW_ARRIVALS',
  DISCOUNTED_PRODUCTS = 'DISCOUNTED_PRODUCTS',
  RELATED_PRODUCTS = 'RELATED_PRODUCTS',
}

export type Image = Pick<Prisma.ImagesGetPayload<true>, 'id' | 'url' | 'cloudinaryId'>;

export type Discount = Prisma.DiscountsGetPayload<true>;

// --- Products
export interface Category {
  id: number;
  name: string;
  logo?: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface Product extends Prisma.ProductsGetPayload<true> {
  hasDiscount: boolean;
  discount?: Discount | null;
  image: Image | null;
  categories: Pick<Category, 'id' | 'name'>;
}

export interface ShortProduct {
  id: number;
  name: string;
  price: number;
  weightPerServing: number;
  measurement: string;
  image: Image | null;
}
// --- Products End

// --- Recipe
export interface Recipe extends Prisma.RecipesGetPayload<true> {
  plateImg?: Image | null;
  bannerImg?: Image | null;
  products: RecipeProduct[];
  category: Pick<Category, 'id' | 'name'>;
}

export type RecipeProduct = ShortProduct & {
  quantity: number;
};

export interface RecipesList {
  data: Recipe[];
  meta: {
    pagination: Pagination;
  };
}
// --- Recipe End

export interface CartItem {
  product: Product | ShortProduct;
  quantity: number;
}

// --- Order
export type Shipping = Prisma.ShippingGetPayload<true>;

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: ShortProduct;
}

export interface Order {
  id: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  totalCost: number;
  createdAt: Date;
  shipping?: Shipping | null;
}

export interface OrdersList {
  data: Order[];
  meta: {
    pagination: Pagination;
  };
}
// --- Order End
