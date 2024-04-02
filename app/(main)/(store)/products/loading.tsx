import ProductListSceleton from '@/components/loaders/ProductsListSceleton';

export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-64 pt-5">
        <div className="h-8 w-40 animate-pulse bg-muted" />
        <div className="mt-2 h-4 animate-pulse bg-muted" />
        <div className="mt-2 h-4 animate-pulse bg-muted" />
        <div className="mt-2 h-4 animate-pulse bg-muted" />
      </div>
      <div className="flex-1 lg:pl-10">
        <ProductListSceleton />
      </div>
    </div>
  );
}
