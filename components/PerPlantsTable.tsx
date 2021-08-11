import React, { useState, useEffect, useCallback, useRef } from "react";
import _ from "lodash";
import LandsTable from "./LandsTable";
import { Common, CommonCollection, Land, Plant } from "../lib/interface";
import Filters from "./Filters";
import firebase from "firebase";
import Paginations from "./Paginations";
import { getTimeDiff } from "../lib/helpers";
import PlantsTable from "./PlantsTable";

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
  const [perPage, setPerPage] = useState(20);
  const totalLands = Object.keys(plants).length - 1;
  const perPageOptions = [20, 50, 100];

  const [timer, steTimer] = useState<number>(0);
  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    handlePagination(page);
    interval.current = setInterval(() => {
      steTimer(timer + 1);
    }, 1000);
    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, [page, perPage, isLoaded, timer]);

  const handlePagination = (page_value: number): void => {
    setPage(page_value);

    let landPlantsArray: Plant[] | Common[] = Object.values(plants) || [];

    landPlantsArray = landPlantsArray.map((plant: Plant | Common):
      | Plant
      | Common => {
      return { ...plant, ...getTimeDiff(plant.resetTime) };
    });

    landPlantsArray = _.reverse(
      _.sortBy(landPlantsArray, ["timeRemaining"])
    ).slice(perPage * (page - 1), perPage * page);

    setAvailablePlantsToShow(landPlantsArray);
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
  return (
    <>
      <Filters
        setPerPage={setPerPage}
        CanonicalField={CanonicalField}
        perPageOptions={perPageOptions}
      />
      <PlantsTable
        lands={lands}
        plants={availablePlantsToShow as Plant[]}
        user={user}
      />
      <Filters
        setPerPage={setPerPage}
        CanonicalField={CanonicalField}
        perPageOptions={perPageOptions}
        PaginationField={PaginationField}
      />
    </>
  );
};

export default PerPlantsTable;
