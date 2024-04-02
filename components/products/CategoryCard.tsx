'use client';

import {useRouter} from 'next/navigation';

import {cn} from '@/lib/utils';

import './styles.css';

export default function ProductCategoryCard({
  icon,
  title,
  className = '',
  small = false,
}: {
  icon?: string;
  title: string;
  className?: string;
  small?: boolean;
}) {
  const router = useRouter();

  const handleRedirect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/products?category=${title}`);
  };

  return (
    <>
      {/* <link rel="stylesheet preload" href="./styles.css" as="style" /> */}

      <div
        className={cn(
          `product-section-card ${small ? 'card-small' : ''}`,
          `m-auto flex aspect-square h-32 w-44 items-center justify-center rounded-xl bg-primary p-4 opacity-90 hover:cursor-pointer hover:border-2 hover:border-primary hover:bg-white`,
          className
        )}
        onClick={handleRedirect}
      >
        <div className={`flex flex-col items-center`}>
          {icon && <div dangerouslySetInnerHTML={{__html: icon}} />}
          <p className="pt-2 text-center align-baseline font-roboto text-sm font-medium text-primary-foreground">
            {title}
          </p>
        </div>
      </div>
    </>
  );
}
