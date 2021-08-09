import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { arrayToObject, auth, firestore } from "../lib/firebase";
import firebase from "firebase/app";
import { Account, CommonCollection, Land, Plant, UserData } from "./interface";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";

export function useUserData(): UserData {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc: firebase.firestore.DocumentData) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

export function getUserAccounts(
  user: firebase.User | null | undefined
): [CommonCollection<Account>, boolean, string] {
  const querySnapshot = firestore
    .doc(`users/${user?.uid}`)
    .collection("accounts")
    .orderBy("createdAt", "asc");

  const [collection, loading] = useCollectionData(querySnapshot, {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: "id",
  });

  let [firstAccount] = (collection as Data<Account>[]) || [];
  let firstAccountId = firstAccount?.id;

  let accounts: CommonCollection<Account> = (collection as Data<
    Account
  >[])?.reduce(arrayToObject, {});

  return [accounts, loading, firstAccountId];
}

export function getUserLands(
  user: firebase.User | null | undefined
): [CommonCollection<Land>, CommonCollection<Plant>] {
  const querySnapshot = firestore
    .doc(`users/LTd19OPAM9P1hk9BIrqwjLUezyH3`)
    .collection("lands")
    .orderBy("createdAt", "asc");
  // const querySnapshot = firestore
  //   .doc(`users/${user?.uid}`)
  //   .collection("lands")
  //   .orderBy("createdAt", "asc");

  const [collection, loading, error] = useCollectionData(querySnapshot, {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: "id",
  });

  let lands: CommonCollection<Land> = (collection as Data<Land>[])?.reduce(
    arrayToObject,
    {}
  );

  const [plants] = getLandPlants(user) || {};

  return [lands, plants];
}

export function getLandPlants(
  user: firebase.User | null | undefined
): [CommonCollection<Plant>, boolean, firebase.FirebaseError | undefined] {
  const querySnapshot = firestore
    .collectionGroup("plants")
    .where("userId", "==", "LTd19OPAM9P1hk9BIrqwjLUezyH3");
  // const querySnapshot = firestore
  //   .collectionGroup("plants")
  //   .where("userId", "==", user?.uid || null);

  const [collection, loading, error] = useCollectionData(querySnapshot, {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: "id",
  });

  let plants: CommonCollection<Plant> = (collection as Data<Plant>[])?.reduce(
    arrayToObject,
    {}
  );

  return [plants, loading, error];
}
