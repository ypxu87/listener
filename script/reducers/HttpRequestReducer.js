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
    .build(initialState);


