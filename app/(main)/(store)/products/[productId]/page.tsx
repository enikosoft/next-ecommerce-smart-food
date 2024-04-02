import {getProductById} from '@/data/fetchers/getProductById';
import {NextPage} from 'next';
import {redirect} from 'next/navigation';
import {Suspense} from 'react';

import {ProductsCarouselType} from '@/lib/types';

import ProductListSceleton from '@/components/loaders/ProductsListSceleton';
import ProductDetails from '@/components/products/ProductDetails';
import ProductsCarousel from '@/components/products/ProductsCarousel';

interface Props {
  params: {productId: string};
}

const Page: NextPage<Props> = async ({params}: Props) => {
  if (!Number(params.productId)) {
    redirect('/products');
  }

  const product = await getProductById(Number(params.productId));

  return (
    <>
      <ProductDetails product={product} />

      <div className="mt-10 md:mt-40">
        <Suspense fallback={<ProductListSceleton />}>
          <ProductsCarousel
            title={
              <h2 className="heading-2">
                <span className="text-primary">Related</span> products
              </h2>
            }
            subtitle="These products may also interest you!"
            type={ProductsCarouselType.RELATED_PRODUCTS}
            product={product}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
