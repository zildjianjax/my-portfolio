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
  const [isCanonical, setIsCanonical] = useState(true);

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
    let res = await postData("/api/sync_data");
    Alert.fire("", "Successfully synced data", "success");
  };

  const handleIsCanonical = (): void => {
    setIsCanonical(!isCanonical);
  };

  const CanonicalField: React.FC = () => {
    return (
      <div className="flex space-x-2 items-center">
        <label className="text-gray-300">Canonical:</label>
        <input
          type="checkbox"
          checked={isCanonical}
          onChange={handleIsCanonical}
        />
      </div>
    );
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
              <AccountSwitcher lands={lands} />
            </AdminCheck>
            {!isCanonical && <PerLandsTable
              isLoaded={isLoaded}
              lands={lands as CommonCollection<Land>}
              plants={plants}
              user={user}
              CanonicalField={CanonicalField}
            />}
            {isCanonical && <PerPlantsTable
              isLoaded={isLoaded}
              lands={lands as CommonCollection<Land>}
              plants={plants}
              user={user}
              CanonicalField={CanonicalField}
            />}
          </div>
        </AuthCheck>
      </div>
    )
  );
}
