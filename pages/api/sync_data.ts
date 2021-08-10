import type { NextApiRequest, NextApiResponse } from "next";
import { arrayToObject, firestore, serverTimestamp } from "../../lib/firebase";
import { CommonCollection, Land, Plant } from "../../lib/interface";
import fs from "fs";
import { getUserLands } from "../../lib/hooks";
import { user_id } from "../../lib/whitelist";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import firebase from "firebase";

type ResponseData = {
  message: string;
};

const getLands = async () => {
  return new Promise(async (resolve, reject) => {
    let landsCollection = await firestore
      .doc(`users/${user_id}`)
      .collection("lands")
      .orderBy("createdAt", "asc")
      .get();
    let lands: CommonCollection<firebase.firestore.DocumentData> = {};
    landsCollection.forEach((doc) => {
      lands[doc.id] = doc.data();
    });

    resolve(lands);
  });
};
const getPlants = async () => {
  return new Promise(async (resolve, reject) => {
    let plantCollection = await firestore
      .collectionGroup("plants")
      .where("userId", "==", user_id)
      .get();
    let plants: CommonCollection<firebase.firestore.DocumentData> = {};
    plantCollection.forEach((doc) => {
      plants[doc.id] = doc.data();
    });

    resolve(plants);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let lands = await getLands();
  let plants = await getPlants();

  // let plants = plantCollection.reduce((carry: CommonCollection<Plant>, doc: firebase.firestore.DocumentData) => {
  //   let id = doc.data().id
  //   carry:
  // }, {});

  try {
    fs.writeFileSync("data/plants.txt", JSON.stringify(plants));
    fs.writeFileSync("data/lands.txt", JSON.stringify(lands));
  } catch (error) {
    console.error(error);
  }
  res.status(200).json({ message: "successfully synced data!" });
}
