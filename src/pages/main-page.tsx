import { BurgerIngridients } from '../components/BurgerIngredients/BurgerIngridients';
import { BurgerConstructor } from '../components/BurgerConstructor/BurgerConstructor';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FC} from 'react';
import { TOrderDetails } from '../utils/types';

// тип?
export const MainPage:FC<TOrderDetails> = ({ element }) => {

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
            {element}
        </DndProvider>
    )
}