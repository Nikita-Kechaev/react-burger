import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_CURRENT_ITEM,
  CLOSE_CURRENT_ITEM
} from '../constant'
import { TBurgerIngredientActions } from "../../utils/interfaces"
import { Ingredient } from '../../utils/types'

export type TBurgerIngredientsInitialState = {
  readonly currentItem: null| Ingredient,
  readonly modalIsVisible: boolean,
  readonly items: [] | Array<Ingredient> ,
  readonly isLoading: boolean,
  readonly hasError: boolean,
}

const initialState: TBurgerIngredientsInitialState = {
  currentItem: null,
  modalIsVisible: false,
  items: [],
  isLoading: false,
  hasError: false,
}

export const ingReducer = (state = initialState, action:TBurgerIngredientActions): TBurgerIngredientsInitialState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { 
        ...state, 
        hasError: false, 
        items: action.items, 
        isLoading: false 
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }
    case GET_CURRENT_ITEM: {
      return {
        ...state,
        modalIsVisible: true,
        currentItem: action.item
      }
    }
    case CLOSE_CURRENT_ITEM: {
      return {
        ...state,
        modalIsVisible: false,
        currentItem: null
      }
    }
    default: {
      return state;
    }
  }
}