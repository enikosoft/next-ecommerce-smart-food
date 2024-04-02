'use client';

import {useSelectedCategory} from '@/hooks/useSelectedCategory';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React from 'react';

import {Category, Subcategory} from '@/lib/types';

import {Button} from '@/components/ui/button';

interface Props {
  categories: Category[];
}

function SubcategoriesFilter({categories}: Props) {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();

  const [selectedCategory, selectedSubcategory] = useSelectedCategory(categories);

  const subcategories = selectedCategory ? [...selectedCategory.subcategories] : [];

  const handleSelectSubcategory = (subcategory: Subcategory) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (!subcategory.id) {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subcategory.name.toLocaleLowerCase());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="mt-4 flex h-auto flex-wrap justify-start gap-2 font-rubik text-base md:gap-5 lg:mt-8 xl:gap-7">
      {selectedCategory && (
        <li>
          <Button
            className="h-8 px-7"
            onClick={handleSelectSubcategory({id: 0, name: 'All'})}
            variant={!selectedSubcategory ? 'default' : 'outline'}
          >
            All
          </Button>
        </li>
      )}

      {subcategories?.map((category) => (
        <li key={category.id}>
          <Button
            className="h-8 px-7"
            onClick={handleSelectSubcategory(category)}
            variant={selectedSubcategory?.id === category.id ? 'default' : 'outline'}
          >
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(SubcategoriesFilter);
