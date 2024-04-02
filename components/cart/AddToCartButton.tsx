import {BsCart3} from 'react-icons/bs';

import {cn} from '@/lib/utils';

import {Button} from '../ui/button';

export default function AddToCartButton({
  onClick,
  className,
}: {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <Button onClick={onClick} className={cn('w-inherit', className)} variant={'default'} size={'icon'}>
      <BsCart3 className="size-5 sm:size-6" />
    </Button>
  );
}
