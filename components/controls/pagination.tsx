'use client';

import {usePagination} from '@/hooks/usePagination';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {useState} from 'react';

import {Pagination as IPagination} from '@/lib/types';
import {cn} from '@/lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
  className: string;
  pagination: IPagination;
}

export default function PaginationComponent(props: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const {className, pagination} = props;
  const {totalPages, currentPage, hasNext, hasPrev} = pagination;

  const pages = usePagination({
    currentPage: currentPage,
    totalCount: totalPages,
    siblingCount: 1,
  });

  const handleNextPage = () => {
    if (hasNext) {
      const params = new URLSearchParams(searchParams);
      const nextPage = currentPage + 1;
      params.set('page', nextPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      const params = new URLSearchParams(searchParams);
      const prevPage = currentPage - 1;
      params.set('page', prevPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSelectPage = (page?: number) => {
    if (page && page > 0) {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className={cn('', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} disabled={!hasPrev} />
          </PaginationItem>

          {pages?.map((pageNumber, index) => {
            if (typeof pageNumber === 'number') {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink page={pageNumber} onClick={handleSelectPage} isActive={pageNumber === currentPage}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (pageNumber === '...') {
              return <PaginationEllipsis key={`${pageNumber}-${index}`} />;
            }
          })}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} disabled={!hasNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
