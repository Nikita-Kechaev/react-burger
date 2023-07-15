import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers';
import { socketMiddleware } from '../services/middleWare/middleWare';
import { wsActions } from '../services/actions/webSocket';
import { wsAuthActions } from '../services/actions/webSocketAuth';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions), socketMiddleware(wsAuthActions)));
  
export const store = createStore(rootReducer, enhancer);