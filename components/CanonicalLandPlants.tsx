import React, { useState, useEffect, useRef, useCallback } from "react";
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
import CanonicalPlantRows from "./CanonicalPlantRows";

const CanonicalLandPlants: React.FC<{
  lands: CommonCollection<Plant>;
  plants: CommonCollection<Plant>;
}> = ({ plants, lands }) => {
  const [landPlants, setLandPlants] = useState<Plant[] | Common[]>([]);
  const [timer, steTimer] = useState<number>(0);

  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  const generateHourDiff = useCallback(() => {
    let landPlantsArray: Plant[] | Common[] = Object.values(plants) || [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      return { ...plant, ...getTimeDiff(plant.resetTime) };
    });

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(0, 10);

    setLandPlants(landPlantsArray);
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
      {landPlants.map((plant) => (
        <CanonicalPlantRows plant={plant} lands={lands} />
      ))}
    </>
  );
};

export default CanonicalLandPlants;
