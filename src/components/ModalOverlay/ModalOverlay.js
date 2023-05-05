import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';


export default function ModalOverlay (props) {
    const handleClose = (e) => {
        e.stopPropagation();
    }

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

    return ReactDOM.createPortal(         
            <div className={styles.overlay} onClick={props.close}>
                <div onClick={handleClose}>
                    {props.children}
                </div>
            </div> 
            , 
            document.getElementById("react-modals")
        );
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired,
};