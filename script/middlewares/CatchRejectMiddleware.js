import _ from 'lodash'
import {ASYNC_PHASES} from 'redux-action-tools'
import {Alert} from 'react-native';
import ToastShow from "../common/ToastShow"

const actionTypes = {
    CATCH_REJECT: "CATCH_REJECT"
};

export function catchRejectReducer(state = {}, action) {
    if (action.type == actionTypes.CATCH_REJECT) {
        let sourceAction = action.payload;
        //alert(`${sourceAction.type}\n${sourceAction.payload.message}`
        ToastShow.loadinghide();
        Alert.alert(`${sourceAction.type}`,`${sourceAction.payload.message}`)
    }
    return state
}

export default function catchRejectMiddleWare({dispatch}) {
    return next => (action) => {
        const asyncPhase = _.get(action, 'meta.asyncPhase');
        const omitCatchReject = _.get(action, 'meta.omitCatchReject');

        if ((asyncPhase === ASYNC_PHASES.FAILED) && !omitCatchReject) {
            dispatch({type: actionTypes.CATCH_REJECT, payload: action});
            return;
        }
        return next(action);
    };
}
