import React, { useState } from "react";
import "./ContentBox.scss";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../Modal/Modal";


const ContentBox = ({
  heading,
  children,
  addButton,
  buttonLabel,
  boxId,
  handleChange,
}) => {
  const [open, setOpen] = useState(false);
 
  const openModal = (e) => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="contentBox">
      <div className="heading">
        <p className="title">{heading}</p>
        {addButton && 
          <button className="add" onClick={openModal} id={boxId}>
            {buttonLabel && <p className="buttonLabel">{buttonLabel}</p>}
            <AddIcon className="icon" fontSize="small" htmlColor="#2e99e1ae" />
          </button>
        }
      </div>
      <div className="content">
        {children}
      </div>
      <Modal handleOpen={open} modalId={boxId} clientHandler={handleChange} handleClose={closeModal}/>
    </div>
  );
};

export default ContentBox;
