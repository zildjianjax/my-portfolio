import React, { useEffect } from "react";
import firebase from "firebase";
import {
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import LandRow from "./LandRow";
import AdminCheck from "./AdminCheck";

const LandsTable: React.FC<{
  lands: CommonCollection<LandInterface>;
  plants: CommonCollection<Plant>;
  user: firebase.User | null | undefined;
}> = ({ lands, plants, user }) => {
  return (
    <div>
      <table className="mt-5 cus1">
        <thead className="text-center">
          <tr>
            <th rowSpan={2} className="text-center w-3/12 p-4">
              Land
            </th>
            <th colSpan={5} className="text-center p-4">
              Plant
            </th>
            <th rowSpan={2} className="text-center p-4">
              Actions
            </th>
          </tr>
          <tr>
            <th className="p-4">Reset In</th>
            <th className="p-4">Page</th>
            <th className="p-4">Card Index</th>
            <th className="p-4">Element</th>
            <th className="p-4">ID</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(lands).map((land, index) => (
            <LandRow
              key={index}
              land={land}
              plants={plants}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandsTable;
