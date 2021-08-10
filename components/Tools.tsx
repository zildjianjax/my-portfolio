import React from "react";

const Tools = () => {
  return (
    <div className="">
      <ul className="flex space-x-5">
        <li className="flex space-x-2 items-center">
          <div className="bg-yellow-500 h-10 rounded-3xl w-10">
            <img src="/img/water.png" />
          </div>
          <span className="text-blue-500 font-bold">15 <span className="text-gray-400 font-bold">/15</span></span>
        </li>
        <li className="flex space-x-2 items-center">
        <div className="bg-yellow-500 h-10 rounded-3xl w-10">
            <img src="/img/scarecrow.png" />
          </div>
          <span className="text-blue-500 font-bold">5 <span className="text-gray-400 font-bold">/5</span></span>
        </li>
      </ul>
    </div>
  );
};

export default Tools;
