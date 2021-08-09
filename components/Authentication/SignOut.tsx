import React from "react";
import { auth } from "../../lib/firebase";

const SignOut = () => {
  return <button className="border-2 border-red-400 font-bold hover:bg-red-500 hover:border-0 hover:text-white px-4 py-2 rounded text-red-500 text-xs" onClick={() => auth.signOut()}>Sign Out</button>;
};

export default SignOut;
