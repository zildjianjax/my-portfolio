import React, { Dispatch, SetStateAction } from "react";

const Paginations: React.FC<{
  page: number;
  handlePagination: (page_value: number) => void;
  perPage: number;
  totalLands: number;
}> = ({ page, handlePagination, perPage, totalLands }) => {
  let totalLandPages: number = totalLands / perPage;

  if (totalLandPages % 1 != 0) {
    totalLandPages = parseInt((totalLandPages as unknown) as string) + 1;
  }

  return (
    <div>
      <ul className="flex space-x-3 justify-center my-10">
        {Object.keys([...Array(totalLandPages)]).map((p) => {
          let page_index = parseInt(p) + 1;
          return (
            <li key={page_index}>
              <a
                className={`border cursor-pointer flex h-8 items-center justify-center rounded w-8 ${page_index == page && 'bg-blue-500 text-white'}`}
                onClick={() => handlePagination(page_index)}
              >
                {page_index}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Paginations;
