import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Common,
  CommonCollection,
  Land,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import AddPlant from "./AddPlant";
import _ from "lodash";
import firebase from "firebase";
import { getLandData, getTimeDiff, stripAddress } from "../lib/helpers";
import AdminCheck from "./AdminCheck";
import PlantRow from "./PlantRow";

const LandRow: React.FC<{
  land: LandInterface | Common;
  plants: CommonCollection<Plant>;
  user?: firebase.User | null | undefined;
  handleSelectedLand: (land: Land) => void;
}> = ({ land, plants, handleSelectedLand }) => {
  const [landPlants, setLandPlants] = useState<LandInterface[] | Common[]>([]);
  const [firstRow, setFirstRow] = useState<Plant | Common>();
  const [plantCount, setPlantCount] = useState<number>(0);
  const [timer, steTimer] = useState<number>(0);

  let { totalPages, totalPlants, plants: filterLandPlants } = useMemo(
    () => getLandData(land as Land, plants),
    [land]
  );

  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  const generateHourDiff = useCallback(() => {
    let landPlantsArray: Plant[] | Common[] = filterLandPlants || [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      return { ...plant, ...getTimeDiff(plant.resetTime) };
    });

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(0, 10);

    setLandPlants(landPlantsArray);
    setPlantCount(landPlantsArray.length);
    setFirstRow(landPlantsArray.splice(0, 1)[0]);
  }, [timer]);

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
        className={`${firstRow?.isFiveMinutesRemaining && "in-one-min"} ${
          firstRow?.hasRecentlyPassed && "has-passed"
        }`}
      >
        <th
          rowSpan={plantCount == 0 ? 1 : plantCount}
          colSpan={plantCount == 0 ? 7 : 1}
        >
          <div className="flex justify-center land-link">
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
              <AdminCheck>
                <p>Total Pages: {totalPages}</p>
                <p>Total Plants: {totalPlants}</p>
                <a
                  className="cursor-pointer underline"
                  onClick={() => handleSelectedLand(land as Land)}
                >
                  View Plants
                </a>
              </AdminCheck>
            </div>
            <AdminCheck>
              <AddPlant landId={land.id} />
            </AdminCheck>
          </div>
        </th>
        {firstRow && <PlantRow plant={firstRow as Plant} />}
      </tr>
      {plants &&
        landPlants.map((plant, index) => (
          <tr
            key={plant?.readableId}
            className={`${plant?.isFiveMinutesRemaining && "in-one-min"} ${
              plant?.hasRecentlyPassed && "has-passed"
            } ${index + 1 == landPlants.length && "lastplant"}`}
          >
            <PlantRow plant={plant as Plant} />
          </tr>
        ))}
    </>
  );
};

export default LandRow;
