'use client';

import {useSelectedCategory} from '@/hooks/useSelectedCategory';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';

import {Category} from '@/lib/types';

import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';

import {useBreadcrumbs} from '@/stores/breadcrumbs';

interface Props {
  categories: Category[];
  isRecipe?: boolean;
}

export default function CategoriesFilter({categories, isRecipe}: Props) {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();

  const [selectedCategory] = useSelectedCategory(categories);

  const {setCategory} = useBreadcrumbs();

  const [openMobileSelector, setOpenMobileSelector] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory.name, isRecipe);
    } else {
      setCategory(undefined, isRecipe);
    }
  }, [selectedCategory]);

  const handleSelectCategory =
    (category: Category, isMobile = false) =>
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams);
      params.set('category', category.name.toLocaleLowerCase());
      params.delete('subcategory');

      if (isMobile) {
        setOpenMobileSelector(false);
      }

      replace(`${pathname}?${params.toString()}`);
    };

  return (
    <div className="mt-4 flex w-full flex-col-reverse lg:mt-8 lg:flex-col">
      <h3 className="font-sans text-xl font-semibold uppercase lg:text-4xl">{selectedCategory?.name}</h3>

      <Sheet open={openMobileSelector || false} onOpenChange={setOpenMobileSelector}>
        <SheetTrigger asChild>
          <Button className="mb-4 block w-40 lg:hidden" variant={'outline'}>
            Select category
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Select category</SheetTitle>
          </SheetHeader>
          <ul className="mt-4 font-rubik text-base lg:mt-8">
            {categories.map((category) => (
              <li
                onClick={handleSelectCategory(category, true)}
                className={`${category.id === selectedCategory?.id ? 'font-semibold text-primary' : ''} mt-2.5 leading-6 hover:cursor-pointer hover:font-semibold`}
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      <ul className="mt-4 hidden font-rubik text-base lg:mt-8 lg:block">
        {categories.map((category) => (
          <li
            onClick={handleSelectCategory(category)}
            className={`${category.id === selectedCategory?.id ? 'font-semibold text-primary' : ''} mt-2.5 leading-6 hover:cursor-pointer hover:font-semibold`}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
