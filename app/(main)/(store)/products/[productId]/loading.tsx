export default function Loading() {
  return (
    <div className="pt-5">
      <div className="mt-8 flex flex-col md:mt-10 md:flex-row">
        <div className="relative h-56 w-full animate-pulse rounded-md bg-muted sm:h-72 md:h-96 md:w-[470px]" />

        <div className="mt-6 flex flex-col justify-between md:mt-0 md:py-5 md:pl-16">
          <h2 className="h-8 max-h-8 w-64 animate-pulse bg-muted md:flex-1" />

          <div className="mt-4 h-5 max-h-5 w-80 animate-pulse bg-muted md:flex-1"></div>

          <p className="mt-7 h-5 max-h-40 animate-pulse bg-muted md:flex-[5_5_0%]" />

          <div className="mt-4 flex justify-between gap-8 md:mt-0 md:justify-start md:gap-3">
            <div className="h-10 w-1/2 animate-pulse bg-muted md:w-36" />
            <div className="h-10 w-1/2 animate-pulse bg-muted md:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
