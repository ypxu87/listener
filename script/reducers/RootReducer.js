import {combineReducers} from 'redux';
import nav from './NavigatorReducer.js'
import {catchRejectReducer} from '../middlewares/CatchRejectMiddleware'
import appStateReducer from './AppStateReducer'
import {httpRequestReducer} from './HttpRequestReducer'

const RootReducer = combineReducers({
    nav,
    catchReject : catchRejectReducer,
    appState    : appStateReducer,
    httpRequest : httpRequestReducer
});

export default RootReducer;