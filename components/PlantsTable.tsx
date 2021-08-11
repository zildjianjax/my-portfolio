import React, { useEffect } from "react";
import firebase from "firebase";
import {
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import LandRow from "./LandRow";
import AdminCheck from "./AdminCheck";
import CanonicalLandPlants from "./CanonicalLandPlants";
import CanonicalPlantRows from "./CanonicalPlantRows";

const PlantsTable: React.FC<{
  lands: CommonCollection<LandInterface>;
  plants: Plant[];
  user: firebase.User | null | undefined;
}> = ({ lands, plants }) => {
  return (
    <div>
      <table className="mt-5 cus1">
        <thead className="text-center">
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
          {Object.values(plants).map((plant, index) => {
            return (
              <CanonicalPlantRows
                key={index}
                land={lands[plant.landId]}
                plant={plant}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsTable;
