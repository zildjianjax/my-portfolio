import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { useEffect } from "react"
import { analytics } from "../lib/firebase";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const routers = useRouter();
  const userData = useUserData();

  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      const logEvent = (url: string) => {
        analytics().setCurrentScreen(url);
        analytics().logEvent('screen_view');
      }

      routers.events.on('routeChangeComplete', logEvent);
      //For First Page
      analytics().setUserId(userData.user?.uid as string);
      analytics().setUserProperties({ displayName: userData.user?.displayName, email: userData.user?.email, uid: userData.user?.uid});
      logEvent(window.location.pathname);
      
      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off('routeChangeComplete', logEvent);
      };
    }
    
  }, [])
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
export default MyApp;
