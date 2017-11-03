import {combineReducers} from 'redux';
import nav from './NavigatorReducer.js'
import {catchRejectReducer} from '../middlewares/CatchRejectMiddleware'
import appStateReducer from './AppStateReducer'
import {httpRequestReducer} from './HttpRequestReducer'
import DownloadReducer from './DownloadReducer'
import PlayerRuducer from './PlayerRuducer'

const RootReducer = combineReducers({
    nav,
    catchReject : catchRejectReducer,
    appState    : appStateReducer,
    httpRequest : httpRequestReducer,
    download    : DownloadReducer,
    player      : PlayerRuducer
});

export default RootReducer;