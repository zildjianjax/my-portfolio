import React from "react";
import { Common, Plant } from "../lib/interface";
import moment from "moment";
import _ from "lodash";
import { plantCountdownHtml } from "../lib/helpers";
import PlantTimer from "./PlantTimer";

const PlantRow: React.FC<{
  plant: Plant | Common;
  handleUnlock?: (id: string) => void;
  handleUpdateCount?: () => void;
  crow: boolean;
  crowHours: number;
}> = ({ plant, handleUnlock, handleUpdateCount, crow, crowHours }) => {
  let plantObject = plant as Plant;
  return (
    (plantObject as Plant) && (
      <>
        <td className="p-2">
          {
            <PlantTimer
              plant={plantObject}
              handleUpdateCount={handleUpdateCount}
              crow={crow}
              crowHours={crowHours}
            />
          }
        </td>
        <td className="p-2">{plantObject?.page}</td>
        <td className="p-2">{plantObject?.card}</td>
        <td className="p-2">{plantObject?.element}</td>
        <td className="p-2">{plantObject?.readableId}</td>
        <td className="p-2">
          {plantObject?.locked && (
            <button
              onClick={() =>
                handleUnlock && handleUnlock(plantObject.readableId)
              }
            >
              Done
            </button>
          )}
        </td>
      </>
    )
  );
};

export default PlantRow;
