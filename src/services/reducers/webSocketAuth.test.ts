import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE
} from '../constant';
import { initialState, wsAuthReducer } from './webSocketAuth';


describe('WsSocketAuth reducer', () => {
    it('Тестируем начальное состояние в WsSocket reducer', () => {
        expect(wsAuthReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('Тестируем  - action: WS_AUTH_CONNECTION_SUCCESS', () => {
        expect(
            wsAuthReducer({
                ...initialState,
            }, {
                type: WS_AUTH_CONNECTION_SUCCESS,
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
    it('Тестируем  - action: WS_AUTH_CONNECTION_ERROR', () => {
        expect(
            wsAuthReducer({
                ...initialState,
            }, {
                type: WS_AUTH_CONNECTION_ERROR,
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
    it('Тестируем  - action: WS_AUTH_CONNECTION_CLOSED', () => {
        expect(
            wsAuthReducer({
                ...initialState,
            }, {
                type: WS_AUTH_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
            ...initialState,
            error: undefined,
            wsConnected: false,
            }
        )
    })
    it('Тестируем  - action: WS_AUTH_GET_MESSAGE', () => {
        expect(
            wsAuthReducer({
                ...initialState,
            }, {
                type: WS_AUTH_GET_MESSAGE,
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