import Head from "next/head";
import { useState, useEffect, useContext, MouseEventHandler } from "react";
import Lands from "../components/Lands";
import Summary from "../components/Summary";
import { UserContext } from "../lib/context";
import { CommonCollection, Land, Plant } from "../lib/interface";
import AuthCheck from "../components/AuthCheck";
import AdminCheck from "../components/AdminCheck";
import { postData } from "../lib/api";
import _ from "lodash";
import Alert from "sweetalert2";
import Paginations from "../components/Paginations";
import Filters from "../components/Filters";
import AccountSwitcher from "../components/AccountSwitcher";

export default function Home() {
  const [lands, setLands] = useState({});
  const [plants, setPlants] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [availableLandsToShow, setAvailableLandsToShow] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const totalLands = Object.keys(lands).length - 1;

  const fetchData = async () => {
    if (isFetching) {
      return false;
    }

    setIsFetching(true);

    const res = await fetch(`/api/get_data`);
    let data: {
      plants: CommonCollection<Plant>;
      lands: CommonCollection<Land>;
    } = await res.json();

    setLands(data.lands);
    setPlants(data.plants);

    setIsLoaded(true);
  };
  useEffect(() => {
    fetchData();
  }, [isFetching]);

  useEffect(() => {
    handlePagination(page);
    console.log("paginate triggered");
  }, [page, perPage, isLoaded]);

  const { user } = useContext(UserContext);

  const onClick: MouseEventHandler = async () => {
    let res = await postData("/api/sync_data");
    Alert.fire("", "Successfully synced data", "success");
  };

  const handlePagination = (page_value: number): void => {
    setPage(page_value);

    let landIds = Object.keys(lands).slice(
      perPage * (page - 1),
      perPage * page
    );
    setAvailableLandsToShow(_.pick(lands, landIds));
  };

  return (
    isLoaded && (
      <div className="p-4">
        <Head>
          <title>PVU</title>
          <link rel="icon" href="/icon.svg" />
        </Head>
        <AuthCheck>
          <div className="container mx-auto">
            <br />
            <AdminCheck>
              <button onClick={onClick} className="btn btn-success">
                Sync Data
              </button>
              <Summary />
              <AccountSwitcher
                // accounts={accounts && Object.values(accounts)}
                // setSelectedAccount={setSelectedAccount}
                // selectedAccount={selectedAccount}
              />
            </AdminCheck>
            <Filters setPerPage={setPerPage} />
            <Lands
              lands={availableLandsToShow as CommonCollection<Land>}
              plants={plants}
              user={user}
            />
          </div>
          <Filters setPerPage={setPerPage} />
          <Paginations
            page={page}
            perPage={perPage}
            totalLands={totalLands}
            handlePagination={handlePagination}
          />
        </AuthCheck>
      </div>
    )
  );
}
