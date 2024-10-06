/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import "./marker-info-modal.scss";

const MarkerInfoModal = ({ children, open, position, isMobile, onClose }) => {
  return (
    open && (
      <div>
        <div className="modal-overlay" onClick={onClose}></div>
        <div
          className={`modal-container 
                      ${isMobile ? "modal-mobile" : ""} 
                      ${position === "right" ? "modal-right" : ""} 
                      ${position === "left" ? "modal-left" : ""} 
                      ${position === "top" ? "modal-top" : ""} 
                      ${position === "bottom" ? "modal-bottom" : ""} 
                      ${position === "center" ? "modal-center" : ""}`}
        >
          <div className="modal-header">
            <button onClick={onClose} className="close-button">
              <IoClose size="24" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    )
  );
};

export default MarkerInfoModal;
