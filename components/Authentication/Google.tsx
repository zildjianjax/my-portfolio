import { auth, firestore, googleAuthProvider } from "../../lib/firebase";
import React from "react";
import Alert from "sweetalert2";
import { admin, guest } from "../../lib/whitelist";

const Google = () => {
  const signInWithGoogle = async () => {
    const user = await auth.signInWithPopup(googleAuthProvider);

    if (!user) {
      Alert.fire("Oops!", "Something went wrong.", "error");
      return false;
    }

    const whitelist: (string | undefined | null)[] = [...admin, ...guest];
    if (!whitelist.includes(user.user?.email as string)) {
      auth.signOut();
      Alert.fire("Oops!", "Unauthorized Access.", "error");
      return false;
    }

    Alert.fire(
      "Welcome to PVU Tracker",
      `Welcome, ${user.user?.displayName}`,
      "success"
    );
  };
  // return (
  //   <button className="btn btn-success-outline" onClick={signInWithGoogle}>
  //     Sign in with Google
  //   </button>
  // );

  return (
    <div className="container mx-auto">
      <img
        className="m-auto mt-20"
        src="/img/welcome.svg"
        alt="Welcome to Error 404 App"
      />

      <div className="getstarted text-center">
        <h2 className="text-5xl">
          Sign in with Google <button className="text-pink-700" onClick={signInWithGoogle}>here</button>
        </h2>
      </div>
    </div>
  );
};

export default Google;
