import "./Modal.scss";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ children, isOpen, showModal }) => {
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modalMain">
                        <CloseIcon onClick={showModal} className="close" />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
