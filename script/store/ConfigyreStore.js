import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import RootReducer from '../reducers/RootReducer';
import catchRejectMiddleware from '../middlewares/CatchRejectMiddleware'

let middlewares = [];

middlewares.push(thunk);
middlewares.push(catchRejectMiddleware);

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});
middlewares.push(logger);

export default function configureStore(initialState) {
    const store = createStore(RootReducer, initialState, applyMiddleware(...middlewares));
    if (isDebuggingInChrome) {
        window.store = store;
    }
    return store;
}