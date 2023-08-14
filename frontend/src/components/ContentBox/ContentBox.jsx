import React, { useState } from "react";
import "./ContentBox.scss";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../Modal/Modal";
import ModalContact from "../Modal/ModalViews/ModalContact";

const ContentBox = ({ heading, children, addButton, buttonLabel, boxId, renderItem }) => {
    const [show, setShow] = useState(false);

    const showHandler = (e) => {
        setShow((prev) => !prev);
    };

    const View = () => renderItem(showHandler);

    return (
        <div className="contentBox">
            <div className="heading">
                <p className="title">{heading}</p>
                {addButton && (
                    <button className="add" onClick={showHandler} id={boxId}>
                        {buttonLabel && <p className="buttonLabel">{buttonLabel}</p>}
                        <AddIcon className="icon" fontSize="small" htmlColor="#2e99e1ae" />
                    </button>
                )}
            </div>
            <div className="content">{children}</div>
            <Modal showModal={showHandler} isOpen={show}>
                <View />
            </Modal>
        </div>
    );
};

export default ContentBox;
