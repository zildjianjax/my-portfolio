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

const AddAccount = () => {
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
    name: string;
  }> = async (data) => {
    const account_id = randomBytes(20).toString("hex");

    const userDoc = firestore
      .doc(`users/${user?.uid}`)
      .collection("accounts")
      .doc(account_id);
    await userDoc.set({
      name: data.name,
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
      <button className="btn btn-success rounded-2xl" onClick={handleOpen}>
        Add Account
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isActive={isActive}>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader onClose={handleClose}>
              <h2 className="font-medium text-xl">Add Account</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center space-x-4">
                <label htmlFor="" className="font-medium text-sm">
                  Name:
                </label>
                <input
                  type="text"
                  className="block p-2 border w-full rounded"
                  {...register("name", { required: true })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-warning rounded-2xl">
                Save
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
};

export default AddAccount;
