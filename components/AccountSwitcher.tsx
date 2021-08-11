import React, {
  ChangeEventHandler,
  Dispatch,
  EventHandler,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { Account, Common, CommonCollection, Land } from "../lib/interface";
import AddAccount from "./AddAccount";
import AddLand from "./AddLand";
import ImportJSON from "./ImportJSON";
import Tools from "./Tools";

type AccountSwitcherProps = {
  accounts?: Account[] | Common[];
  setSelectedAccount?: Dispatch<SetStateAction<string>>;
  selectedAccount?: string;
  lands?: CommonCollection<Land>;
};

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  accounts,
  setSelectedAccount,
  selectedAccount,
  lands,
}) => {
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setSelectedAccount) {
      setSelectedAccount(e.target.value);
    }
  };
  return (
    <div className="border mt-10 p-4 rounded-md flex space-x-5">
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
      <ImportJSON lands={lands as CommonCollection<Land>} />
    </div>
  );
};

export default AccountSwitcher;
