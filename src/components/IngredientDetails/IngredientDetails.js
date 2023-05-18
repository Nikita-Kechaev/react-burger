import React from 'react';
import styles from './IngredientDetails.module.css';
import { ingredientPropTypes } from '../../utils/types'
import PropTypes from 'prop-types';


export default function IngredientDetails (props) {
    return (
        <div className={styles.maintContainer }>
            <div className='pt-10 pl-10'>
                <p className="text text_type_main-large">Детали ингредиента</p>
            </div>
            <div className={styles.mainIngredientContainer }>
                <div className={styles.ingredientContainer}>
                    <img src={props.ingridient.image_large} alt={props.ingridient.name} />
                    <p className="text text_type_main-medium mt-4">{props.ingridient.name}</p>
                    <div className={`${styles.charContainer} text text_type_main-default text_color_inactive mt-8`}>
                        <div className={styles.char}>
                            <p>Калории,ккал</p>
                            <p>{props.ingridient.calories}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Белки, г</p>
                            <p>{props.ingridient.proteins}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Жиры, г</p>
                            <p>{props.ingridient.fat}</p>
                        </div>
                        <div className={styles.char}>
                            <p>Углеводы, г</p>
                            <p>{props.ingridient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingridient: ingredientPropTypes.isRequired,
    close: PropTypes.func.isRequired,
};