import React from 'react';
import styles from './ModalOverlay.module.css';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor';
import { CLOSE_CURRENT_ITEM } from '../../services/actions/ingredients'
import { CLOSE_ORDER_MODAL } from '../../services/actions/order'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import  { FC} from 'react';


export const  ModalOverlay: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(()=>{
        document.addEventListener("keydown", escapeButton);
        return () => {
            document.removeEventListener("keydown", escapeButton);
        }
      }, [])
    
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
    
    const escapeButton = (e: any) => {
        if (e.code == "Escape") {
            onClose()
        }
    }
    return (
        <div className={styles.overlay} onClick={() => onClose()}>
        </div> 
    )
}