import {getProductById} from '@/api/fetchers/getProductById';
import {getRecipeById} from '@/api/fetchers/getRecipeById';
import {NextPage} from 'next';
import {redirect} from 'next/navigation';
import {Suspense} from 'react';

import {ProductsCarouselType} from '@/lib/types';

import ProductListSceleton from '@/components/loaders/ProductsListSceleton';
import ProductDetails from '@/components/products/ProductDetails';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import RecipeDetails from '@/components/recipes/RecipeDetails';
import RecipesCarousel from '@/components/recipes/RecipesCarousel';

interface Props {
  params: {recipeId: string};
}

const Page: NextPage<Props> = async ({params}: Props) => {
  if (!Number(params.recipeId)) {
    redirect('/recipes');
  }

  const recipe = await getRecipeById(Number(params.recipeId));

  return (
    <>
      <RecipeDetails recipe={recipe} />
      {/* <ProductDetails product={product} /> */}

      <div className="mt-10 md:mt-40">
        <Suspense fallback={<div />}>
          <RecipesCarousel
            title={
              <h2 className="heading-2">
                <span className="text-primary">Related</span> recipes
              </h2>
            }
            subtitle="These recipes may also interest you!"
            categoryId={recipe.categoryId}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
