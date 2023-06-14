import React from 'react';

const Modal = ({errorMessage, handleClose}) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleBar">
                    <h1>Error</h1>
                </div>
                <p>{errorMessage}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
