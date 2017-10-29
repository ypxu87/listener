import {createReducer} from 'redux-action-tools'

let initialState = {

};

export const asyncStorageReducer = createReducer()

    .when('getAsyncStorageItem',state=>state)
    .done((state, action) => {
        var { payload, meta } = action;
        return {
            ...state,
            ...payload.data
        };
    })
    .when('getDetailData',state=>state)
    .done((state, action) => {
        var { payload, meta } = action;
        return {
            ...state,
            detailData: payload.data
        };
    })
    .build(initialState);