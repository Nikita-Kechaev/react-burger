import { FC } from 'react';
import { OrderCard } from '../components/OrderCard/OrderCard';
import styles from './feed.module.css'
import { useSelector} from '../utils/hooks';

export const OrderList: FC<any> = ({ element }) => {

    const orders = useSelector((store: any) => store.ws.orders);
    const total = useSelector((state) => state.ws.total);
    const totalToday = useSelector((state) => state.ws.totalToday);
    const ordersContent =  (
        orders.map((order:any, index:any) => {
            return (
                <OrderCard order={order} key={index} />
            )
        })
    )

    const doneNumberArr:any = []
    const inWorkNUmberArr:any = []

    orders.map((item:any) => {
        if (item.status === 'done') {
            doneNumberArr.push(item)
        } else {
            inWorkNUmberArr.push(item)
        }
    })

    const doneNumbers = (
        doneNumberArr.map((item:any, index:any) => {
            return (
                <div key={index} className={`${styles.order_done_number} text text_type_digits-default`}>#{item.number}</div>
            )
        })
    )

    const inWorkNumbers = (
        inWorkNUmberArr.map((item:any, index:any) => {
            return (
                <div key={index} className={`${styles.order_inwork_number} text text_type_digits-default`}>#{item.number}</div>
            )
        })
    )

    return (
        <div className={styles.main_container_wrapper}>
            <div>
                <p className="p-5 text text_type_main-large"> Лента заказов </p>
                <div className={`${styles.main_container} pl-5`}>
                    <div className={styles.orders_container}>
                        {ordersContent}
                    </div>
                    <div className={styles.orders_info_container}>
                        <div className={`${styles.done_container} pl-5`}>
                            <p className='text text_type_main-default'>Готовы:</p>
                            <div className={styles.done_column}>
                                {doneNumbers}
                            </div>
                        </div>
                        <div className={`${styles.done_container} pl-5`}>
                            <p className='text text_type_main-default'>В работе:</p>
                            <div className={styles.done_column}>
                                {inWorkNumbers}
                            </div>
                        </div>
                        <div className={`${styles.orders_count} pl-5`}>
                            <p className='text text_type_main-medium'>Выполнено за все время:</p>
                            <p className='text text_type_digits-large'>{total}</p>
                        </div>
                        <div className={`${styles.orders_count} pl-5`}>
                            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                            <div className='text text_type_digits-large'>{totalToday}</div>
                        </div>
                    </div>
                </div>
            </div>
            {element}
        </div>
    )
}