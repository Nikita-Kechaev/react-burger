import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../constant';
import { initialState, wsReducer } from './webSocket';


describe('WsSocket reducer', () => {
    it('Тестируем начальное состояние в WsSocket reducer', () => {
        expect(wsReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('Тестируем  - action: WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer({
                ...initialState,
            }, {
                type: WS_CONNECTION_SUCCESS,
                payload: ''
            })
        ).toEqual(
            {
            ...initialState,
            error: undefined,
            wsConnected: true, 
            }
        )
    })
    it('Тестируем  - action: WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({
                ...initialState,
            }, {
                type: WS_CONNECTION_ERROR,
                payload: 'test message'
            })
        ).toEqual(
            {
            ...initialState,
            error: 'test message',
            wsConnected: false,
            }
        )
    })
    it('Тестируем  - action: WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({
                ...initialState,
            }, {
                type: WS_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
            ...initialState,
            error: undefined,
            wsConnected: false,
            }
        )
    })
    it('Тестируем  - action: WS_GET_MESSAGE', () => {
        expect(
            wsReducer({
                ...initialState,
            }, {
                type: WS_GET_MESSAGE,
                payload: {
                    error: 'test message',
                    orders: {} as any,
                    total: 1,
                    totalToday: 1
                }
            })
        ).toEqual(
            {
            ...initialState,
            error: undefined,
            orders: {},
            total: 1,
            totalToday: 1,
            }
        )
    })
})