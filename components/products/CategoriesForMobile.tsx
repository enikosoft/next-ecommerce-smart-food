'use client';

import * as React from 'react';
import {RxCaretSort} from 'react-icons/rx';

import {Category} from '@/lib/types';

import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';

import ProductCategoryCard from './CategoryCard';

export function CategoriesForMobile({categories}: {categories: Category[]}) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!categories.length) return null;

  const firstCategories = categories.slice(0, 3);
  const restCategories = categories.slice(3);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2 md:hidden">
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="flex w-full justify-between">
            <h4 className="text-md font-sans">Show {isOpen ? 'less' : 'more'} categories</h4>
            <RxCaretSort className="h-5 w-5 font-semibold text-primary" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      {firstCategories.map((item, index) => (
        <ProductCategoryCard
          key={index}
          small
          icon={item?.logo}
          title={item.name}
          className="flex h-12 w-full justify-start rounded-md"
        />
      ))}

      <CollapsibleContent className="space-y-2">
        {restCategories.map((item, index) => (
          <ProductCategoryCard
            key={index}
            small
            icon={item?.logo}
            title={item.name}
            className="flex h-12 w-full justify-start rounded-md"
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
