import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { useDrop } from "react-dnd";

import {  Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import OrderDetails from '../OrderDetails/OrderDetails';
import { MainElement } from "./MainElement"
import { BunElement } from "./BunElement"
import Modal from '../Modal/Modal';

import { createUuidToItem, MOVE_CARD } from '../../services/actions/constructor'
import { getOrder } from '../../services/actions/order';
import styles from './BurgerConstructor.module.css';



export default function BurgerConstructor () {
    const dispatch = useDispatch();


    const ingridients = useSelector(store => store.constructorArr.constructorItems)


    const total = ingridients.reduce((acc, item) => acc + item.price, 0)
    const bun = useSelector(store => store.constructorArr.bun)
    const bunPrice = bun ? bun.price * 2 : 0
    const modalIsVisible = useSelector(store => store.order.isVisible)

    const [, dropTarget] = useDrop({
        accept: "ingridients",
        drop(item) {
            dispatch(createUuidToItem(item))
        },
    });
    const getOrdeNumber = (ing, bun) => {
        const ingBun = ing.concat(bun)
        const ids = ingBun.map(item => item._id)
        dispatch(getOrder(ids))
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_CARD,
            dragIndex,
            hoverIndex
        })
    })

    const renderCard = useCallback((card, index) => {
        return (
          card &&  
          <MainElement
            key={card.uuid}
            index={index}
            id={card._id}
            item={card}
            moveCard={moveCard}
          />
        )
    }, [])

    return (
        <div className={`${styles.column} mt-25`}>
            <div ref={dropTarget} className={styles.dropContainer}>

                <div className={`${styles.topBotIngridients} pt-4  pr-8 pl-8`}>
                    { bun ?
                    <BunElement type="top" text="верх" /> :
                    <p className={`${styles.warning} text text_type_main-large`}>добавьте булку</p>
                    }
                </div>

                <div className={`${styles.ingridients} ${styles.scroll}`}>
                    {ingridients && ingridients.map((card, i) => renderCard(card, i))}
                </div>
                <div className={`${styles.topBotIngridients} pt-4  pr-8 pl-8`}>
                    <BunElement type="bottom" text="низ" />
                </div>
            </div>
            <div className={`${styles.finalCost} pr-4 pt-10 pb-10`}>
                <p className="text text_type_digits-medium mr-2">
                    {total + bunPrice}
                </p>
                <CurrencyIcon type="primary"/>
                { bun &&
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={() => getOrdeNumber(ingridients, bun)}>
                    Оформить заказ
                </Button>
                }
            </div>
            {modalIsVisible && <Modal><OrderDetails /></Modal>}
        </div>
    )
}