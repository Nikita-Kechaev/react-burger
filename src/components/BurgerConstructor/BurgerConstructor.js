import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingridients  from '../../utils/data'


export default function BurgerConstructor () {
    const [state, setState] = React.useState({
        data: ingridients,
    })

    const total = state.data.reduce((acc, p) => acc + p.price, 0);

    return (
        <div className={`${styles.column} mt-25`}>
            <div className='pt-4 pb-4 pr-8 pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${state.data[0].name} (верх)`}
                    price={`${state.data[0].price}`}
                    thumbnail={`${state.data[0].image_mobile}`}
                />
            </div>
            <div className={`${styles.ingridients} ${styles.scroll}`}>
                {state.data.map((ingridient, index) => (
                    (ingridient.type != "bun" &&
                        <div className='pt-4 pb-4 pr-8 pl-8' key={index}>
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
            <div className='pt-4 pb-4 pr-8 pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${state.data[0].name} (низ)`}
                    price={`${state.data[0].price}`}
                    thumbnail={`${state.data[0].image_mobile}`}
                />
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