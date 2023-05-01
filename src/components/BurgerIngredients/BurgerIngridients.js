import React from 'react';
import styles from './BurgerIngridients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingridients  from '../../utils/data'


export default class BurgerIngridients extends React.Component {
    state = {
        data: ingridients,
    }

    render() {

        const ingTypes = [
            {type: 'bun', title: 'Булки'},
            {type: 'sauce', title: 'Соусы'},
            {type: 'main', title: 'Начинки'}
        ]

        return (
            <div className={`${styles.column} mt-10`}>
                <p className="text text_type_main-large">Соберите бургер</p>
                <div className={`${styles.tab} mt-5`}>
                    <Tab value="bun">
                        Булки
                    </Tab>
                    <Tab value="sauce">
                        Соусы
                    </Tab>
                    <Tab value="main">
                        Начинки
                    </Tab>
                </div>
                <div className={`${styles.ingridientsContainer} ${styles.scroll} mt-10`}>
                    { ingTypes.map((type) => (
                        <>
                            <p className="text text_type_main-medium">{type.title}</p>
                            <div className={`${styles.cardsContainer} pl-4 pr-4 pt-6 pb-10`}>
                                {this.state.data.map((ingridient) => (
                                    (ingridient.type === `${type.type}` &&
                                    <div className={styles.card}>
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
                        </>
                    ))}
                </div>
            </div>
        )
    }
}