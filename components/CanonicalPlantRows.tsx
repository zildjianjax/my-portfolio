import React, { useEffect, useState } from "react";
import { stripAddress } from "../lib/helpers";
import { Common, CommonCollection, Land, Plant } from "../lib/interface";
import PlantRow from "./PlantRow";

const CanonicalPlantRows: React.FC<{
  plant: Plant | Common;
  land: Land | Common;
  handleLockPlant: (plant_id: string) => void;
  handleUnlock: (plant_id: string) => void;
  handleUpdateCount: () => void;
  crow: boolean;
  crowHours: number;
}> = ({
  plant,
  land,
  handleLockPlant,
  handleUnlock,
  handleUpdateCount,
  crow,
  crowHours,
}) => {
  return (
    <tr
      className={`${plant?.isFiveMinutesRemaining && "in-one-min"} ${
        plant?.hasRecentlyPassed && "has-passed"
      } ${plant?.locked && "is-locked"}`}
    >
      <td>
        <div className="flex land-link relative pl-7">
          <img
            src="img/lock.svg"
            className="absolute left-0 cursor-pointer"
            onClick={() => handleLockPlant(plant.readableId)}
          />
          <div>
            <a
              href={`https://marketplace.plantvsundead.com/marketplace/plant#/farm/other/${land.address}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {stripAddress(land.address)}
            </a>
            <span className="coorxy">
              X: {land.x}, Y: {land.y}
            </span>
          </div>
        </div>
      </td>
      <PlantRow
        plant={plant}
        handleUnlock={handleUnlock}
        handleUpdateCount={handleUpdateCount}
        crow={crow}
        crowHours={crowHours}
      />
    </tr>
  );
};

export default CanonicalPlantRows;
