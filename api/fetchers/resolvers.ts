export const imageSelect = {
  id: true,
  url: true,
  cloudinaryId: true,
};

export const shortProductSelect = {
  id: true,
  name: true,
  price: true,
  weightPerServing: true,
  measurement: true,
  image: {
    select: imageSelect,
  },
};

export const orderItemsSelect = {
  id: true,
  quantity: true,
  price: true,
  product: {
    select: shortProductSelect,
  },
};

export const orderSelect = {
  id: true,
  status: true,
  totalCost: true,
  createdAt: true,
  orderItems: {
    select: orderItemsSelect,
  },
  shipping: true,
};
