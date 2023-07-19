import  {  useEffect, useState,  FC} from 'react';
import styles from './BurgerIngridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Product } from '../Product/Product'
import { useSelector } from '../../utils/hooks';
import { useInView } from 'react-intersection-observer';



export const BurgerIngridients:FC = () => {
    const [current, setCurrent] = useState('bun')

    const ingridients = useSelector((store) => store.ingredients.items);

    const [bunRef, inViewBuns] = useInView({
        threshold: 0,
    })
    const [mainsRef, inViewFilling] = useInView({
        threshold: 0,
    })
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    })

    useEffect(() => {
        if (inViewBuns) {
            setCurrent('bun')
        } else if (inViewFilling){
            setCurrent('main')
        } else if (inViewSauces) {
            setCurrent('sauce')
        }
    }, [inViewBuns,inViewFilling,inViewSauces])

    const setTab = (tab: string) => {
        setCurrent(tab);
        const type = document.getElementById(tab);
        if (type) type.scrollIntoView({behavior: "smooth"});
    };

    const ingTypes = [
        {type: 'bun', title: 'Булки', ref: bunRef},
        {type: 'sauce', title: 'Соусы', ref: saucesRef},
        {type: 'main', title: 'Начинки', ref: mainsRef}
    ]

    return (
        <div className={`${styles.column} mt-10`}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={`${styles.tab} mt-5`}>
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingridientsContainer} ${styles.scroll}  mt-10`}>
                {ingridients && ingTypes.map((type, index) => (
                    <div key={index}>
                        <p id={type.type} className="text text_type_main-medium">{type.title}</p>
                        <div ref={type.ref} className={`${styles.cardsContainer} pl-4 pr-4 pt-6 pb-10`}>
                            {ingridients.map(
                                (ingridient:any) => (
                                    ingridient.type === `${type.type}` &&
                                    <Product key={ingridient._id} ingridient={ingridient} />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}