import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import  IngredientDetails  from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default function Modal (props) {
    return (
        <>
        {props.ingridient ? (
            <div className={`${styles.modalContainer} pt-10 pb-15`}>
                <div className={`${styles.titleContainer} mr-10 ml-10`}>
                    <p className="text text_type_main-large">Детали ингредиента</p>
                    <CloseIcon onClick={props.close} type="primary" />
                </div>
                <IngredientDetails {...props}/>
            </div>
        ):(
            <div className={styles.orderContainer}>
                <OrderDetails />
                <div className={`${styles.orderClose}`}>
                    <CloseIcon onClick={props.close} type="primary" />
                </div>
            </div>
        )}
        </>
    )
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

Modal.propTypes = {
    ingridient: ingredientPropTypes,
    close: PropTypes.func,
};