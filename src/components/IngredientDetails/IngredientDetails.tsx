import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  { FC} from 'react';

import { RootState, Ingredient } from "../../utils/types"


export const IngredientDetails: FC = () => {
    const {ingredientId}  = useParams()
    let currentItem;
    const itemModal = useSelector((store:RootState) => store.ingredients.currentItem)
    const items = useSelector((store:RootState) => store.ingredients.items)

    const itemURL = items ? items.filter((item:Ingredient) => item._id === ingredientId)[0] : ''

    if (ingredientId) {
        currentItem = itemURL
    } else {
        currentItem = itemModal
    }

    return (
        <div className={styles.maintContainer }>
            <div className={`${styles.titleContainer} pt-10 pl-10`}>
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