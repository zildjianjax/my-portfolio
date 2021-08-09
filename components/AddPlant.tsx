import React, { useState, useContext } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "./Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { firestore, serverTimestamp } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { randomBytes } from "crypto";
import Alert from "sweetalert2";

const AddPlant = ({ landId }: { landId: string }) => {
  const { user } = useContext(UserContext);

  const [isActive, setIsActive] = useState(false);
  const handleClose = () => {
    setIsActive(false);
  };
  const handleOpen = () => {
    setIsActive(true);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<{
    readable_id: string;
    page: string;
    reset_time: string;
  }> = async ({ readable_id, page, reset_time }) => {
    const userDoc = firestore
      .doc(`users/${user?.uid}/lands/${landId}`)
      .collection("plants")
      .doc();
    await userDoc.set({
      landId,
      page,
      userId: user?.uid,
      readableId: readable_id,
      resetTime: reset_time,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    Alert.fire("", "Successfully Added", "success").then(() => {
      reset();
      handleClose();
    });
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleOpen}>
        Add Plant
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isActive={isActive}>
          <ModalOverlay onClick={handleClose} />
          <ModalContent style={{ maxWidth: "700px" }}>
            <ModalHeader onClose={handleClose}>
              <h2 className="font-medium text-xl">Add Plant to {landId}</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center space-x-4 mb-3">
                <label htmlFor="" className="font-medium text-sm w-24">
                  ID:
                </label>
                <input
                  type="text"
                  className="block p-2 border w-full rounded"
                  {...register("readable_id", { required: true })}
                />
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <label htmlFor="" className="font-medium text-sm w-24">
                  Page:
                </label>
                <input
                  type="text"
                  className="block p-2 border w-full rounded"
                  {...register("page", { required: true })}
                />
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <label htmlFor="" className="font-medium text-sm w-24">
                  Reset Time:
                </label>
                <input
                  type="text"
                  className="block p-2 border w-full rounded"
                  {...register("reset_time", { required: true })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
};

export default AddPlant;
