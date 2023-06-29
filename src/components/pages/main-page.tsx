import { BurgerIngridients } from '../BurgerIngredients/BurgerIngridients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FC } from 'react';



export const MainPage:FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
        </DndProvider>
    )
}