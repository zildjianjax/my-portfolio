import React from "react";
import AddPlant from "./AddPlant";
import { Common, CommonCollection, Land, Plant } from "../lib/interface";
import moment from "moment";
import _ from "lodash";

const Lands: React.FC<{
  lands: CommonCollection<Land>;
  plants: CommonCollection<Plant>;
}> = ({ lands, plants }) => {
  return (
    <table className="mt-5">
      <thead>
        <tr>
          <th rowSpan={2} className="text-center">
            Land
          </th>
          <th colSpan={5} className="text-center">
            Plant
          </th>
          <th rowSpan={2} className="text-center">
            Actions
          </th>
        </tr>
        <tr>
          <th>Reset In</th>
          <th>Page</th>
          <th>Card Index</th>
          <th>Element</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {lands &&
          Object.values(lands).map((land) => {
            let landPlants: Plant[] | Common[] =
              Object.values(plants || {}).filter(
                (plant) => plant.landId == land.id
              ) || [];

            landPlants = _.reverse(_.sortBy(landPlants, ["timeRemaining"]));
            let plantCount = landPlants.length;
            let firstRow = landPlants.splice(0, 1)[0];

            return (
              <>
                <tr
                  className={`${firstRow?.hasRecentlyPassed && "has-passed"}`}
                >
                  <th rowSpan={plantCount}>
                    <a
                      href={`https://marketplace.plantvsundead.com/farm/other/${land.address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      {land.address}
                    </a>
                    <AddPlant landId={land.id} />
                  </th>
                  <td>{firstRow?.differenceToNextTime}</td>
                  <td>{firstRow?.page}</td>
                  <td>{firstRow?.card}</td>
                  <td>{firstRow?.element}</td>
                  <td>{firstRow?.readableId}</td>
                  <td>Skip, Done</td>
                </tr>
                {plants &&
                  landPlants.map((plant) => (
                    <tr
                      key={plant?.readableId}
                      className={`${plant.hasRecentlyPassed && "bg-green-100"}`}
                    >
                      <td>{plant?.differenceToNextTime}</td>
                      <td>{plant?.page}</td>
                      <td>{plant?.card}</td>
                      <td>{plant?.element}</td>
                      <td>{plant?.readableId}</td>
                      <td>Skip, Done</td>
                    </tr>
                  ))}
              </>
            );
          })}
      </tbody>
    </table>
  );
};

export default Lands;
