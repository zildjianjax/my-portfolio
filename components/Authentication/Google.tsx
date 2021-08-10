import { auth, firestore, googleAuthProvider } from "../../lib/firebase";
import React from "react";
import Alert from "sweetalert2";
import { admin, guest } from "../../lib/whitelist"

const Google = () => {
  const signInWithGoogle = async () => {
    const user = await auth.signInWithPopup(googleAuthProvider);
    
    if(!user) {
      Alert.fire("Oops!", "Something went wrong.", "error");
      return false;
    }
    
    const whitelist: (string | undefined| null)[] = [...admin, ...guest];
    if (!whitelist.includes(user.user?.email as string)) {
      auth.signOut();
      Alert.fire("Oops!", "Unauthorized Access.", "error");
      return false;
    }

    Alert.fire("Welcome to PVU Tracker", `Welcome, ${user.user?.displayName}`, "success");
  };
  return (
    <button className="btn btn-success-outline" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default Google;
