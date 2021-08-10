import React from "react";

const Summary = () => {
  return (
    <div className="gap-3 grid grid-cols-4 mt-8">
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col">
        <h4 className="text-m-1 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-300">2</p>
      </div>
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col">
        <h4 className="text-m-1 text-sm">Total LE Farmed</h4>
        <p className="text-3xl font-bold text-gray-300">150 LE</p>
      </div>
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col col-span-2">
        {/* <h4 className="text-m-1 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-300">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col col-span-2">
        {/* <h4 className="text-m-1 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-300">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col">
        {/* <h4 className="text-m-1 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-300">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md rounded-3xl bheader text-gray-600 justify-center items-center flex-col">
      <h4 className="text-m-1 text-sm">PVU</h4>
        <p className="text-3xl font-bold text-gray-300">1.5 PvU</p>
      </div>
    </div>
  );
};

export default Summary;
