import React from 'react';

import {cn} from '@/lib/utils';

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <div className={cn('m-auto px-4 sm:px-16 lg:max-w-4xl lg:px-0 xl:max-w-6xl 2xl:max-w-7xl', className)}>
      {children}
    </div>
  );
}
