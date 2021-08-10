import React, { ChangeEventHandler, Dispatch, EventHandler, SetStateAction, SyntheticEvent } from "react";
import { Account, Common } from "../lib/interface";
import AddAccount from "./AddAccount";
import AddLand from "./AddLand";
import ImportJSON from "./ImportJSON";
import Tools from "./Tools";

const AccountSwitcher = ({ accounts, setSelectedAccount, selectedAccount }: { accounts?: Account[] | Common[], setSelectedAccount?: Dispatch<SetStateAction<string>>, selectedAccount?: string }) => {
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(setSelectedAccount) {
      setSelectedAccount(e.target.value)
    }
  }
  return (
    <div className="border mt-10 p-4 rounded-md flex space-x-5">
      {/* Comment */}
      {/* <select
        className="p-2 border rounded w-52"
        name=""
        id=""
        onChange={handleAccountChange}
      >
        {accounts?.map((acct) => (
          <option key={acct.id} value={acct.id}>
            {acct.name}
          </option>
        ))}
      </select> */}

      <AddAccount />
      {/* <AddLand selectedAccount={selectedAccount} /> */}
      <ImportJSON />
    </div>
  );
};

export default AccountSwitcher;
