import {
    MOVE_CARD,
    ADD_ITEMS_TO_CONSTRUCTOR,
    DELTE_ITEM_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
} from '../actions/constructor';
import update from 'immutability-helper'
import { Ingredient } from "../../utils/types"


const initialState = {
    bun: '',
    constructorItems: [],
}

export const constructorReducer = (state = initialState, action:any) => {
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
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    bun: action.item
                }
            } else {
                return {
                    ...state,
                    constructorItems: [action.item, ...state.constructorItems]
                }
            }
        }
        case DELTE_ITEM_FROM_CONSTRUCTOR : {
            return {
                ...state,
                constructorItems: [...state.constructorItems].filter((item:Ingredient) => item.uuid !== action.item.uuid)
            }
        }
        case CLEAR_CONSTRUCTOR : {
            return {
                ...state,
                bun: '',
                constructorItems: [], 
            }
        }
        default : {
            return {
                // state без ... ломает
                ...state
            }
        }
    }
}