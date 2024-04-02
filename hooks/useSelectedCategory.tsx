'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

import {Category, Subcategory} from '@/lib/types';

export const useSelectedCategory = (categories: Category[]): [Category | undefined, Subcategory | undefined] => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | undefined>(undefined);

  useEffect(() => {
    if (category) {
      setSelectedCategory(categories.find((item) => item.name.toLowerCase() === category.toLowerCase()));
    }

    if (!subcategory) {
      setSelectedSubcategory(undefined);
    }
  }, [searchParams]);

  useEffect(() => {
    if (subcategory && selectedCategory) {
      setSelectedSubcategory(
        selectedCategory.subcategories.find((item) => item.name.toLowerCase() === subcategory.toLowerCase())
      );
    }
  }, [searchParams, selectedCategory]);

  // if (category && !categories.find((item) => item.name.toLowerCase() === category.toLowerCase())) {
  //   replace('/products');
  // }

  // if (
  //   selectedCategory &&
  //   subcategory &&
  //   !selectedCategory.subcategories.find((item) => item.name.toLowerCase() === subcategory.toLowerCase())
  // ) {
  //   replace(`/products?category=${category}`);
  // }

  return [selectedCategory, selectedSubcategory];
};
