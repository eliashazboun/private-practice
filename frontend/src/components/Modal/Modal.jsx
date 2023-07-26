import React, { useState, useContext } from "react";
import "./Modal.scss";
import ModalContact from "./ModalViews/ModalContact";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ handleOpen, modalId, clientHandler, handleClose }) => {
  return (
    <>
      {handleOpen && (
        <div className="modal">
          <div className="modalMain">
            <CloseIcon className="close" onClick={handleClose} />

            <div className="wrap">
              {modalId && modalId === "contact" && (
                <ModalContact clientHandler={clientHandler} handleClose={handleClose}/>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
