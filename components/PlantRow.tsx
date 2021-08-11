import React from "react";
import { Common, Plant } from "../lib/interface";
import AdminCheck from "./AdminCheck";
import moment from "moment";

const PlantRow: React.FC<{ plant: Plant | Common }> = ({ plant }) => {
  const displayTimer = (plant: Plant | Common | undefined) => {
    return `${moment(plant?.resetTime).format("hh:mm:ss a")} (
      ${
        plant?.differenceToNextTime
      } ${`${plant?.hoursDiff}:${plant?.minutesDiff}:${plant?.secondsDiff}`})`;
  };
  return (
    plant && (
      <>
        <td className="p-4">{plant && displayTimer(plant)}</td>
        <td className="p-4">{plant?.page}</td>
        <td className="p-4">{plant?.card}</td>
        <td className="p-4">{plant?.element}</td>
        <td className="p-4">{plant?.readableId}</td>
        <td className="p-4">{plant && `Skip, Done`}</td>
      </>
    )
  );
};

export default PlantRow;
