import React, { useState, useEffect } from "react";
import {
  Common,
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import AddPlant from "./AddPlant";
import moment from "moment";
import _ from "lodash";
import { getTimeDiff, stripAddress } from "../lib/helpers";

const Land: React.FC<{
  land: LandInterface | Common;
  plants: CommonCollection<Plant>;
}> = ({ land, plants }) => {
  const [landPlants, setLandPlants] = useState<LandInterface[] | Common[]>([]);
  const [firstRow, setFirstRow] = useState<LandInterface | Common>();
  const [plantCount, setPlantCount] = useState<number>(0);
  const [timer, steTimer] = useState<number>(0);

  let interval: number;

  const generateHourDiff = () => {
    let landPlantsArray: Plant[] | Common[] =
      Object.values(plants || {}).filter((plant) => plant.landId == land.id) ||
      [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      return { ...plant, ...getTimeDiff(plant.resetTime) };
    });

    landPlantsArray = _.reverse(_.sortBy(landPlantsArray, ["timeRemaining"]));

    setLandPlants(landPlantsArray);
    setPlantCount(landPlantsArray.length);
    setFirstRow(landPlantsArray.splice(0, 1)[0]);
  };

  useEffect(() => {
    generateHourDiff();

    interval = window.setInterval(() => {
      steTimer(timer + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [plants, timer]);

  const displayTimer = (plant: Plant | Common | undefined) => {
    return `${moment(plant?.resetTime).format("hh:mm:ss a")} (
      ${
        plant?.differenceToNextTime
      } ${`${plant?.hoursDiff}:${plant?.minutesDiff}:${plant?.secondsDiff}`})`;
  };

  return (
    <>
      <tr className={`${firstRow?.isFiveMinutesRemaining && "has-passed"}`}>
        <th rowSpan={plantCount} className="align-top">
          <div className="flex items-center space-x-3">
            <a
              href={`https://marketplace.plantvsundead.com/farm/other/${land.address}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {stripAddress(land.address)}
            </a>
            <AddPlant landId={land.id} />
          </div>
        </th>
        <td>{displayTimer(firstRow)}</td>
        <td>{firstRow?.page}</td>
        <td>{firstRow?.card}</td>
        <td>{firstRow?.element}</td>
        <td>{firstRow?.readableId}</td>
        <td>Skip, Done</td>
      </tr>
      {plants &&
        landPlants.map((plant) => (
          <tr
            key={plant?.readableId}
            className={`${plant.isFiveMinutesRemaining && "bg-green-100"}`}
          >
            <td>{displayTimer(plant)}</td>
            <td>{plant?.page}</td>
            <td>{plant?.card}</td>
            <td>{plant?.element}</td>
            <td>{plant?.readableId}</td>
            <td>Skip, Done</td>
          </tr>
        ))}
    </>
  );
};

export default Land;
