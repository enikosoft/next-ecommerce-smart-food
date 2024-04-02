import {OrderStatus, Prisma} from '@prisma/client';

import {Category, Order, OrderItem, Product, Recipe} from '@/lib/types';

import {imageSelect, orderItemsSelect, orderSelect, shortProductSelect} from './fetchers/resolvers';

const productsPrizmaType = Prisma.validator<Prisma.ProductsDefaultArgs>()({
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
  },
});

export const mapResponseProduct = (product: Prisma.ProductsGetPayload<typeof productsPrizmaType>): Product => {
  const {discount, image, categories, ...rest} = product;

  return {
    ...rest,
    hasDiscount: !!discount?.isActive,
    discount,
    image,
    categories: categories as Pick<Category, 'id' | 'name'>,
  };
};

const ordersPrizmaType = Prisma.validator<Prisma.OrdersDefaultArgs>()({
  select: orderSelect,
});

const orderItemsPrizmaType = Prisma.validator<Prisma.OrderItemsDefaultArgs>()({
  select: orderItemsSelect,
});

export const mapResponseOrder = (order: Prisma.OrdersGetPayload<typeof ordersPrizmaType>): Order => {
  const {totalCost, orderItems, status, shipping, ...rest} = order;

  return {
    ...rest,
    totalCost: Number(totalCost),
    status: status as OrderStatus,
    orderItems: orderItems.map(mapResponseOrderItem),
    shipping,
  };
};
``;

const mapResponseOrderItem = (orderItems: Prisma.OrderItemsGetPayload<typeof orderItemsPrizmaType>): OrderItem => {
  const {price, product, ...rest} = orderItems;

  return {
    price: Number(price),
    product: product as Product,
    ...rest,
  };
};

const recipesPrizmaType = Prisma.validator<Prisma.RecipesDefaultArgs>()({
  include: {
    category: true,
    recipesProducts: {
      include: {
        product: {
          select: shortProductSelect,
        },
      },
    },
  },
});

export const mapResponseRecipe = (recipe: Prisma.RecipesGetPayload<typeof recipesPrizmaType>): Recipe => {
  const {recipesProducts, category, ...rest} = recipe;

  return {
    ...rest,
    products: recipesProducts.map((item) => ({
      ...item.product,
      quantity: 1,
    })),
    category: category as Pick<Category, 'id' | 'name'>,
  };
};
