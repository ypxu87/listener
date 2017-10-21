import Router from '../routers/Router.js';

export default function NavigatorReducer(state , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = Router.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}