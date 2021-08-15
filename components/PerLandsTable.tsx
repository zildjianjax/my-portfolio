import React, { useState, useEffect } from "react";
import _ from "lodash";
import LandsTable from "./LandsTable";
import { CommonCollection, Land, Plant } from "../lib/interface";
import Filters from "./Filters";
import firebase from "firebase";
import Paginations from "./Paginations";

type PerLandTableProps = {
  isLoaded: boolean;
  lands: CommonCollection<Land>;
  plants: CommonCollection<Plant>;
  user: firebase.User | null | undefined;
  CanonicalField: React.FC;
};

const PerLandsTable: React.FC<PerLandTableProps> = ({
  isLoaded,
  lands,
  plants,
  user,
  CanonicalField,
}) => {
  const [availableLandsToShow, setAvailableLandsToShow] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const totalLands = Object.keys(lands).length - 1;
  const perPageOptions = [4, 6, 8, 10, 15, 20];

  useEffect(() => {
    handlePagination(page);    
  }, [page, perPage, isLoaded]);

  const handlePagination = (page_value: number): void => {
    setPage(page_value);

    let landIds = Object.keys(lands).slice(
      perPage * (page - 1),
      perPage * page
    );
    setAvailableLandsToShow(_.pick(lands, landIds));
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
      <LandsTable
        lands={availableLandsToShow as CommonCollection<Land>}
        plants={plants}
        user={user}
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

export default PerLandsTable;
