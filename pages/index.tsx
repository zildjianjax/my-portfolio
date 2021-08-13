import Head from "next/head";
import { useState, useEffect, useContext, MouseEventHandler } from "react";
import LandsTable from "../components/LandsTable";
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
import PerLandsTable from "../components/PerLandsTable";
import PerPlantsTable from "../components/PerPlantsTable";

export default function Home() {
  const [lands, setLands] = useState({});
  const [plants, setPlants] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCanonical, setIsCanonical] = useState(false);

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

  const { user } = useContext(UserContext);

  const onClick: MouseEventHandler = async () => {
    Alert.showLoading();
    let res = await postData("/api/sync_data");
    Alert.fire("", "Successfully synced data", "success");
  };

  const handleIsCanonical = (): void => {
    setIsCanonical(!isCanonical);
  };

  const CanonicalField: React.FC = () => {
    return (
      <AdminCheck>
        <div className="flex space-x-2 items-center rounded">
          <div className="checkbox">
            <input
              id="box"
              type="checkbox"
              checked={isCanonical}
              onChange={handleIsCanonical}
            />
            <label htmlFor="box" className="text-gray-300">
              Canonical
            </label>
          </div>
        </div>
      </AdminCheck>
    );
  };

  return (
    isLoaded && (
      <div className="p-4">
        <Head>
          <title>My Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthCheck>
          <div className="container mx-auto">
            <br />
            <AdminCheck>
              <div className="flex space-x-3">
                <button onClick={onClick} className="btn btn-success">
                  Sync Data
                </button>
                <div className="flex items-center space-x-3 text-white">
                  <p>Total Lands: <span className="font-bold">{Object.keys(lands).length}</span></p>
                  <p>Total Plants:  <span className="font-bold">{Object.keys(plants).length}</span></p>
                </div>
              </div>
              {/* <Summary /> */}
              <AccountSwitcher lands={lands} />
            </AdminCheck>
            {!isCanonical && (
              <PerLandsTable
                isLoaded={isLoaded}
                lands={lands as CommonCollection<Land>}
                plants={plants}
                user={user}
                CanonicalField={CanonicalField}
              />
            )}
            {isCanonical && (
              <AdminCheck>
                <PerPlantsTable
                  isLoaded={isLoaded}
                  lands={lands as CommonCollection<Land>}
                  plants={plants}
                  user={user}
                  CanonicalField={CanonicalField}
                />
              </AdminCheck>
            )}
          </div>
        </AuthCheck>
      </div>
    )
  );
}
