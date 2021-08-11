import React, { ReactElement } from "react";
import { stripAddress } from "../lib/helpers";
import { Common, CommonCollection, Land, Plant } from "../lib/interface";
import PlantRow from "./PlantRow";

const CanonicalPlantRows: React.FC<{
  plant: Plant | Common;
  land: Land | Common;
}> = ({ plant, land }) => {
  return (
    <tr
      className={`${plant?.isFiveMinutesRemaining && "in-one-min"} ${
        plant?.hasRecentlyPassed && "has-passed"
      }`}
    >
      <td>
        <div className="flex justify-center land-link">
          <div>
            <a
              href={`https://marketplace.plantvsundead.com/farm/other/${land.address}`}
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
      <PlantRow plant={plant} />
    </tr>
  );
};

export default CanonicalPlantRows;
