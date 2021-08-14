import moment from "moment";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { getTimeDiff, plantCountdownHtml } from "../lib/helpers";
import { Common, Plant } from "../lib/interface";

const PlantTimer: React.FC<{
  plant: Plant;
  handleUpdateCount?: () => void;
}> = ({ plant, handleUpdateCount }) => {
  const [timer, steTimer] = useState<number>(0);
  let interval: { current: NodeJS.Timeout | null } = useRef(null);
  const [display, setDisplay] = useState<string>();
  useEffect(() => {
    let updatedPlant = {
      ...plant,
      ...getTimeDiff(plant.resetTime, plant.locked),
    };

    if (updatedPlant.moveToNextDay != plant.moveToNextDay || updatedPlant.isFiveMinutesRemaining != plant.isFiveMinutesRemaining ||
      updatedPlant.hasRecentlyPassed != plant.hasRecentlyPassed) {
        handleUpdateCount && handleUpdateCount();
    }

    setDisplay(displayTimer(updatedPlant));
    interval.current = setInterval(() => {
      steTimer(timer + 1);
    }, 1000);
    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, [timer]);

  const displayTimer = (plant: Plant | Common | undefined) => {
    return `${moment(plant?.resetTime).format("hh:mm:ss a")} (
      ${plant?.differenceToNextTime} ${plantCountdownHtml(plant as Plant)})`;
  };
  return <div>{display}</div>;
};

export default PlantTimer;
