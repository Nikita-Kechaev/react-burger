import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor';
import { CLOSE_CURRENT_ITEM } from '../../services/actions/ingredients'
import { CLOSE_ORDER_MODAL } from '../../services/actions/order'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import  { FC} from 'react';
import { TModalProps } from "../../utils/types"

export const Modal: FC<TModalProps> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const onClose = () => {
        dispatch({
            type: CLOSE_CURRENT_ITEM
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
        !location.state && dispatch({type: CLEAR_CONSTRUCTOR});
        location.state && navigate(-1)
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
    , document.getElementById("react-modals") as HTMLElement)
}