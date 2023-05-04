import React from 'react';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default function OrderDetails () {
    return (
        <div className={styles.orederContainer}>
            <p className="text text_type_digits-large mb-8">034536</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
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

OrderDetails.propTypes = {
    ingridient: ingredientPropTypes,
};