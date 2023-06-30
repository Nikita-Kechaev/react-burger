import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, FC } from 'react';
import { useDrop } from "react-dnd";

import {  Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { OrderDetails } from '../OrderDetails/OrderDetails';
import { MainElement } from "./MainElement"
import { BunElement } from "./BunElement"
import { Modal } from '../Modal/Modal';

import { createUuidToItem, MOVE_CARD } from '../../services/actions/constructor'
import { getOrder } from '../../services/actions/order';
import styles from './BurgerConstructor.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_ORDER_REQUEST } from '../../services/actions/order'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor';
import { CLOSE_CURRENT_ITEM } from '../../services/actions/ingredients'
import { CLOSE_ORDER_MODAL } from '../../services/actions/order'

import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'

import { RootState, Ingredient } from "../../utils/types"

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

    const ingridients = useSelector((store: RootState) => store.constructorArr.constructorItems)
    const user = useSelector((store: RootState) => store.user.user)
    const total:number = ingridients ? ingridients.reduce((acc:any, item:Ingredient) => acc + item.price, 0) : 0
    const bun = useSelector((store: RootState) => store.constructorArr.bun)
    const bunPrice:number = bun ? bun.price * 2 : 0
    const modalIsVisible:boolean = useSelector((store: RootState) => store.order.isVisible)

    const [, dropTarget] = useDrop({
        accept: "ingridients",
        drop(item: Ingredient) {
            dispatch<any>(createUuidToItem(item))
        },
    });

    const init = async () => {
        const isToken = getCookie('accessToken')
        if (isToken) {
            await dispatch<any>(getUser());
        }
    }
    
    useEffect(() => {
        init()
    }, [])

    const getOrdeNumber = async (ing:Ingredient[], bun:Ingredient) => {
        const ingBun = ing.concat(bun)
        const ids = ingBun.map((item:Ingredient) => item._id)
        if (user) 
        {
            dispatch({
                type: GET_ORDER_REQUEST
            })
            dispatch<any>(getOrder(ids))
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

    const renderCard = useCallback((card:Ingredient, index:string) => {
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
                    {ingridients && ingridients.map((card:any, i:string) => renderCard(card, i))}
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
            {modalIsVisible && <Modal onClose={() => onClose()}><OrderDetails /></Modal>}
        </div>
    )
}