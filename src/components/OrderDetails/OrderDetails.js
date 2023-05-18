import React from 'react';
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';



export default function OrderDetails (props) {
    
    return (
        <div className={styles.orederContainer}>      
            <p className="text text_type_digits-large mb-8">{props.order.orderNumber.order.number}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    close: PropTypes.func.isRequired,
};