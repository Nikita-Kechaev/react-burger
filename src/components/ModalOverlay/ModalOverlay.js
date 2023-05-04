import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';
import Modal from '../Modal/Modal';


export default function ModalOverlay (props) {
    const handleClose = (e) => {
        e.stopPropagation();
    }

    React.useEffect(()=>{
        document.addEventListener("keydown", (e) => {
            if (e.code == "Escape") {
                props.close();
            }
          });
        return () => {
            document.addEventListener("keydown", (e) => {
            if (e.code == "Escape") {
                props.close();
            }
            });
        }
      }, [])

    return ReactDOM.createPortal(         
            <div className={styles.overlay} onClick={props.close}>
                <div onClick={handleClose}>
                    <Modal {...props}/>
                </div>
            </div> 
            , 
            document.getElementById("react-modals")
        );
}

const ingredientPropTypes = PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any.isRequired,
    image_mobile:PropTypes.any.isRequired,
    image_large:PropTypes.any.isRequired,
    __v: PropTypes.any.isRequired,
});

ModalOverlay.propTypes = {
    ingridient: ingredientPropTypes,
    close: PropTypes.func,
};