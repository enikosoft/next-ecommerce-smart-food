import {getCategories} from '@/data/fetchers/getCategories';
import {getAllProducts} from '@/data/fetchers/getProducts';
import {Suspense} from 'react';

import {SearchDataQuery} from '@/lib/types';

import ProductListSceleton from '@/components/loaders/ProductsListSceleton';
import CategoriesFilter from '@/components/products/CategoriesFilter';
import ProductsList from '@/components/products/ProductsList';
import SubcategoriesFilter from '@/components/products/SubcategoriesFilter';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export default async function Page({
  searchParams,
}: {
  params: {slug: string};
  searchParams?: SearchDataQuery | undefined;
}) {
  const categories = await getCategories();

  const selectedCategory = categories.find(
    (item) => item.name.toLowerCase() === searchParams?.category?.toLocaleLowerCase()
  );

  const categoryId = selectedCategory?.id;
  const subcategoryId = selectedCategory?.subcategories?.find(
    (item) => item.name.toLowerCase() === searchParams?.subcategory?.toLocaleLowerCase()
  )?.id;

  const page = searchParams?.page || 1;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-64 pt-5">
        <Breadcrumbs />

        <CategoriesFilter categories={categories} />
      </div>
      <div className="flex-1 lg:pl-10">
        <SubcategoriesFilter categories={categories} />
        <ProductListWithSuspense categoryId={categoryId} subcategoryId={subcategoryId} page={page} />
      </div>
    </div>
  );
}

function ProductListWithSuspense({
  categoryId,
  subcategoryId,
  page,
}: {
  categoryId?: number;
  subcategoryId?: number;
  page?: number;
}) {
  return (
    <Suspense key={`${categoryId}-${subcategoryId}`} fallback={<ProductListSceleton />}>
      <ProductListLoader categoryId={categoryId} subcategoryId={subcategoryId} page={page} />
    </Suspense>
  );
}

async function ProductListLoader({
  categoryId,
  subcategoryId,
  page,
}: {
  categoryId?: number;
  subcategoryId?: number;
  page?: number;
}) {
  const products = await getAllProducts(categoryId, subcategoryId, page, 9);

  return <ProductsList products={products} />;
}
