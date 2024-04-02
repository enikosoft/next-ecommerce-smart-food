import {getCategories} from '@/data/fetchers/getCategories';

import {CategoriesForMobile} from '@/components/products/CategoriesForMobile';
import ProductCategoryCard from '@/components/products/CategoryCard';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';

import ImagesSlider from './ImageSlider';

export default async function LandingCategorySlider() {
  const categories = await getCategories();

  return (
    <div className="relative h-auto pt-6">
      <>
        <div className="static top-20 z-10 max-w-[500px] lg:absolute">
          <h2 className="heading-1 ">
            products <span className="text-primary">from farmers</span>
          </h2>
          <p className="pt-2 text-base text-primary-black md:pt-6 md:text-xl">Delivery of healthy food from farmers</p>
        </div>

        <ImagesSlider />
      </>
      <Carousel className="mt-10 hidden w-full px-10 md:block">
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselContent className="-ml-1">
          {categories.map((item, index) => (
            <CarouselItem key={`${index}-${item.id}`} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <ProductCategoryCard icon={item?.logo} title={item.name} className="slider w-44" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>

      <CategoriesForMobile categories={categories} />
    </div>
  );
}
