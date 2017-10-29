import {createReducer} from 'redux-action-tools'

let initialState = {
    downloadList:[]
};
export const DownloadReducer = createReducer()

    .when('addDownloadData',state=>state)
    .done((state, action) => {
        var { payload, meta } = action;
        return {
            ...state,
            downloadList:payload.data
        };
    })
    .when('updateDownloadList',state=>state)
    .done((state, action) => {
        var { payload, meta } = action;
        return {
            ...state,
            downloadList:payload.data
        };
    })
    .build(initialState);