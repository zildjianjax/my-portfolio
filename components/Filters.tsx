import React, { Dispatch, SetStateAction } from "react";

const Filters: React.FC<{ setPerPage: Dispatch<SetStateAction<number>> }> = ({
  setPerPage,
}) => {
  return (
    <div className="flex justify-end mt-3">
      <div className="flex space-x-2 items-center">
        <label className="text-gray-300">Lands Per Page:</label>
        <select
          className="px-2 py-1 rounded"
          onChange={(e) => setPerPage((e.target.value as unknown) as number)}
        >
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
