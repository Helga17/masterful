import React from "react";
import { Link } from "react-router-dom";
import classes from './Cards.module.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={classes.showHideClassName}>
      <div className={classes.modal-container}>
        {children}
        <Link onClick={handleClose}>Close</Link>
        {/* <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a> */}
      </div>
    </div>
  );
};

export default Modal;