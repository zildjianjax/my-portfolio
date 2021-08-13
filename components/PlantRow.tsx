import React from "react";
import { Common, Plant } from "../lib/interface";
import moment from "moment";
import _ from "lodash";
import { plantCountdownHtml } from "../lib/helpers";

const PlantRow: React.FC<{
  plant: Plant | Common;
  handleUnlock: (id: string) => void;
}> = ({ plant, handleUnlock }) => {
  const displayTimer = (plant: Plant | Common | undefined) => {
    return `${moment(plant?.resetTime).format("hh:mm:ss a")} (
      ${plant?.differenceToNextTime} ${plantCountdownHtml(plant as Plant)})`;
  };
  let plantObject = plant as Plant;
  return (
    (plantObject as Plant) && (
      <>
        <td className="p-2">{plantObject && displayTimer(plantObject)}</td>
        <td className="p-2">{plantObject?.page}</td>
        <td className="p-2">{plantObject?.card}</td>
        <td className="p-2">{plantObject?.element}</td>
        <td className="p-2">{plantObject?.readableId}</td>
        <td className="p-2">
          {plantObject?.locked && (
            <button onClick={() => handleUnlock(plantObject.readableId)}>
              Done
            </button>
          )}
        </td>
      </>
    )
  );
};

export default PlantRow;
