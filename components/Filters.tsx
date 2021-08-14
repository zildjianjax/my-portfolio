import React, { Dispatch, SetStateAction } from "react";
import AdminCheck from "./AdminCheck";

const Filters: React.FC<{
  setPerPage: Dispatch<SetStateAction<number>>;
  CanonicalField: React.FC;
  PaginationField?: React.FC;
  RealTimeField?: React.FC;
  perPageOptions: number[];
  stickToBottom?: boolean;
}> = ({
  setPerPage,
  CanonicalField,
  perPageOptions,
  PaginationField,
  RealTimeField,
  stickToBottom,
}) => {  
  return (
    <div
      className={`flex justify-end mt-3 space-x-4 items-center z-30 ${
        stickToBottom && "sticky bottom-0"
      }`}
    >
      {PaginationField && <PaginationField />}
      {RealTimeField && <RealTimeField />}
      <CanonicalField />
      <div className="flex space-x-2 items-center">
        <label className="text-gray-300">Lands Per Page:</label>
        <select
          className="px-2 py-1 rounded bg-white"
          onChange={(e) => setPerPage((e.target.value as unknown) as number)}
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
