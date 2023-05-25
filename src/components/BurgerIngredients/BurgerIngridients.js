import React, {  useEffect, useRef, useState } from 'react';
import styles from './BurgerIngridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Product } from '../Product/Product'
import { useSelector } from 'react-redux';


export default function BurgerIngridients () {

    const [state, setState] = useState({bunTop: '',sauceTop: '',mainTop: ''})
    const [current, setCurrent] = React.useState('bun')

    const bunContainerRef = useRef()
    const sauseContainerRef = useRef()
    const mainContainerRef = useRef()
    const containerRef = useRef()

    const ingridients = useSelector(store => store.ingredients.items);
    const modalIsVisible = useSelector(store => store.ingredients.modalIsVisible)


    useEffect(() => {
        const bunTop = bunContainerRef.current?.getBoundingClientRect().top
        const sauceTop = sauseContainerRef.current?.getBoundingClientRect().top
        const mainTop = mainContainerRef.current?.getBoundingClientRect().top
        setState({
            bunTop: bunTop,
            sauceTop: sauceTop,
            mainTop: mainTop
        })
    }, [])

    const setTab = (tab) => {
        setCurrent(tab);
        const type = document.getElementById(tab);
        if (type) type.scrollIntoView({behavior: "smooth"});
    };


    const changeTabs = () => {
        const containerTop = bunContainerRef.current?.getBoundingClientRect().top
        if (state.bunTop - containerTop <= state.sauceTop - state.bunTop) {
            setCurrent('bun')
        } else
        if (state.bunTop - containerTop >= state.sauceTop - state.bunTop && state.bunTop - containerTop <= state.mainTop - state.bunTop) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    }

    const ingTypes = [
        {type: 'bun', title: 'Булки', ref: bunContainerRef},
        {type: 'sauce', title: 'Соусы', ref: sauseContainerRef},
        {type: 'main', title: 'Начинки', ref: mainContainerRef}
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
            <div ref={containerRef} onScroll={changeTabs} className={`${styles.ingridientsContainer} ${styles.scroll}  mt-10`}>
                {ingridients && ingTypes.map((type, index) => (
                    <div key={index}>
                        <p ref={type.ref} id={type.type} className="text text_type_main-medium">{type.title}</p>
                        <div className={`${styles.cardsContainer} pl-4 pr-4 pt-6 pb-10`}>
                            {ingridients.map(
                                (ingridient) => (
                                    ingridient.type === `${type.type}` &&
                                    <Product key={ingridient._id} ingridient={ingridient} />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {modalIsVisible && <Modal><IngredientDetails /></Modal>}
        </div>
    )
}