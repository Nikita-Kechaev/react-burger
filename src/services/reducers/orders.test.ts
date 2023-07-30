import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from '../constant'
import { orderReducer } from './order'
import { TOrdersInitialState } from './order'


describe('order reducer', () => {
    const initialState: TOrdersInitialState = {
        isVisible: false,
        orderNumber: '',
        orderRequest: false,
        orderFailed: false,
    }

    it('Тестируем начальное состояние в order-reducer', () => {
        expect(orderReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('Тестируем успешный запрос номера заказа с сервера - action: GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer({
                ...initialState,
            }, {
                type: GET_ORDER_SUCCESS,
                order: '1234'
            })
        ).toEqual(
            {
            ...initialState,
            orderFailed: false, 
            orderNumber: '1234', 
            orderRequest: false 
            }
        )
    })
    it('Тестируем запрос номера заказа с сервера - action: GET_ORDER_REQUEST', () => {
        expect(
            orderReducer({
                ...initialState,
            }, {
                type: GET_ORDER_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                isVisible: true,
                orderRequest: true
            }
        )
    })
    it('Тестируем не успешный запрос номера заказа с сервера - action: GET_ORDER_FAILED', () => {
        expect(
            orderReducer({
                ...initialState,
            }, {
                type: GET_ORDER_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                orderFailed: true,
                orderRequest: false
            }
        )
    })
    it('Тестируем закрытие модального окна заказа - action: CLOSE_ORDER_MODAL', () => {
        expect(
            orderReducer({
                ...initialState,
            }, {
                type: CLOSE_ORDER_MODAL,
            })
        ).toEqual(
            {
                ...initialState,
                isVisible: false,
                orderNumber: ''
            }
        )
    })
})