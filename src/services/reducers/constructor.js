import {
    MOVE_CARD,
    ADD_ITEMS_TO_CONSTRUCTOR,
    DELTE_ITEMS_FROM_CONSTRUCTOR
} from '../actions/constructor';
import uuid from 'react-uuid';
import update from 'immutability-helper'


const initialState = {
    bun: '',
    constructorItems: [],
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_CARD : {
            if (action.dragIndex > action.hoverIndex) {
            return update(state, {
                constructorItems: {
                        $splice: [
                            [ action.hoverIndex, 1],
                            [action.dragIndex, 0, ...state.constructorItems.slice(action.hoverIndex, action.dragIndex)],
                        ],  
                }
            })} else {
            return update(state, {
                constructorItems: {
                        $splice: [
                            [action.dragIndex, 1],
                            [action.hoverIndex, 0, ...state.constructorItems.slice(action.dragIndex, action.hoverIndex)],
                        ],  
                }
            })
            }
        }
        case ADD_ITEMS_TO_CONSTRUCTOR : {
            const newItem = {
                ...action.item,
                uuid: uuid()
            }
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    bun: action.item
                }
            } else {
                return {
                    ...state,
                    constructorItems: [newItem, ...state.constructorItems]
                }
            }
        }
        case DELTE_ITEMS_FROM_CONSTRUCTOR : {
            return {
                ...state,
                constructorItems: [...state.constructorItems].filter(item => item.uuid !== action.item.uuid)
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}