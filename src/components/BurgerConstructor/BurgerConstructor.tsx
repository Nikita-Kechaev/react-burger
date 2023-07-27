import { useDispatch, useSelector } from '../../utils/hooks';
import { useEffect, useCallback, FC } from 'react';
import { useDrop } from "react-dnd";

import {  Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { OrderDetails } from '../OrderDetails/OrderDetails';
import { MainElement } from "./MainElement"
import { BunElement } from "./BunElement"
import { Modal } from '../Modal/Modal';

import { createUuidToItem } from '../../services/actions/constructor'
import { getOrder } from '../../services/actions/order';
import styles from './BurgerConstructor.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_ORDER_REQUEST } from '../../services/constant'
import { CLEAR_CONSTRUCTOR, MOVE_CARD } from '../../services/constant';
import { CLOSE_CURRENT_ITEM } from '../../services/constant'
import { CLOSE_ORDER_MODAL } from '../../services/constant'

import { Ingredient } from "../../utils/types"

export const BurgerConstructor: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

    const onClose = () => {
        dispatch({
            type: CLOSE_CURRENT_ITEM
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
        !location.state && dispatch({type: CLEAR_CONSTRUCTOR});
        location.state && navigate(-1)
    }

    const ingridients: Array<Ingredient> = useSelector((store) => store.constructorArr.constructorItems)
    const auth = useSelector((store) => store.user.auth)
    const total:number = ingridients ? ingridients.reduce((acc, item) => acc + item.price, 0) : 0
    const bun = useSelector((store) => store.constructorArr.bun)
    const bunPrice:number = bun ? bun.price * 2 : 0
    const modalIsVisible:boolean = useSelector((store) => store.order.isVisible)

    const [, dropTarget] = useDrop({
        accept: "ingridients",
        drop(item: Ingredient) {
            dispatch(createUuidToItem(item))
        },
    });

    const getOrdeNumber = async (ing:Ingredient[], bun:Ingredient) => {
        const ingBun = ing.concat(bun)
        const ids = ingBun.map((item:Ingredient) => item._id)
        if (auth) 
        {
            dispatch({
                type: GET_ORDER_REQUEST
            })
            dispatch(getOrder(ids))
        }
        else {
            navigate('/login')
        }
    }

    const moveCard = useCallback((dragIndex:string, hoverIndex:string) => {
        dispatch<any>({
            type: MOVE_CARD,
            dragIndex,
            hoverIndex
        })
    }, [])

    const renderCard = useCallback((card:Ingredient, index:number) => {
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
            <div data-cy="dropContainer" ref={dropTarget} className={styles.dropContainer}>

                <div data-cy="bunDropContainer" className={`${styles.topBotIngridients} pt-4  pr-8 pl-8`}>
                    { bun ?
                    <BunElement type="top" text="верх" /> :
                    <p className={`${styles.warning} text text_type_main-large`}>добавьте булку</p>
                    }
                </div>

                <div data-cy="mainDropContainer" className={`${styles.ingridients} ${styles.scroll}`}>
                    {ingridients && ingridients.map((card, i) => renderCard(card, i))}
                </div>
                <div data-cy="bunDropContainer" className={`${styles.topBotIngridients} pt-4  pr-8 pl-8`}>
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
            {modalIsVisible && <Modal onClose={() => onClose()}><OrderDetails /></Modal>}
        </div>
    )
}