import React from "react";
import { auth } from "../../lib/firebase";

const SignOut = () => {
  return <button className="border-red-400 font-bold hover:border-0 hover:text-white px-4 py-2 rounded text-red-500 text-xs" onClick={() => auth.signOut()}>Sign Out</button>;
};

export default SignOut;
