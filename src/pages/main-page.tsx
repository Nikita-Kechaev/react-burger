import { BurgerIngridients } from '../components/BurgerIngredients/BurgerIngridients';
import { BurgerConstructor } from '../components/BurgerConstructor/BurgerConstructor';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FC} from 'react';

// тип?
export const MainPage:FC<any> = ({ element }) => {

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
            {element}
        </DndProvider>
    )
}