import React, { useEffect } from "react";
import {
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import Land from "./Land";

const Lands: React.FC<{
  lands: CommonCollection<LandInterface>;
  plants: CommonCollection<Plant>;
}> = ({ lands, plants }) => {
  return (
    <table className="mt-5">
      <thead>
        <tr>
          <th rowSpan={2} className="text-center w-3/12">
            Land
          </th>
          <th colSpan={5} className="text-center">
            Plant
          </th>
          <th rowSpan={2} className="text-center">
            Actions
          </th>
        </tr>
        <tr>
          <th>Reset In</th>
          <th>Page</th>
          <th>Card Index</th>
          <th>Element</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {lands &&
          Object.values(lands).map((land) => (
            <Land key={land.id} land={land} plants={plants} />
          ))}
      </tbody>
    </table>
  );
};

export default Lands;
