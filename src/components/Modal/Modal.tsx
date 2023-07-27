import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
import  { FC} from 'react';
import { TModalProps } from "../../utils/types"

export const Modal: FC<TModalProps> = (props) => {

    return ReactDOM.createPortal(
        <div data-cy="modelContainer" className={styles.modalContainer}>
            <ModalOverlay onClose={props.onClose} />
            <div className={styles.modalWindow}>
                <div className={styles.mainContainer}>
                    {props.children}
                    <div data-cy="closeButton" className={`${styles.closeButton}`} onClick={props.onClose}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById("react-modals") as HTMLElement)
}