import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";

const AuthCheck: React.FC<{ fallback?: React.ElementType }> = ({
  children,
  fallback,
}) => {
  const { user } = useContext(UserContext);

  return <div>{user ? children : fallback || null}</div>;
};

// Component's children only shown to logged-in users
export default AuthCheck;
