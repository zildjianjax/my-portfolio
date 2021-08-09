import React from "react";
import Image from "next/image";

const Tools = () => {
  return (
    <div className="">
      <ul className="flex space-x-5">
        <li className="flex space-x-2 items-center">
          <div className="bg-yellow-500 h-10 rounded-3xl w-10">
            <Image
              src="/img/water.png"
              alt="Landscape picture"
              width={50}
              height={50}
            />
          </div>
          <span className="text-blue-500 font-bold">15/15</span>
        </li>
        <li className="flex space-x-2 items-center">
          <div className="bg-yellow-500 h-10 rounded-3xl w-10">
            <Image
              src="/img/scarecrow.png"
              alt="Landscape picture"
              width={50}
              height={50}
            />
          </div>
          <span className="font-bold">5/5</span>
        </li>
      </ul>
    </div>
  );
};

export default Tools;
