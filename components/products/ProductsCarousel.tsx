import {getProductsDataForCarousel} from '@/api/fetchers/productsFetcher';
import {ReactNode} from 'react';

import {Product, ProductsCarouselType} from '@/lib/types';

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';

import ProductCard from './ProductCard';

interface Props {
  title: ReactNode;
  subtitle: string;
  type: ProductsCarouselType;
  product?: Product;
}

export default async function ProductsCarousel({title, subtitle, type, product}: Props) {
  const products = await getProductsDataForCarousel(type, product);

  return (
    <>
      <div className="flex flex-col items-center">
        {title}
        <p className="mt-4 text-base text-primary-black">{subtitle}</p>
      </div>
      <Carousel opts={{align: 'start'}} className="mt-24 w-full">
        <CarouselContent>
          {products.map((product, index) => {
            return (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
