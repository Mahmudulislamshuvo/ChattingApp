import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

const SettingsModal = ({
  onModal,
  offcloseModal,
  children,
  ofUserNameInput,
}) => {
  return (
    <div>
      <div>
        <Modal
          isOpen={onModal}
          onRequestClose={offcloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={offcloseModal}
            className="rounded-lg bg-red-700 px-[5px] py-[2px] text-white"
          >
            close
          </button>
          {children}
        </Modal>
      </div>
    </div>
  );
};

export default SettingsModal;
