
const initState = {
    downloadList:[],
    randomValue:0
};
export default function playerReducer(state = initState, action) {
    switch(action.type) {
        case "UPDATE_DOWNLOAD_LIST":
            state = {
                ...state,
                downloadList:action.downloadList,
                randomValue:Math.random()
            }
            break;
        default:
            break;
    }
    return state;
}