import React from "react";
import { Common, Plant } from "../lib/interface";
import AdminCheck from "./AdminCheck";
import moment from "moment";

const PlantRow: React.FC<{ plant: Plant }> = ({ plant }) => {
  const displayTimer = (plant: Plant | Common | undefined) => {
    return `${moment(plant?.resetTime).format("hh:mm:ss a")} (
      ${
        plant?.differenceToNextTime
      } ${`${plant?.hoursDiff}:${plant?.minutesDiff}:${plant?.secondsDiff}`})`;
  };
  return (
    plant && (
      <>
        <td>{plant && displayTimer(plant)}</td>
        <td>{plant?.page}</td>
        <td>{plant?.card}</td>
        <td>{plant?.element}</td>
        <td>{plant?.readableId}</td>
        <td>{plant && `Skip, Done`}</td>
      </>
    )
  );
};

export default PlantRow;
