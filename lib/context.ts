import { createContext } from "react";
import firebase from "firebase"
import { UserData } from "./interface";

export const UserContext = createContext<UserData>({ user: null, username: null });
export const AccountContext = createContext({ selectedAccount: null });
