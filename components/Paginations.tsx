import _ from "lodash";
import React, { useState } from "react";

const Paginations: React.FC<{
  page: number;
  handlePagination: (page_value: number) => void;
  perPage: number;
  totalLands: number;
}> = ({ page, handlePagination, perPage, totalLands }) => {
  const [localPage, setLocalPage] = useState(page)
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
        <li key={page_index} className="hidden lg:block">
          <a
            className={`cursor-pointer flex h-8 items-center justify-center rounded w-8 ${
              page_index == page && "clicked"
            }`}
            onClick={() => handlePagination(page_index)}
          >
            {page_index}
          </a>
        </li>
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if(value > totalLandPages) {
      value = totalLandPages;
    } else if(value < 1) {
      value = 1;
    }
    setLocalPage(value);
    
    handlePaginationInputChange(value)
  }

  const handlePaginationInputChange = _.debounce((value) => {    
    handlePagination(value)
  } , 1000);

  return (
    <div className="flex justify-center">
      <ul className="flex items-center justify-center my-10 pag-b space-x-3">
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              localPage == 1 && "opacity-30"
            }`}
            onClick={() => localPage != 1 && handlePagination(1)}
          >
            First
          </a>
        </li>
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              localPage == 1 && "opacity-30"
            }`}
            onClick={() => localPage != 1 && handlePagination(localPage - 1)}
          >
            Prev
          </a>
        </li>
        {!splitNavs && displayNavItems(paginationItems)}
        {splitNavs && displayNavItems(firstNavs)}
        {splitNavs && <div className="hidden lg:block">...</div>}
        {splitNavs && displayNavItems(lastNavs)}
        <li className="block lg:hidden">
          <div className="flex items-center pager rounded">
            <input className="w-12 p-1 rounded-bl rounded-tl" type="number" value={localPage} max={totalLandPages} step="1" onChange={handleChange} /> <span className="px-3"> {totalLandPages}</span>
          </div>
        </li>
        <li>
          <a
            className={`border cursor-pointer flex h-8 items-center justify-center rounded w-12 ${
              localPage == totalLandPages && "opacity-30"
            }`}
            onClick={() => localPage != totalLandPages && handlePagination(localPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paginations;
