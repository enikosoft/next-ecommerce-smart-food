'use client';

import {useRouter} from 'next/navigation';

import {useBreadcrumbs} from '@/stores/breadcrumbs';

export default function Breadcrumbs() {
  const router = useRouter();

  const {breadcrumbs} = useBreadcrumbs();

  const handleRedirect = (path: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="max-w-full font-rubik text-sm text-primary-black">
      <ul className="flex items-center">
        {breadcrumbs.map((item, index) => (
          <li
            key={index}
            onClick={index !== breadcrumbs.length - 1 ? handleRedirect(item.path) : undefined}
            className={`group-hover-last:cursor-not-allowed last:text-[12px] last:font-semibold ${index === breadcrumbs.length - 1 ? 'pointer-events-none' : ''}`}
          >
            <span className="inline-flex cursor-pointer items-center gap-2 hover:underline">{item.name}</span>
            {index !== breadcrumbs.length - 1 && <span className="px-1.5">/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
