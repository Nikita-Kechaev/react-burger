import { ingReducer } from './ingredients'
import {
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_CURRENT_ITEM,
    CLOSE_CURRENT_ITEM
  } from '../constant'

import { Ingredient } from '../../utils/types'
import { TBurgerIngredientsInitialState } from './ingredients'

describe('ingredients reducer', () => {
    const initialState: TBurgerIngredientsInitialState = {
        currentItem: null,
        modalIsVisible: false,
        items: [],
        isLoading: false,
        hasError: false,
    }

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

    it('Тестируем начальное состояние в ingredient-reducer', () => {
        expect(ingReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('Тестируем запрос ингредиентов с сервера - action: GET_ITEMS_REQUEST', () => {
        expect(
            ingReducer({
                ...initialState,
            }, {
                type: GET_ITEMS_REQUEST
            })
        ).toEqual(
            {
            ...initialState,
            isLoading: true
            }
        )
    })
    it('Тестируем запрос ингредиентов с сервера - action: GET_ITEMS_SUCCESS', () => {
        expect(
            ingReducer({
                ...initialState,
            }, {
                type: GET_ITEMS_SUCCESS,
                items: [
                    ingredientTestBun,
                    ingredientTestMain1,
                    ingredientTestMain2
                ]
            })
        ).toEqual(
            {
            ...initialState,
            isLoading: false,
            hasError: false,
            items: [
                ingredientTestBun,
                ingredientTestMain1,
                ingredientTestMain2
            ]
            }
        )
    })
    it('Тестируем ошибку запроса ингредиентов с сервера - action: GET_ITEMS_FAILED', () => {
        expect(
            ingReducer({
                ...initialState,
            }, {
                type: GET_ITEMS_FAILED,
            })
        ).toEqual(
            {
            ...initialState,
            isLoading: false,
            hasError: true,
            items: [
            ]
            }
        )
    })
    it('Тестируем получение конкретного ингредиента - action: GET_CURRENT_ITEM', () => {
        expect(
            ingReducer({
                ...initialState,
            }, {
                type: GET_CURRENT_ITEM,
                item: ingredientTestMain1
            })
        ).toEqual(
            {
            ...initialState,
            modalIsVisible: true,
            currentItem: ingredientTestMain1
            }
        )
    })
    it('Тестируем закрытие модального окна конкретного ингредиента - action: CLOSE_CURRENT_ITEM', () => {
        expect(
            ingReducer({
                ...initialState,
            }, {
                type: CLOSE_CURRENT_ITEM,
                item: ingredientTestMain1
            })
        ).toEqual(
            {
            ...initialState,
            modalIsVisible: false,
            currentItem: null
            }
        )
    })
})