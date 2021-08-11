import React, { useState, useContext } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "./Modal";
import Alert from "sweetalert2";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { UserContext } from "../lib/context";
import { postData } from "../lib/api";

const ImportJSON = () => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const page = watch("page");

  const [isActive, setIsActive] = useState(false);
  const handleClose = () => {
    setIsActive(false);
  };
  const handleOpen = () => {
    setIsActive(true);
    setValue("page",1);
  };

  const onSubmit: SubmitHandler<{ json: string }> = async (formData) => {
    console.log({ ...formData, user: user?.uid });
    let res = await postData("/api/import", { ...formData, user: user?.uid });
    Alert.fire("", "Successfully Imported", "success").then(() => {
      reset({ json: "" });
      setValue("page", parseInt(page) + 1);
      // handleClose();
    });
  };

  return (
    <div>
      <button className="btn btn-warning rounded-2xl" onClick={handleOpen}>
        Import JSON
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isActive={isActive}>
          <ModalOverlay onClick={handleClose} />
          <ModalContent style={{ maxWidth: "950px" }}>
            <ModalHeader onClose={handleClose}>
              <h2 className="font-medium text-xl">Import JSON</h2>
            </ModalHeader>
            <ModalBody>
              <label className="font-medium text-sm">Page:</label>
              <input
                className="border p-2 block rounded"
                type="text"
                {...register("page")}
              />
              <textarea
                className="border h-96 p-2 rounded w-full mt-4"
                {...register("json")}
              ></textarea>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-warning rounded-2xl">
                Import
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
};

export default ImportJSON;
