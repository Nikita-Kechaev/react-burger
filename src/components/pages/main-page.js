import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";



export const MainPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
        </DndProvider>
    )
}