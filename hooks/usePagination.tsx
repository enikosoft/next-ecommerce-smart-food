import {useMemo} from 'react';

interface Pagination {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
    Initialize an array of specific size and fill it with values from a starting point to an ending point.
  */
  return Array.from({length}, (_, idx) => idx + start);
};

const DOTS = '...';

export const usePagination = ({totalCount, siblingCount = 1, currentPage}: Pagination) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = totalCount;

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
      Determine the indices for the previous and next pages, ensuring they remain within the valid range (1 to total number of pages).
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Left dots not show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 1 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Right dots now show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 1 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, siblingCount, currentPage]);

  return paginationRange;
};
