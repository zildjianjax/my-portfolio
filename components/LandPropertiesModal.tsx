import _ from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Land, Plant } from "../lib/interface";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "./Modal";

type LandPropertiesModalTypes = {
  isActive: boolean;
  handleClose: () => void;
  land: Land;
  plantData: { plants: Plant[]; totalPages: number; totalPlants: number };
};

const LandPropertiesModal: React.FC<LandPropertiesModalTypes> = ({
  isActive,
  land,
  handleClose: handleModalClose,
  plantData: { plants, totalPages, totalPlants },
}) => {
  const [search, setSearch] = useState("");
  let searchInput: { current: HTMLInputElement | null } = useRef(null);
  let filteredPlants = useMemo(() => {
    let output = _.sortBy(plants, ["page", "card"]);
    if (search != "") {
      let pattern = new RegExp(`${search}`, "gm");
      output = output.filter((plant) => pattern.test(plant.readableId));
    }
    return output;
  }, [search, isActive]);
  const handleClose = () => {
    setSearch("");
    handleModalClose();
  };

  const handleSearch = useCallback(
    _.debounce((e) => {
      setSearch((searchInput.current as HTMLInputElement)?.value);
    }, 1000),
    []
  );

  return (
    <Modal isActive={isActive}>
      <ModalOverlay onClick={handleClose} />
      <ModalContent style={{ maxWidth: "1200px" }}>
        <ModalHeader onClose={handleClose}>
          <h2 className="font-medium text-xl">Land Data of {land?.address}</h2>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>Owner ID: {land?.address}</p>
            <p>
              Coordinates: {land?.x}, {land?.y}
            </p>
            <p>Total Pages: {totalPages}</p>
            <p>Total Plants: {totalPlants}</p>

            <div className="flex items-center mt-5 mb-2 space-x-3">
              <label htmlFor="plant-search">Search by ID:</label>
              <input
                type="text"
                id="plant-search"
                className="p-1 border rounded"
                defaultValue={search}
                onChange={handleSearch}
                ref={searchInput}
              />
            </div>
            <table className="cus1">
              <thead>
                <tr>
                  <th>Plant ID</th>
                  <th>Type</th>
                  <th>Page</th>
                  <th>Card</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlants.map((plnt) => (
                  <tr key={plnt.readableId}>
                    <td>{plnt.readableId}</td>
                    <td>{plnt.element}</td>
                    <td>{plnt.page}</td>
                    <td>{plnt.card}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LandPropertiesModal;
