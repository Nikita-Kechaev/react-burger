export const MOVE_CARD = 'MOVE_CARD'
export const ADD_ITEMS_TO_CONSTRUCTOR = 'ADD_ITEMS_TO_CONSTRUCTOR'
export const DELTE_ITEM_FROM_CONSTRUCTOR = 'DELTE_ITEM_FROM_CONSTRUCTOR'
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR'
import uuid from 'react-uuid';
import { Ingredient } from "../../utils/types"

export const createUuidToItem = (item:Ingredient) => {
    return function(dispatch:any) {
        const itemWithUuid = {
            ...item,
            uuid: uuid()
        }
        dispatch({
            type: ADD_ITEMS_TO_CONSTRUCTOR,
            item: itemWithUuid
        });
    }
}
