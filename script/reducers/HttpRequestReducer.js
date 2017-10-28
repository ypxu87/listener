import {createReducer} from 'redux-action-tools'

let initialState = {};

export const httpRequestReducer = createReducer()

    .when('getListDate',state=>state)
    .done((state, action) => {
        var { payload, meta } = action;
        return {
            ...state,
            listDate: payload.data
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


