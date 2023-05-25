import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { CLOSE_CURRENT_ITEM } from '../../services/actions/ingredients'
import { CLOSE_ORDER_MODAL } from '../../services/actions/order'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.css'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';


export default function Modal (props) {

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch({
            type: CLOSE_CURRENT_ITEM
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
    }

    return ReactDOM.createPortal(
        <div className={styles.modalContainer}>
            <ModalOverlay />
            <div className={styles.modalWindow}>
                <div className={styles.mainContainer}>
                    {props.children}
                    <div className={`${styles.closeButton}`} onClick={() => onClose()}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById("react-modals"))
}

Modal.propTypes = {
    children: PropTypes.element.isRequired
}