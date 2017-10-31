
const initState = {
    data:null,
    status:true,
    trackValue:0,
    duration:'',
    time:0
};
export default function playerReducer(state = initState, action) {
    switch(action.type) {
        case "ADD_DATA_TO_PLAYER":
            state = {
                ...state,
                data:action.data,
                status:action.status
            }
            break;
        case "CHANGE_PLAYER_STATUS":
            state = {
                ...state,
                status:action.status
            }
            break;
        case "UPDATA_PLAYER_TRACK_VALUE":
            state = {
                ...state,
                trackValue:action.trackValue
            }
            break;
        case "UPDATA_PLAYER_ON_LOAD":
            state = {
                ...state,
                duration:action.duration,
                time:action.time
            }
            break;
        default:
            break;
    }
    return state;
}