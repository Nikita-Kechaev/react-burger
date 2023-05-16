import React from 'react';
import styles from './BurgerIngridients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { IngredientContext } from '../../utils/ingredientsContext';
import { useContext } from 'react';


export default function BurgerIngridients () {

    const ingridients = useContext(IngredientContext);
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
            {modal.isVisible && 
                <Modal ingridient={modal.ingridient} close={closeModal}>
                    <IngredientDetails ingridient={modal.ingridient} close={closeModal} />
                </Modal>
            }
        </div>
    )
}
