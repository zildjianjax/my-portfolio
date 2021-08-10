import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { admin } from "../lib/whitelist";

const AdminCheck: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  return <div>{admin.includes(user?.email) ? children : null}</div>;
};

// Component's children only shown to admin users
export default AdminCheck;
