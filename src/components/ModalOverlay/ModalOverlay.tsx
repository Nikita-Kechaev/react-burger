import React from 'react';
import styles from './ModalOverlay.module.css';
import { TModalProps } from "../../utils/types"
import  { FC} from 'react';


export const  ModalOverlay: FC<TModalProps> = (props) => {

    React.useEffect(()=>{
        document.addEventListener("keydown", escapeButton);
        return () => {
            document.removeEventListener("keydown", escapeButton);
        }
      }, [])
    
    const escapeButton = (e:KeyboardEvent) => {
        if (e.code == "Escape") {
            props.onClose()
        }
    }
    return (
        <div className={styles.overlay} onClick={props.onClose}>
        </div> 
    )
}