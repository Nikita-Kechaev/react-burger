import React from 'react';
import styles from './IngredientDetails.module.css';
import {  useSelector } from 'react-redux';


export default function IngredientDetails () {

    const currentItem = useSelector(store => store.ingredients.currentItem)

    return (
        <div className={styles.maintContainer }>
            <div className='pt-10 pl-10'>
                <p className="text text_type_main-large">Детали ингредиента</p>
            </div>
            <div className={styles.mainIngredientContainer }>
                <div className={styles.ingredientContainer}>
                    <img src={currentItem.image_large} alt={currentItem.name} />
                    <p className="text text_type_main-medium mt-4">{currentItem.name}</p>
                    <div className={`${styles.charContainer} text text_type_main-default text_color_inactive mt-8`}>
                        <div className={styles.char}>
                            <p>Калории,ккал</p>
                            <p>{currentItem.calories}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Белки, г</p>
                            <p>{currentItem.proteins}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Жиры, г</p>
                            <p>{currentItem.fat}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Углеводы, г</p>
                            <p>{currentItem.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}