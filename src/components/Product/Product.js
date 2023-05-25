import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_CURRENT_ITEM } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientPropTypes } from '../../utils/types'
import styles from './Product.module.css';
import { useDrag } from "react-dnd";
import React from "react";




export const Product = ({ ingridient }) => {
    
    const bun = useSelector(store => store.constructorArr.bun)
    const ingridients = useSelector(store => store.constructorArr.constructorItems)
    const count = ingridients.filter(item => item._id === ingridient._id).length
    

    const dispatch = useDispatch()

    const [{isDrag}, dragRef] = useDrag({
        type: "ingridients",
        item: ingridient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const openModal = (ingridient) => {
        dispatch({
            type: GET_CURRENT_ITEM,
            item: ingridient
        })    
    }

    const cardBack = isDrag ? styles.dragCard : styles.card;

    return (
        <div 
            ref={dragRef}
            className={cardBack} 
            onClick={() => openModal(ingridient)}
        >
            <img className='pr-4 pl-4' src={ingridient.image} />
            <div className={`${styles.price} mt-1 mb-1`}>
                <p className="text text_type_main-small">{ingridient.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-small">{ingridient.name}</p>
            <div className={styles.counter}>
                {
                    bun && bun._id === ingridient._id ?
                    <Counter count={2} size="default" extraClass="m-1" />:
                    count !== 0 ?
                    <Counter count={count} size="default" extraClass="m-1" /> :
                    null
                }
            </div>
        </div>
    )
}

Product.propTypes = {
    ingridient: ingredientPropTypes.isRequired,

}