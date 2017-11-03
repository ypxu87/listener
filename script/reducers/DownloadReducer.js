
const initState = {
    downloadList:[]
};
export default function playerReducer(state = initState, action) {
    switch(action.type) {
        case "UPDATE_DOWNLOAD_LIST":
            state = {
                ...state,
                downloadList:action.downloadList
            }
            break;
        default:
            break;
    }
    return state;
}