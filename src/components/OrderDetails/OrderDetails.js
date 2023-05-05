import React from 'react';
import styles from './OrderDetails.module.css';
import { CheckMarkIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';


export default function OrderDetails (props) {
    return (
        <div className={styles.orderMainContainer}>
            <div className={styles.orederContainer}>
                <p className="text text_type_digits-large mb-8">034536</p>
                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
            <div className={`${styles.orderClose}`}>
                <CloseIcon onClick={props.close} type="primary" />
            </div>
        </div>
    )
}

OrderDetails.propTypes = {
    close: PropTypes.func.isRequired,
};