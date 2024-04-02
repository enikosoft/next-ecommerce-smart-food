'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {Category} from '@/lib/types';

import {Dialog, DialogContent} from '@/components/ui/full-screen-dialog';

import ProductCategoryCard from './CategoryCard';

export default function CategoriesDialog({categories}: {categories: Category[]}) {
  const router = useRouter();
  const handleClick = () => {
    setIsOpen(!isOpen);
    router.back();
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog onOpenChange={handleClick} open={isOpen}>
      <DialogContent>
        <h2 className="heading-2 m-auto mt-10">ALL PRODUCTS</h2>
        <div className="flex h-fit p-mobile-container pb-20 lg:p-lg-container 2xl:p-2xl-container	">
          <div className=" m-auto flex w-3/4 flex-wrap justify-center gap-8">
            {categories.map((item, index) => (
              <div key={index} onClick={() => setIsOpen(false)}>
                <ProductCategoryCard icon={item?.logo} title={item.name} className="m-0" />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
