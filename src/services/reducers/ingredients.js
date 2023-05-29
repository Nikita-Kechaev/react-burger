import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_CURRENT_ITEM,
  CLOSE_CURRENT_ITEM
} from '../actions/ingredients'

const initialState = {
  currentItem: '',
  modalIsVisible: false,
  items: '',
  isLoading: false,
  hasError: false,
}

export const ingReducer = (state = initialState, action) => {
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
        currentItem: ''
      }
    }
    default: {
      return state;
    }
  }
}