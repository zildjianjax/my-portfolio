import type { NextApiRequest, NextApiResponse } from "next";
import { firestore, serverTimestamp } from "../../lib/firebase";
import { Plant } from "../../lib/interface";
import fs from "fs";

type Data = {
  plants: Object;
  lands: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let plants: Object | string = {};
  let lands: Object | string = {};
  try {
    plants = fs.readFileSync("data/plants.txt");
    lands = fs.readFileSync("data/lands.txt");
  } catch (error) {
    plants = JSON.stringify({});
    lands = JSON.stringify({});
  }
  res
    .status(200)
    .json({
      plants: JSON.parse(plants as string),
      lands: JSON.parse(lands as string),
    });
}
