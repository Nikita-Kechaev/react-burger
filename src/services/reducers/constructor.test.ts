import { constructorReducer } from './constructor'
import { Ingredient } from '../../utils/types';
import { TBurgerConstructorInitialState } from './constructor';
import {
    MOVE_CARD,
    ADD_ITEMS_TO_CONSTRUCTOR,
    DELTE_ITEM_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
} from '../constant';


describe('constructor reducer', () => {
    const ingredientTestBun: Ingredient = {
        _id: '0',
        name: 'name',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'image',
        image_mobile: 'image',
        image_large: 'image',
        __v: 0,
        uuid: '0',
        count: 0
    };
    const ingredientTestMain1: Ingredient = {
        _id: '1',
        name: 'name',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'image',
        image_mobile: 'image',
        image_large: 'image',
        __v: 0,
        uuid: '1',
        count: 0
    };
    const ingredientTestMain2: Ingredient = {
        _id: '2',
        name: 'name',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'image',
        image_mobile: 'image',
        image_large: 'image',
        __v: 0,
        uuid: '2',
        count: 0
    };

    const initialState: TBurgerConstructorInitialState = {
        bun: null,
        constructorItems: [],
    }

    it('Тестируем начальное состояние в constructor-reducer', () => {
        expect(constructorReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('тестируем DND в constructor, action: MOVE_CARD', () => {
        expect(
            constructorReducer({
                ...initialState,
                constructorItems: [
                    ingredientTestMain1,
                    ingredientTestMain2
                ],
            }, {
                type: MOVE_CARD,
                dragIndex: 0,
                hoverIndex: 1
          })
        ).toEqual(
          {
            bun: null,
            constructorItems: [
                ingredientTestMain2,
                ingredientTestMain1
            ],
          }
        )
    })
    it('тестируем добавление булки в store constructor, action: ADD_ITEMS_TO_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                ...initialState,
            }, {
                type: ADD_ITEMS_TO_CONSTRUCTOR,
                item: ingredientTestBun,
                bun: null
          })
        ).toEqual(
          {
            bun: ingredientTestBun,
            constructorItems: [],
          }
        )
    })
    it('тестируем добавление ингридиента(не булки) в store constructor, action: ADD_ITEMS_TO_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                ...initialState,
            }, {
                type: ADD_ITEMS_TO_CONSTRUCTOR,
                item: ingredientTestMain1,
                bun: null
          })
        ).toEqual(
          {
            bun: null,
            constructorItems: [ingredientTestMain1],
          }
        )
    })
    it('тестируем удаление ингридиента из store constructor, action: DELTE_ITEM_FROM_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                ...initialState,
                constructorItems: [
                    ingredientTestMain1,
                    ingredientTestMain2
                ],
            }, {
                type: DELTE_ITEM_FROM_CONSTRUCTOR,
                item: ingredientTestMain1
          })
        ).toEqual(
          {
            bun: null,
            constructorItems: [ingredientTestMain2],
          }
        )
    })
    it('тестируем удаление всех ингридиентов из store constructor, action: CLEAR_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                bun: ingredientTestBun,
                constructorItems: [
                    ingredientTestMain1,
                    ingredientTestMain2
                ],
            }, {
                type: CLEAR_CONSTRUCTOR,
          })
        ).toEqual(
          {
            ...initialState
          }
        )
    })
})