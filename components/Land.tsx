import React, { useState, useEffect, useRef } from "react";
import {
  Common,
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import AddPlant from "./AddPlant";
import moment from "moment";
import _ from "lodash";
import firebase from "firebase";
import { getTimeDiff, stripAddress } from "../lib/helpers";
import AdminCheck from "./AdminCheck";
import PlantRow from "./PlantRow";

const Land: React.FC<{
  land: LandInterface | Common;
  plants: CommonCollection<Plant>;
  user: firebase.User | null | undefined;
}> = ({ land, plants, user }) => {
  const [landPlants, setLandPlants] = useState<LandInterface[] | Common[]>([]);
  const [firstRow, setFirstRow] = useState<Plant | Common>();
  const [plantCount, setPlantCount] = useState<number>(0);
  const [timer, steTimer] = useState<number>(0);

  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  const generateHourDiff = () => {
    let landPlantsArray: Plant[] | Common[] =
      Object.values(plants || {}).filter((plant) => plant.landId) ||
      [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      return { ...plant, ...getTimeDiff(plant.resetTime) };
    }).filter((plant) => plant.isThirthyMinutesRemaing );

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(0, 20);

    setLandPlants(landPlantsArray);
    setPlantCount(landPlantsArray.length);
    setFirstRow(landPlantsArray.splice(0, 1)[0]);
  };

  useEffect(() => {
    generateHourDiff();
    interval.current = setInterval(() => {
      steTimer(timer + 1);
    }, 1000);
    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, [plants, timer]);

  return (
    <>
      <tr
        className={`${firstRow?.isFiveMinutesRemaining && "in-five-min"} ${
          firstRow?.hasRecentlyPassed && "has-passed"
        }`}
      >
        <th rowSpan={plantCount} className="align-top">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <a
                href={`https://marketplace.plantvsundead.com/farm/other/${land.address}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                {stripAddress(land.address)}
              </a>
              <span>
                X: {land.x}, Y: {land.y}
              </span>
            </div>
            <AdminCheck>
              <AddPlant landId={land.id} />
            </AdminCheck>
          </div>
        </th>
        <PlantRow plant={firstRow as Plant} />
      </tr>
      {plants &&
        landPlants.map((plant) => (
          <tr
            key={plant?.readableId}
            className={`${plant?.isFiveMinutesRemaining && "in-five-min"} ${
              plant?.hasRecentlyPassed && "has-passed"
            }`}
          >
            <PlantRow plant={plant as Plant} />
          </tr>
        ))}
    </>
  );
};

export default Land;
