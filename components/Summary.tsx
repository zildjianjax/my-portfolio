import React from "react";

const Summary = () => {
  return (
    <div className="gap-3 grid grid-cols-4 mt-8">
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col">
        <h4 className="text-gray-400 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-600">2</p>
      </div>
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col">
        <h4 className="text-gray-400 text-sm">Total LE Farmed</h4>
        <p className="text-3xl font-bold text-gray-600">150 LE</p>
      </div>
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col col-span-2">
        {/* <h4 className="text-gray-400 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-600">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col col-span-2">
        {/* <h4 className="text-gray-400 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-600">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col">
        {/* <h4 className="text-gray-400 text-sm">Accounts</h4>
        <p className="text-3xl font-bold text-gray-600">2</p> */}
      </div>
      <div className="flex border p-4 h-36 rounded-md justify-center items-center flex-col">
      <h4 className="text-gray-400 text-sm">PVU</h4>
        <p className="text-3xl font-bold text-gray-600">1.5 PvU</p>
      </div>
    </div>
  );
};

export default Summary;
