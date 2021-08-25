import type { NextApiRequest, NextApiResponse } from "next";
import { firestore, serverTimestamp } from "../../lib/firebase";
import { Plant } from "../../lib/interface";

type Data = {
  json: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { user, json, page } = req.body;
  let pvuResponse = JSON.parse(json);
  const batch = firestore.batch();
  pvuResponse.data.forEach(async (plant: Plant, index: number) => {    
    const landRef = firestore.doc(`users/${user}/lands/${plant.ownerId}`);
    batch.set(landRef, {
      address: plant.ownerId,
      userId: user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      x: plant.land.x,
      y: plant.land.y,
    });

    const plantRef = firestore.doc(`users/${user}/lands/${plant.ownerId}/plants/${plant.plantId}`);
    let waterReset = plant.activeTools.filter((tool: { type: string }) => tool.type == "WATER")[0];
    batch.set(plantRef, {
      landId: plant.ownerId,
      userId: user,
      page,
      card: index + 1,
      element: plant.plantElement,
      readableId: plant.plantId,
      resetTime: waterReset.endTime,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();

  res.status(200).json({ json: req.body.json });
}
