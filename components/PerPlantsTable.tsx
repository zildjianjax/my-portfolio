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
  const [crow, setCrow] = useState(false);
  const [crowHours, setCrowHours] = useState(2);
  const totalLands = Object.keys(plants).length - 1;
  const perPageOptions = [20, 50, 100];
  const defaultCrowHours = [2, 3, 4, 5, 6];

  const [updateCount, setUpdateCount] = useState(1);

  useEffect(() => {
    handlePagination(page);
  }, [page, perPage, isLoaded, realtime, plantsLocked, updateCount, crow, crowHours]);

  const handlePagination = (page_value: number): void => {
    setPage(page_value);

    let landPlantsArray: Plant[] | Common[] = Object.values(plants) || [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      let isLocked: boolean = plantsLocked.includes(plant.readableId);
      return {
        ...plant,
        ...getTimeDiff(plant.resetTime, isLocked, crow, crowHours),
        locked: isLocked,
      };
    });

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(perPage * (page - 1), perPage * page);

    setAvailablePlantsToShow(landPlantsArray);
  };

  const handleUpdateCount = () => {
    if (!realtime) {
      return;
    }
    setUpdateCount(updateCount + 1);
  };

  const handleLockPlant = (plant_id: string) => {
    let newPlants = [...plantsLocked];

    if (plantsLocked.includes(plant_id)) {
      newPlants = newPlants.filter((id) => id !== plant_id);
    } else {
      newPlants.push(plant_id);
    }
    setPlantsLocked(newPlants);
  };
  const handleUnlock = (plant_id: string) => {
    let newPlantsLocked = plantsLocked.filter((id) => id !== plant_id);
    setPlantsLocked(newPlantsLocked);
  };

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

  const CrowField: React.FC = () => {
    return (
      <AdminCheck>
        <>
          <div className="flex space-x-2 items-center rounded">
            <div className="checkbox">
              <input
                id="crow"
                type="checkbox"
                checked={crow}
                onChange={() => setCrow(!crow)}
              />
              <label htmlFor="crow" className="text-gray-300">
                Crow?
              </label>
            </div>
            {crow && (
              <select
                className="px-2 py-1 rounded bg-white w-12"
                onChange={(e) =>
                  setCrowHours((e.target.value as unknown) as number)
                }
                value={crowHours}
              >
                {defaultCrowHours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
              </select>
            )}
          </div>
        </>
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
        CrowField={CrowField}
      />
      <PlantsTable
        lands={lands}
        plants={availablePlantsToShow as Plant[]}
        user={user}
        handleLockPlant={handleLockPlant}
        handleUnlock={handleUnlock}
        handleUpdateCount={handleUpdateCount}
        crow={crow}
        crowHours={crowHours}
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
