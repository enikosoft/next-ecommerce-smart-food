import React from 'react';

const ProductCardLoader = () => {
  return (
    <div className="relative h-auto max-w-72 rounded-md border border-mediumGrey p-2 sm:p-5">
      <div className="relative m-auto h-[120px] w-[140px] animate-pulse bg-muted lg:h-[205px] lg:w-[225px]"></div>
      <h4 className="mt-5 h-8 w-full animate-pulse bg-muted" />
      <p className="mt-1.5 hidden h-12 animate-pulse bg-muted sm:block" />
      <div className="flex flex-row items-center justify-between pt-6 sm:pt-0 ">
        <div className="h-8 w-full animate-pulse bg-muted sm:mt-8 sm:h-11"></div>
      </div>
    </div>
  );
};

export default ProductCardLoader;
