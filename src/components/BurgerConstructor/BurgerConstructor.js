import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { IngredientContext } from '../../utils/ingredientsContext';
import { useContext } from 'react';
import { useGetOrder } from '../../utils/burger-api'
import { OrderContext } from '../../utils/orderContext';


export default function BurgerConstructor () {

    const ingridients = useContext(IngredientContext);
    const [modal, setModal] = React.useState({
        isVisible: false,
    })
    const openModal = () => {
        setModal({
            isVisible: true,
        });    
    }
    const closeModal = () => {
        setModal({
            isVisible: false,
        });
    }
    const bun = ingridients[0]
    const mainIngridients = ingridients.filter( item => item.type != 'bun' )
    const total = mainIngridients.reduce((acc, p) => acc + p.price, 0) + bun.price * 2;
    const mainIngridientsIds = mainIngridients.map(item => item._id)
    const order = useGetOrder(mainIngridientsIds)


    return (
        <div className={`${styles.column} mt-25`}>
            <div className={`${styles.topBotIngridients} pt-4 pb-4 pr-8 pl-8`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={`${bun.price}`}
                    thumbnail={`${bun.image_mobile}`}
                />
            </div>
            <div className={`${styles.ingridients} ${styles.scroll}`}>
                {mainIngridients.map((ingridient, index) => (
                    <div className={`${styles.middleIngridients} pt-4 pb-4 pr-8 pl-8`} key={index}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={ingridient.name}
                            price={ingridient.price}
                            thumbnail={ingridient.image_mobile}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles.topBotIngridients} pt-4 pb-4 pr-8 pl-8`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={`${bun.price}`}
                    thumbnail={`${bun.image_mobile}`}
                />
            </div>
            <div className={`${styles.finalCost} pr-4 pt-10 pb-10`}>
                <p className="text text_type_digits-medium mr-2">
                    {total}
                </p>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {modal.isVisible &&
                <OrderContext.Provider value={order}>
                    <Modal close={closeModal}>
                        <OrderDetails close={closeModal}/>
                    </Modal>
                </OrderContext.Provider>
            }
        </div>
    )
}