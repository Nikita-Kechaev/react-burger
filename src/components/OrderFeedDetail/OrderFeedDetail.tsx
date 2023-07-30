import { useParams, useLocation } from 'react-router-dom';
import styles from './OrderFeedDetail.module.css'
import { FC, useEffect } from 'react';
import { useSelector, useDispatch} from '../../utils/hooks';
import {  CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, TOrders } from '../../utils/types';
import { wsAuthConnectionStartAction, wsAuthConnectionClosedAction } from '../../services/actions/webSocketAuth';
import { wsConnectionStartAction, wsConnectionClosedAction } from '../../services/actions/webSocket';
import { getCookie } from '../../utils/cookie';

export const OrderFeedDetail: FC = () => {
    const {orderId}  = useParams()
    const  location  = useLocation()
    const dispatch = useDispatch()
    const accessToken = getCookie("accessToken");

    useEffect(() => {
        dispatch(wsAuthConnectionStartAction(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
        return () => {
            dispatch(wsAuthConnectionClosedAction())
        }
    }, [dispatch, accessToken])

    useEffect(() => {
        dispatch(wsConnectionStartAction('wss://norma.nomoreparties.space/orders/all'))
        return () => {
            dispatch(wsConnectionClosedAction())
          }
    }, [dispatch])


    const ingridients = useSelector((store) => store.ingredients.items);
    const orders = location.pathname === `/feed/${orderId}` ? useSelector((state) => state.ws.orders) : useSelector((state) => state.wsAuth.orders);
    
    const currentOrder = orders.filter((item) => item._id === orderId)[0]
    const resultArr:Array<Ingredient>  = [];
    currentOrder && currentOrder.ingredients.map((item) => {
        ingridients && ingridients.forEach((element) => {
            if (element._id === item) {
                element.count = 0
                resultArr.push(element)
            }
        });
    })

    const dateFromServer = currentOrder && currentOrder.createdAt

    const totalPrice:number = currentOrder && resultArr ? resultArr.reduce((acc, item) => acc + (item.type === 'bun'? item.price * 2 : item.price) , 0) : 0
    const resultArrCount: Array<Ingredient> = resultArr.length != 0 ? resultArr.reduce((acc:Array<Ingredient>, item) => {
        if (acc.includes(item)) {
        } else {
            acc.push(item)
        }
        if (item.type === 'bun') {
            item.count = 2
        } else {
            item.count += 1
        }
        return acc;
    }, []) : []

    
    const ingContent = (
        resultArrCount.map((item, index) => {
            return (
                <div key={index} className={styles.item}>
                    <div className={styles.imgAndName}>
                        <div className={styles.imageCircle}>
                            <div className={styles.imageWrap}>
                                <img src={item.image_mobile} alt={item.name} />
                            </div>
                        </div>
                        <div className='text text_type_main-default pl-2'>
                            {item.name}
                        </div>
                    </div>
                    <div className={`${styles.price} text text_type_digits-default`}>
                        <div className='pr-2'>{item.count} x {item.price}</div>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            )
        })
    )

    const oredrStatus = (
        currentOrder && currentOrder.status === 'done' ? <div className={`${styles.orderStatus} text text_type_main-default`} >Выполнен</div> :
        currentOrder && currentOrder.status === 'created' ? <div className={`${styles.orderStatus} text text_type_main-default`} style={{ color: 'aqua' }}>Готовится</div>:
        <div className={`${styles.orderStatus} text text_type_main-default`} style={{ color: 'red' }}>Отменён</div>
    )

    return(
        currentOrder &&
        <div className={styles.mainContainer }>
            <div className={styles.cardTop}>
                <div className={`${styles.orderNumber} text text_type_digits-default`}>
                    #{ currentOrder.number}
                </div>
                <div className={`${styles.orderName} text text_type_main-medium`}>
                    { currentOrder.name }
                </div>
                <div className={`${styles.orderStatus} text text_type_main-default`}>
                    {oredrStatus}
                </div>
            </div>
            <div className={styles.cardBody}>
                <div className='text text_type_main-medium'>
                    Состав:
                </div>
                <div className={styles.cardIngContainer}>
                    {ingContent}
                </div>
            </div>
            <div className={styles.cardButtom}>
                <div className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(dateFromServer)} />
                </div>
                <div className={styles.totalPrice}>
                   <div className='text text_type_digits-default'>{totalPrice}</div>
                   <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    )
}