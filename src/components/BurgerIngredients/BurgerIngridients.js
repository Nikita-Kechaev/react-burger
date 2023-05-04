import React from 'react';
import styles from './BurgerIngridients.module.css';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'


export default function BurgerIngridients ({ ingridients }) {
    const [current, setCurrent] = React.useState('bun')
    const [modal, setModal] = React.useState({
        isVisible: false,
        ingridient: ''
    })

    const openModal = (ingridient) => {
        setModal({
            isVisible: true,
            ingridient: ingridient
        });    
    }
    
    const closeModal = () => {
        setModal({
            isVisible: false,
            ingridient: ''
        });
    }
    
    React.useEffect(() => {
    },[modal.isVisible])

    const ingTypes = [
        {type: 'bun', title: 'Булки'},
        {type: 'sauce', title: 'Соусы'},
        {type: 'main', title: 'Начинки'}
    ]

    return (
        <div className={`${styles.column} mt-10`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={`${styles.tab} mt-5`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingridientsContainer} ${styles.scroll} mt-10`}>
                { ingTypes.map((type, index) => (
                    <div key={index}>
                        <p className="text text_type_main-medium">{type.title}</p>
                        <div className={`${styles.cardsContainer} pl-4 pr-4 pt-6 pb-10`}>
                            {ingridients.map((ingridient, index) => (
                                (ingridient.type === `${type.type}` &&             
                                <div className={styles.card} key={index} onClick={() => openModal(ingridient)}>
                                    <img className='pr-4 pl-4' src={ingridient.image} />
                                    <div className={`${styles.price} mt-1 mb-1`}>
                                        <p className="text text_type_main-small">{ingridient.price}</p>
                                        <CurrencyIcon />
                                    </div>
                                    <p className="text text_type_main-small">{ingridient.name}</p>
                                </div>
                                ) 
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {modal.isVisible && <ModalOverlay ingridient={modal.ingridient} close={closeModal}/>}
        </div>
    )
}

const ingredientPropTypes = PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any.isRequired,
    image_mobile:PropTypes.any.isRequired,
    image_large:PropTypes.any.isRequired,
    __v: PropTypes.any.isRequired,
});


BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};