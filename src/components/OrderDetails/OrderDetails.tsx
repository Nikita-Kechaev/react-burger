import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {  useSelector } from '../../utils/hooks';
import { FC } from 'react';


export const OrderDetails: FC = () => {

    const orderNumber = useSelector((store) => store.order.orderNumber)

    if (orderNumber) {
        return (
            <div className={styles.orederContainer}>
                <p className="text text_type_digits-large mb-8">
                    {orderNumber}
                </p>
                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        )
    } else {
        return (
            <div className={styles.orederContainer}>
                <p className="text text_type_main-medium mt-15">Ваш заказ принят в обработку</p>
                <p className="text ext_type_main-medium mt-15 mb-15">Дождитесь получения "идентификатора заказа!"</p>
            </div>
        )
    }
}