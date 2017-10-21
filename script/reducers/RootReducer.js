import {combineReducers} from 'redux';
import nav from './NavigatorReducer.js'
import {catchRejectReducer} from '../middlewares/CatchRejectMiddleware'
import appStateReducer from './AppStateReducer'

const RootReducer = combineReducers({
    nav,
    catchReject : catchRejectReducer,
    appState    : appStateReducer
});

export default RootReducer;