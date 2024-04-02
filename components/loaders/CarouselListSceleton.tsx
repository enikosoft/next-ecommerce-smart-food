import React from 'react';

import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel';
import ProductCardLoader from './ProductCardLoader';

export default function CarouselListSceleton() {
  const length = Array.from({length: 4}, (_, i) => i);

  return (
    <Carousel opts={{align: 'start'}} className="mt-24 w-full">
      <CarouselContent>
        {length.map((index) => {
          return (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/4">
              <ProductCardLoader />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
