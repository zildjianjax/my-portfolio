import Head from "next/head";
import { useState, useEffect, useContext, MouseEventHandler } from "react";
import { admin } from "../lib/whitelist";
import AccountSwitcher from "../components/AccountSwitcher";
import Lands from "../components/Lands";
import Summary from "../components/Summary";
import { UserContext } from "../lib/context";
import { getUserAccounts, getUserLands } from "../lib/hooks";
import { CommonCollection, Land, Plant } from "../lib/interface";
import AuthCheck from "../components/AuthCheck";
import AdminCheck from "../components/AdminCheck";
import { postData } from "../lib/api";
import _ from "lodash";

export default function Home() {
  const [lands, setLands] = useState({});
  const [plants, setPlants] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const perPage = 4;

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
  };

  let landIds = Object.keys(lands).slice(page - 1, perPage);
  let availableLandsToShow = _.pick(lands, landIds);

  return (
    isLoaded && (
      <div className="p-4">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthCheck>
          <div className="container mx-auto">
            <button onClick={onClick}>Sync Data</button>
            <br />
            <AdminCheck>
              <Summary />
              {/* <AccountSwitcher
                accounts={accounts && Object.values(accounts)}
                setSelectedAccount={setSelectedAccount}
                selectedAccount={selectedAccount}
              /> */}
            </AdminCheck>
            <Lands
              lands={availableLandsToShow as CommonCollection<Land>}
              plants={plants}
              user={user}
            />
          </div>
          <div>
            <ul>

            </ul>
          </div>
        </AuthCheck>
      </div>
    )
  );
}
