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
import { CommonCollection, Land } from "../lib/interface";
import _ from "lodash";

const ImportJSON: React.FC<{ lands: CommonCollection<Land> }> = ({ lands }) => {
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

  const [landAddress, setLandAddress] = useState("");
  const [landAddressValidationMessage, setlandAddressValidationMessage] = useState("");
  const [landAddressStatus, setLandAddressStatus] = useState<boolean | number>(false);

  const [isActive, setIsActive] = useState(false);
  const handleClose = () => {
    setIsActive(false);
  };
  const handleOpen = () => {
    setIsActive(true);
    setValue("page", 1);
  };

  const checkLandAddress = () => {
    if (!!lands[landAddress]) {
      setlandAddressValidationMessage("Land already exists.")
      setLandAddressStatus(1)
    } else {
      setlandAddressValidationMessage("Land does not exists.")
      setLandAddressStatus(0)
    }

    setTimeout(() => {
      setLandAddress("")
      setLandAddressStatus(false)
    }, 3000);
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

              <div>
                <label className="font-medium text-sm mr-4">
                  Check Land Address:
                </label>
                <input
                  className="border p-2 rounded mt-4 mr-4"
                  type="text"
                  value={landAddress}
                  onChange={(e) => setLandAddress(e.target.value)}
                />
                <a className="text-blue-500 border-blue-500 border p-2 rounded cursor-pointer" onClick={checkLandAddress}>Validate</a>
                {landAddressStatus !== false && <span className={`ml-3 ${landAddressStatus == 1 ? 'text-green-500' : 'text-red-500'}`}>{landAddressValidationMessage}</span>}
              </div>
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
