import { FC } from 'react';
import styles from './OrderCard.module.css';
import { useSelector } from '../../utils/hooks';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {  CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient, TOrders} from '../../utils/types';


export const OrderCard: FC<any> = (props) => {

    const location = useLocation()
    const ingridients = useSelector((store) => store.ingredients.items);
    const dateFromServer = props.order.createdAt
    const orderNumber = props.order.number
    const orderIngredients = props.order.ingredients
    const resultArr:any = [];
    orderIngredients.map((item:string) => {
        ingridients && ingridients.forEach((element:TOrders) => {
            if (element._id === item) {
                resultArr.push(element)
            }
        });
    })

    const orderId = props.order._id
    const totalPrice:number = resultArr ? resultArr.reduce((acc:any, item:any) => acc + (item.type === 'bun'? item.price * 2 : item.price) , 0) : 0
    const zIndex = (index: number | null): string => {
        return index === 0 ? '10' : index === 1 ? '9' : index === 2 ? '8' : index === 3 ? '7' : index === 4 ? '6' : index === 5 ? '5' : '1';
    }

    const mobileimages = (
        resultArr.map((item:any, index:number) => {
            if (index < 5 || (orderIngredients.length === 6 && index === 5)) {
                return(
                <div className={styles.ing_image_container} key={index} style={{ zIndex: zIndex(index) }}>
                    <div className={styles.imgage_circle}>
                        <img src={item.image_mobile} alt={item.name}/>
                    </div>
                </div>)
            } else if (orderIngredients.length > 6 && index === 5) {
                return (
                    <div className={styles.ing_image_container} key={index} style={{ zIndex: zIndex(index) }}>
                        <div className={styles.imgage_circle}>
                            <img src={item.image_mobile} alt={item.name}/>
                        </div>
                        <div className={styles.last_image}></div>
                        <p className={`${styles.last_image_text} text text_type_main-default`}>{`+${orderIngredients.length - 6}`}</p>
                    </div>
                )
            }
        })
    )

    const oredrStatus = (
        props.order.status === 'done' ? <div className={`${styles.orderStatus} text text_type_main-default`} >Выполнен</div> :
        props.order.status === 'created' ? <div className={`${styles.orderStatus} text text_type_main-default`} style={{ color: 'aqua' }}>Готовится</div>:
        <div className={`${styles.orderStatus} text text_type_main-default`} style={{ color: 'red' }}>Отменён</div>
    )

    return (
        ingridients &&
        <Link
            to={location.pathname === '/profile/orders' ? `${orderId}` : `/feed/${orderId}`}
            className={styles.link}
            state = {{ background: location}}
        >
            <div className={styles.order_card_main_container}>
                <div className={styles.order_top}>
                    <div className={`${styles.order_number} text text_type_digits-default`}>#{orderNumber}</div>
                    <div className={`${styles.order_date} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(dateFromServer)} /></div>
                </div>
                <div className={styles.order_mid}>
                    <p className="text text_type_main-medium">
                        {props.order.name}
                    </p>
                </div>
                {location.pathname === '/profile/orders' ? oredrStatus: null}
                <div className={styles.order_buttom}>
                    <div className={styles.image_container_wrap}>
                        {mobileimages}
                    </div>
                    <div className={styles.price_container}>
                        <div className='text text_type_digits-default'>{totalPrice}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}