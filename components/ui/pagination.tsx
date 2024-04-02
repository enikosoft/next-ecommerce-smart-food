import {ChevronLeft, ChevronRight, MoreHorizontal} from 'lucide-react';
import * as React from 'react';

import {cn} from '@/lib/utils';

import {ButtonProps, buttonVariants} from '@/components/ui/button';

const Pagination = ({className, ...props}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({className, ...props}, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({className, ...props}, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = Pick<ButtonProps, 'size'> & {
  key?: number;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  page?: number;
  children?: React.ReactNode;
  onClick: (page?: number) => void;
};

const PaginationLink = ({
  className,
  isActive,
  onClick,
  key,
  page,
  size = 'icon',
  disabled,
  ...props
}: PaginationLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick(page);
  };

  return (
    <a
      onClick={handleClick}
      key={key}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size,
        }),
        'w-7 font-roboto text-base text-darkGrey hover:cursor-pointer hover:font-semibold hover:text-primary',
        isActive ? 'font-semibold text-primary' : '',
        className
      )}
      {...props}
    />
  );
};

PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({className, disabled, onClick, ...props}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    onClick={onClick}
    aria-label="Go to previous page"
    size="default"
    className={cn(
      'group mr-8 h-8 w-8 rounded-full border border-primary bg-primary-foreground p-0 hover:bg-primary',
      className,
      disabled ? 'border-none bg-mediumGrey text-white hover:cursor-not-allowed hover:bg-mediumGrey' : ''
    )}
    {...props}
  >
    <ChevronLeft
      className={cn(
        'h-4 w-4 text-primary group-hover:text-white',
        className,
        disabled ? 'text-white hover:cursor-not-allowed' : ''
      )}
    />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({className, disabled, onClick, ...props}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    onClick={onClick}
    aria-label="Go to next page"
    size="default"
    className={cn(
      'group ml-8 h-8 w-8 rounded-full border border-primary bg-primary-foreground p-0 hover:bg-primary',
      className,
      disabled ? 'border-none bg-mediumGrey text-white hover:cursor-not-allowed hover:bg-mediumGrey' : ''
    )}
    {...props}
  >
    <ChevronRight
      className={cn(
        'h-4 w-4 text-primary group-hover:text-white',
        className,
        disabled ? 'text-white hover:cursor-not-allowed' : ''
      )}
    />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({className, ...props}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-6 w-9 items-end justify-center font-semibold text-darkGrey', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
