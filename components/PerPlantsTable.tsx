import React, { useState, useEffect, useCallback, useRef } from "react";
import _ from "lodash";
import LandsTable from "./LandsTable";
import { Common, CommonCollection, Land, Plant } from "../lib/interface";
import Filters from "./Filters";
import firebase from "firebase";
import Paginations from "./Paginations";
import { getTimeDiff } from "../lib/helpers";
import PlantsTable from "./PlantsTable";
import AdminCheck from "./AdminCheck";

type PerPlantsTableProps = {
  isLoaded: boolean;
  lands: CommonCollection<Land>;
  plants: CommonCollection<Plant>;
  user: firebase.User | null | undefined;
  CanonicalField: React.FC;
};

const PerPlantsTable: React.FC<PerPlantsTableProps> = ({
  isLoaded,
  lands,
  plants,
  user,
  CanonicalField,
}) => {
  const [availablePlantsToShow, setAvailablePlantsToShow] = useState({});
  const [page, setPage] = useState(1);
  const [plantsLocked, setPlantsLocked] = useState<string[]>(["0"]);
  const [perPage, setPerPage] = useState(20);
  const [realtime, setRealtime] = useState(true);
  const totalLands = Object.keys(plants).length - 1;
  const perPageOptions = [20, 50, 100];

  const [timer, steTimer] = useState<number>(0);
  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    handlePagination(page);
    if (realtime) {
      interval.current = setInterval(() => {
        steTimer(timer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, [page, perPage, isLoaded, timer, realtime, plantsLocked]);

  const handlePagination = (page_value: number): void => {
    setPage(page_value);

    let landPlantsArray: Plant[] | Common[] = Object.values(plants) || [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
        let isLocked: boolean = plantsLocked.includes(plant.readableId);
      return { ...plant, ...getTimeDiff(plant.resetTime, isLocked), locked: isLocked };
    });

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(perPage * (page - 1), perPage * page);

    setAvailablePlantsToShow(landPlantsArray);
  };

  const handleLockPlant = (plant_id: string) => {
    setPlantsLocked([...plantsLocked, plant_id])
  }
  const handleUnlock = (plant_id: string) => {
    let newPlantsLocked = plantsLocked.filter(id => id !== plant_id);
    setPlantsLocked(newPlantsLocked)
  }

  const PaginationField: React.FC = () => {
    return (
      <div>
        <Paginations
          page={page}
          perPage={perPage}
          totalLands={totalLands}
          handlePagination={handlePagination}
        />
      </div>
    );
  };

  const RealTimeField: React.FC = () => {
    return (
      <AdminCheck>
        <div className="flex space-x-2 items-center rounded">
          <div className="checkbox">
            <input
              id="realtime"
              type="checkbox"
              checked={realtime}
              onChange={() => setRealtime(!realtime)}
            />
            <label htmlFor="realtime" className="text-gray-300">
              Realtime
            </label>
          </div>
        </div>
      </AdminCheck>
    );
  };
  return (
    <>
      <Filters
        setPerPage={setPerPage}
        CanonicalField={CanonicalField}
        perPageOptions={perPageOptions}
        RealTimeField={RealTimeField}
      />
      <PlantsTable
        lands={lands}
        plants={availablePlantsToShow as Plant[]}
        user={user}
        handleLockPlant={handleLockPlant}
        handleUnlock={handleUnlock}
      />
      <Filters
        setPerPage={setPerPage}
        CanonicalField={CanonicalField}
        perPageOptions={perPageOptions}
        PaginationField={PaginationField}
        stickToBottom
      />
    </>
  );
};

export default PerPlantsTable;
