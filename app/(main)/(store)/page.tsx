import {NextPage} from 'next';
import {Suspense} from 'react';

import {ProductsCarouselType} from '@/lib/types';

import HomeBetterBlock from '@/components/home/HomeBetterBlock';
import LandingCategorySlider from '@/components/home/landing-slider/LandingCategorySlider';
import ProductListSceleton from '@/components/loaders/ProductsListSceleton';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import RecipesCarousel from '@/components/recipes/RecipesCarousel';

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  return (
    <>
      <LandingCategorySlider />

      <HomeBetterBlock />
      <div className="-mt-10 md:mt-40">
        <Suspense fallback={<ProductListSceleton />}>
          <ProductsCarousel
            title={
              <h2 className="heading-2">
                <span className="text-primary">Promotional</span> Product
              </h2>
            }
            subtitle="Do not be late to buy at a discount!"
            type={ProductsCarouselType.DISCOUNTED_PRODUCTS}
          />
        </Suspense>
      </div>

      <div className="mt-10 md:mt-40">
        <Suspense fallback={<ProductListSceleton />}>
          <ProductsCarousel
            title={
              <h2 className="heading-2">
                <span className="text-primary">New</span> Arrivals
              </h2>
            }
            subtitle="Farmers seasonal offers!"
            type={ProductsCarouselType.NEW_ARRIVALS}
          />
        </Suspense>
      </div>

      <div className="mt-10 md:mt-40">
        <Suspense fallback={<div />}>
          <RecipesCarousel
            title={
              <h2 className="heading-2 text-center">
                Order the products for recipe
                <span className="text-primary"> in one click</span>
              </h2>
            }
            subtitle="These recipes may also interest you!"
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
