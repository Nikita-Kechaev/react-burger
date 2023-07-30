import {GET_USER_REQUEST_START,
    GET_USER_REQUEST_END,
    GET_USER_LOGIN_SUCCESS,
    GET_USER_AUTH_SUCCESS,
    GET_LOGOUT,
    GET_LOGOUT_FAILED,
    GET_USER_REFRESH_DATA_SUCCESS,
    GET_USER_REFRESH_DATA_FAILED,
    SEND_FORGOT_PASS_MESS_SUCCES,
    SEND_FORGOT_PASS_MESS_FAILED,
    SEND_RESET_PASS_MESS_SUCCES ,
    SEND_RESET_PASS_MESS_FAILED,
} from '../constant'
import { TUserInitialState } from './user'
import { userReducer } from './user'

describe('user reducer', () => {
    const initialState: TUserInitialState = {
        user: {
            email: '',
            name: ''
        },
        auth: false,
        errorMessage: '',
        sendEmail: false,
        email: '',
        isLoading: false,
    }

    it('Тестируем начальное состояние в user-reducer', () => {
        expect(userReducer(
                undefined, 
                {} as any
            )).toEqual(
                initialState
            )
        }
    )
    it('Тестируем начало запроса пользователя - action: GET_USER_REQUEST_START', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: GET_USER_REQUEST_START,
            })
        ).toEqual(
            {
            ...initialState,
            isLoading: true, 
            }
        )
    })
    it('Тестируем окончание запроса пользователя - action: GET_USER_REQUEST_END', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: GET_USER_REQUEST_END,
            })
        ).toEqual(
            {
            ...initialState,
            isLoading: false, 
            }
        )
    })
    it('Тестируем успешное получение пользователя - action: GET_USER_AUTH_SUCCESS', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: GET_USER_AUTH_SUCCESS,
                data: {
                    user: {
                        email: 'testuser@mail.ru',
                        name: 'testuser'
                    }
                },
            })
        ).toEqual(
            {
                ...initialState,
                auth: true,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
            } 
            }
        )
    })
    it('Тестируем успешный логин пользователя - action: GET_USER_LOGIN_SUCCESS', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: GET_USER_LOGIN_SUCCESS,
                data: {
                    user: {
                        email: 'testuser@mail.ru',
                        name: 'testuser'
                    }
                },
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
                },
                errorMessage: '',
                auth: true
            }
        )
    })
    it('Тестируем успешный логаут пользователя - action: GET_LOGOUT', () => {
        expect(
            userReducer({
                ...initialState,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
                }
            }, {
                type: GET_LOGOUT,
                data: {
                    message: 'выход'
                }
            })
        ).toEqual(
            {
                ...initialState,
                auth: false,
                user: {
                    email: '',
                    name: ''
                },
                errorMessage: 'выход'
            }
        )
    })
    it('Тестируем ошибку логаута пользователя - action: GET_LOGOUT_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
                }
            }, {
                type: GET_LOGOUT_FAILED,
                data: {
                    message: 'ошибка выхода'
                }
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: '',
                    name: ''
                },
                errorMessage: 'ошибка выхода'
            }
        )
    })
    it('Проверяем успешное обновление данных о пользователе - action: GET_USER_REFRESH_DATA_SUCCESS', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: GET_USER_REFRESH_DATA_SUCCESS,
                data: {
                    user: {
                        email: 'testuser@mail.ru',
                        name: 'testuser'
                    }
                }
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
                },
                auth: true
            }
        )
    })
    it('Проверяем ошибку при обновлении данных о пользователе - action: GET_USER_REFRESH_DATA_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
                user: {
                    email: 'testuser@mail.ru',
                    name: 'testuser'
                }
            }, {
                type: GET_USER_REFRESH_DATA_FAILED,
                data: {
                    message: 'ошибка'
                }
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: '',
                    name: ''
                },
                auth: false,
                errorMessage: 'ошибка'
            }
        )
    })
    it('Проверяем успешную отправку письма восстановления пароля - action: SEND_FORGOT_PASS_MESS_SUCCES', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: SEND_FORGOT_PASS_MESS_SUCCES,
                data: {
                    email: 'testuser@mail.ru'
                }
            })
        ).toEqual(
            {
                ...initialState,
                sendEmail: true,
                email: 'testuser@mail.ru'
            }
        )
    })
    it('Проверяем ошибку отправки письма восстановления пароля - action: SEND_FORGOT_PASS_MESS_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: SEND_FORGOT_PASS_MESS_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
                sendEmail: false,
            }
        )
    })
    it('Проверяем успешное восстановления пароля - action: SEND_RESET_PASS_MESS_SUCCES', () => {
        expect(
            userReducer({
                ...initialState,
                email: 'testuser@mail.ru',
                sendEmail: true,
            }, {
                type: SEND_RESET_PASS_MESS_SUCCES,
            })
        ).toEqual(
            {
                ...initialState,
                sendEmail: false,
                email: ''
            }
        )
    })
    it('Проверяем ошибку восстановления пароля - action: SEND_RESET_PASS_MESS_FAILED', () => {
        expect(
            userReducer({
                ...initialState,
            }, {
                type: SEND_RESET_PASS_MESS_FAILED,
            })
        ).toEqual(
            {
                ...initialState,
            }
        )
    })
})