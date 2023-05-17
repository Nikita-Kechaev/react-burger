import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {  CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
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
                <div className={styles.mainContainer}>
                    {props.children}
                    <div className={`${styles.closeButton}`}>
                        <CloseIcon onClick={props.close} type="primary" />
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById("react-modals"))
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}