import {
    ADD_ITEMS_TO_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
} from '../constant'
import uuid from 'react-uuid';
import { Ingredient } from "../../utils/types"
import { AppThunk } from '../../utils/types-index';
import { IAddItemsToConstructor, IClearConstructor } from '../../utils/interfaces'


export const addItemsToConstructor = (item: Ingredient): IAddItemsToConstructor => ({ type: ADD_ITEMS_TO_CONSTRUCTOR, item: item, bun: '' });
export const clearConstructorACtion = (): IClearConstructor => ({ type: CLEAR_CONSTRUCTOR })

export const createUuidToItem: AppThunk = (item:Ingredient) => {
    return function(dispatch) {
        const itemWithUuid = {
            ...item,
            uuid: uuid()
        }
        dispatch(addItemsToConstructor(itemWithUuid));
    }
}
