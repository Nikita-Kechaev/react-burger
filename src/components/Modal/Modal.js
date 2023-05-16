import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'


export default function Modal (props) {
    const handleClose = (e) => {
        e.stopPropagation();
    }

    return ReactDOM.createPortal(
        <div className={styles.modalContainer} onClick={props.close}>
            <ModalOverlay {...props}/>
            <div className={styles.modalWindow} onClick={handleClose}>
                {props.children}
            </div>
        </div>
    , document.getElementById("react-modals"))
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}