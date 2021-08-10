import type { NextApiRequest, NextApiResponse } from "next";
import { firestore, serverTimestamp, storage } from "../../lib/firebase";
import { Plant } from "../../lib/interface";
import fs from "fs";
import https from "https";

type Data = {
  plants: Object;
  lands: Object;
};

const getFileData = async (filePath: string) => {
  return new Promise(async (resolve, rejectc) => {
    const landsRef = storage.ref(filePath);
    let data = await landsRef.getDownloadURL();
    let body = "";
    https.get(data).on("response", (response) => {
      response.on("data", (chunk) => {
        body += chunk.toString();
      });

      response.on("end", function () {
        resolve(body);
      });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let lands = await getFileData(`data/lands.txt`);
  let plants = await getFileData(`data/plants.txt`);

  res.status(200).json({
    plants: JSON.parse(plants as string),
    lands: JSON.parse(lands as string),
  });
}
