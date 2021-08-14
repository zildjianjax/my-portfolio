import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics"
import { Common, CommonCollection } from "./interface";

const firebaseConfig: Object = {
  apiKey: "AIzaSyAR8PqVDilAQq78IeeZbtrkvtmHcOs_TC8",
  authDomain: "plantsvsundead-f559c.firebaseapp.com",
  projectId: "plantsvsundead-f559c",
  storageBucket: "plantsvsundead-f559c.appspot.com",
  messagingSenderId: "1068991784025",
  appId: "1:1068991784025:web:81fde231d5459ce3793d48",
  measurementId: "G-9K7SRJ5NF6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const analytics = firebase.analytics;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const getUserWithUsername = async (
  username: firebase.firestore.DocumentData
) => {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
};

export const postToJSON = (doc: firebase.firestore.DocumentData) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toMillis(),
    updatedAt: data.updatedAt?.toMillis(),
  };
};

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export function arrayToObject<T>(carry: CommonCollection<T>, item: Common) {
  carry[item.id] = item;
  return carry;
}
