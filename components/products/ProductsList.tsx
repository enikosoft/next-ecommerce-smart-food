import Image from 'next/image';
import React from 'react';

import {List, Product} from '@/lib/types';

import Pagination from '@/components/controls/pagination';

import ProductCard from './ProductCard';

import emptyImg from '@/public/images/home/empty-fetching.png';

interface Props {
  products: List<Product>;
}

export default function ProductsList(props: Props) {
  const {products} = props;

  const pagination = products.meta.pagination;

  if (!products.data.length) {
    return (
      <div className="flex flex-col items-center justify-center pt-8 md:pt-20">
        <h3 className="heading-2 text-center">No products with this criteria</h3>
        <Image src={emptyImg} alt="No products with this criteria" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-start gap-7 pt-10 lg:gap-10">
        {products.data.map((product) => (
          <div
            key={product.id}
            className="min-w-min-content min-w-0 shrink-0 grow-0 basis-[46%] sm:basis-[45%] md:basis-[30%] lg:basis-[45%] xl:basis-[30%] "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.data.length ? <Pagination pagination={pagination} className="mt-7" /> : null}
    </>
  );
}
