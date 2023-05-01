import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingridients  from '../../utils/data'


export default class BurgerConstructo extends React.Component {
    state = {
        data: ingridients,
    }
    render() {
        const total = this.state.data.reduce((acc, p) => acc + p.price, 0);

        return (
            <div className={`${styles.column} mt-25`}>
                <div className={`${styles.ingridients} ${styles.scroll}`}>
                    {this.state.data.map((ingridient) => (
                        <div className='pt-4 pb-4 pr-8 pl-8' key={ingridient.id}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image_mobile}
                            />
                        </div>
                    ))}
                </div>        
                <div className={`${styles.finalCost} pr-4 pt-10 pb-10`}>
                    <p className="text text_type_digits-medium mr-2">
                        {total}
                    </p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        )
    }
}