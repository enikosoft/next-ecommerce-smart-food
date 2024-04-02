import React from 'react';

export default function RecipesListSceleton() {
  return (
    <>
      <div className="m-auto my-5 h-10 w-72 animate-pulse bg-muted" />
      <div className="grid grid-cols-1 grid-rows-4 gap-8 md:grid-cols-[48%_48%] md:grid-rows-[200px_400px]">
        <div className="h-[200px] animate-pulse bg-muted"></div>
        <div className="h-[200px] animate-pulse bg-muted"></div>
        <div className="h-[200px] animate-pulse bg-muted md:w-[140%]"></div>
        <div className="hidden h-[200px] animate-pulse justify-self-end bg-muted md:block md:w-[60%]"></div>
      </div>
    </>
  );
}
