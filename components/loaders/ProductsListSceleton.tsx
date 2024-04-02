import React from 'react';

import ProductCardLoader from './ProductCardLoader';

export default function ProductListSceleton() {
  return (
    <div className="flex flex-wrap justify-start gap-7 pt-10 lg:gap-10">
      <div className="min-w-min-content min-w-0 shrink-0 grow-0 basis-[46%] sm:basis-[45%] md:basis-[30%] lg:basis-[45%] xl:basis-[30%]">
        <ProductCardLoader />
      </div>
      <div className="min-w-min-content min-w-0 shrink-0 grow-0 basis-[46%] sm:basis-[45%] md:basis-[30%] lg:basis-[45%] xl:basis-[30%]">
        <ProductCardLoader />
      </div>
      <div className="min-w-min-content min-w-0 shrink-0 grow-0 basis-[46%] sm:basis-[45%] md:basis-[30%] lg:basis-[45%] xl:basis-[30%]">
        <ProductCardLoader />
      </div>
    </div>
  );
}
