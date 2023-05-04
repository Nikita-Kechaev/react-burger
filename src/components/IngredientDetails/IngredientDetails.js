import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';


export default function IngredientDetails (props) {
    return (
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

IngredientDetails.propTypes = {
    ingridient: ingredientPropTypes,
};