import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom';
import ReactFocusTrap from 'focus-trap-react';
const ModalContent = ({
                        onClose,
                        onSubmit,
                        onClickAway = () => {console.log("click away")},
                        role = 'dialog'
                      }) => {


  function onSubmitInner() {
    onSubmit()
    onClose()
  }

  return ReactDOM.createPortal(
    <ReactFocusTrap
      role={role}
      aria-modal="true"
      onClick={onClickAway}
    >
      <div className="cb-modal">
        <div className="cb-modal-content cb-p-40">
          <div>
            <p>You are about to sign out.</p>
            <p>This will cancel all progress</p>
          </div>
          <div className="cb-button-inner cb-ta-r cb-pt-16">
            <button onClick={onClose} className="cb-fs-16 cb-btn-primary cb-btn-orange">Cancel</button>
            <button tabIndex={1} onClick={onSubmitInner} className="cb-ml-24 cb-fs-16 cb-btn-primary cb-btn-blue">Sign out</button>
          </div>
          {/*<svg viewBox="0 0 40 40" className="c-modal__close-icon">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
            </svg>*/}
        </div>
      </div>
    </ReactFocusTrap>,
    document.body
  );
}

export default ModalContent
