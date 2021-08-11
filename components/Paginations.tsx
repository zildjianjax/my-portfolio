import React, { Dispatch, SetStateAction } from "react";

const Paginations: React.FC<{
  page: number;
  handlePagination: (page_value: number) => void;
  perPage: number;
  totalLands: number;
}> = ({ page, handlePagination, perPage, totalLands }) => {
  let totalLandPages: number = totalLands / perPage;
  let firstNavs: string[] = [];
  let lastNavs: string[] = [];
  let splitNavs = false;

  if (totalLandPages % 1 != 0) {
    totalLandPages = parseInt((totalLandPages as unknown) as string) + 1;
  }

  let paginationItems = Object.keys([...Array(totalLandPages)]);

  if (totalLandPages > 15) {
    splitNavs = true;
    let pageOffset = page <= 3 ? 0 : page - 3;
    firstNavs = paginationItems.slice(pageOffset, pageOffset + 7);
    lastNavs = paginationItems.slice(-3);
  }

  const displayNavItems = (items: string[]) => {
    return items.map((p) => {
      let page_index = parseInt(p) + 1;
      return (
        <li key={page_index}>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-8 ${
              page_index == page && "bg-blue-500 text-white"
            }`}
            onClick={() => handlePagination(page_index)}
          >
            {page_index}
          </a>
        </li>
      );
    });
  };

  return (
    <div>
      <ul className="flex space-x-3 justify-center my-10">
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              page == 1 && "opacity-30"
            }`}
            onClick={() => page != 1 && handlePagination(1)}
          >
            First
          </a>
        </li>
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              page == 1 && "opacity-30"
            }`}
            onClick={() => page != 1 && handlePagination(page - 1)}
          >
            Prev
          </a>
        </li>
        {!splitNavs && displayNavItems(paginationItems)}
        {splitNavs && displayNavItems(firstNavs)}
        {splitNavs && <div>...</div>}
        {splitNavs && displayNavItems(lastNavs)}
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              page == totalLandPages && "opacity-30"
            }`}
            onClick={() => page != totalLandPages && handlePagination(page + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paginations;
