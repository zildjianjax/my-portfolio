import { auth, firestore, googleAuthProvider } from "../../lib/firebase";
import React from 'react'

const Google = () => {
  const signInWithGoogle = async () => {
    const user = await auth.signInWithPopup(googleAuthProvider);
    console.log(user);
    
  };
  return (
    <button className="btn btn-success-outline" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )
}

export default Google