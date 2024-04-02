import {getRecipeCategories} from '@/data/fetchers/getCategories';
import {getRecipes} from '@/data/fetchers/getRecipes';
import {Suspense} from 'react';

import {SearchDataQuery} from '@/lib/types';

import RecipesListSceleton from '@/components/loaders/RecipesListSceleton';
import CategoriesFilter from '@/components/products/CategoriesFilter';
import RecipesList from '@/components/recipes/RecipesList';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export default async function Page({
  searchParams,
}: {
  params: {slug: string};
  searchParams?: SearchDataQuery | undefined;
}) {
  const categories = await getRecipeCategories();

  const selectedCategory = categories.find(
    (item) => item.name.toLowerCase() === searchParams?.category?.toLocaleLowerCase()
  );

  const categoryId = selectedCategory?.id;
  const page = searchParams?.page || 1;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-64 pt-5">
        <Breadcrumbs />

        <CategoriesFilter categories={categories} isRecipe />
      </div>
      <div className="flex-1 lg:pl-10">
        <RecipesListWithSuspense categoryId={categoryId} page={page} />
      </div>
    </div>
  );
}

function RecipesListWithSuspense({categoryId, page}: {categoryId?: number; page?: number}) {
  return (
    <Suspense key={`${new Date()}`} fallback={<RecipesListSceleton />}>
      <RecipesListLoader categoryId={categoryId} page={page} />
    </Suspense>
  );
}

async function RecipesListLoader({categoryId, page}: {categoryId?: number; page?: number}) {
  const recipes = await getRecipes(undefined, categoryId, page);

  return <RecipesList recipes={recipes} />;
}
