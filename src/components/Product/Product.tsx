import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_CURRENT_ITEM } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './Product.module.css';
import { useDrag } from "react-dnd";
import { RootState, Ingredient } from "../../utils/types"
import  { FC} from 'react';

interface IProductPropps  {
    ingridient: Ingredient
}

export const Product:FC<IProductPropps> = ({ ingridient }) => {
    const location = useLocation()
    const ingredientId = ingridient['_id']
    const bun = useSelector((store: RootState) => store.constructorArr.bun)
    const ingridients = useSelector((store: RootState) => store.constructorArr.constructorItems)
    const count = ingridients? ingridients.filter((item: Ingredient) => item._id === ingridient._id).length : 0
    
    const dispatch = useDispatch()

    const [{isDrag}, dragRef] = useDrag({
        type: "ingridients",
        item: ingridient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const openModal = (ingridient: Ingredient) => {
        dispatch({
            type: GET_CURRENT_ITEM,
            item: ingridient
        })    
    }

    const cardBack = isDrag ? styles.dragCard : styles.card;

    return (
        <Link
            ref={dragRef}
            key={ingredientId}
            to={`/ingredients/${ingredientId}`}
            state = {{ background: location}}
            className={styles.link}
        >
            <div 
                className={cardBack} 
                onClick={() => openModal(ingridient)}
            >
                <img className='pr-4 pl-4' src={ingridient.image} />
                <div className={`${styles.price} mt-1 mb-1`}>
                    <p className="text text_type_main-small">{ingridient.price}</p>
                    <CurrencyIcon type='primary'/>
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
        </Link>
    )
}