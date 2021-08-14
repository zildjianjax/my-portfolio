import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { useEffect } from "react"
import { analytics } from "../lib/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    analytics();
  }, [])
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
export default MyApp;
