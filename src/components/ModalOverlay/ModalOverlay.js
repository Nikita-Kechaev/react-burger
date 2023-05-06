import React from 'react';
import styles from './ModalOverlay.module.css'

export default function ModalOverlay (props) {
    React.useEffect(()=>{
        document.addEventListener("keydown", escapeButton);
        return () => {
            document.removeEventListener("keydown", escapeButton);
        }
      }, [])

    const escapeButton = (e) => {
        if (e.code == "Escape") {
            props.close();
        }
    }

    return (
        <div className={styles.overlay} onClick={props.close}>
        </div> 
    )
}