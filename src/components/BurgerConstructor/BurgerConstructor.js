import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ingredientPropTypes } from '../../utils/types'


export default function BurgerConstructor ({ ingridients }) {
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

    const total = ingridients.reduce((acc, p) => acc + p.price, 0);

    return (
        <div className={`${styles.column} mt-25`}>
            <div className={`${styles.topBotIngridients} pt-4 pb-4 pr-8 pl-8`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${ingridients[0].name} (верх)`}
                    price={`${ingridients[0].price}`}
                    thumbnail={`${ingridients[0].image_mobile}`}
                />
            </div>
            <div className={`${styles.ingridients} ${styles.scroll}`}>
                {ingridients.map((ingridient, index) => (
                    (ingridient.type != "bun" &&
                        <div className={`${styles.middleIngridients} pt-4 pb-4 pr-8 pl-8`} key={index}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image_mobile}
                            />
                        </div>
                    )
                ))}
            </div>
            <div className={`${styles.topBotIngridients} pt-4 pb-4 pr-8 pl-8`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${ingridients[0].name} (низ)`}
                    price={`${ingridients[0].price}`}
                    thumbnail={`${ingridients[0].image_mobile}`}
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
                <Modal close={closeModal}>
                    <OrderDetails close={closeModal}/>
                </Modal>
            }
        </div>
    )
}

BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};