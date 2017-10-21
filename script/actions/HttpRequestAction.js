import {HttpRequest} from '../network/HttpRequest'
import {createAsyncAction} from 'redux-action-tools'

export const httpRequestAction = function(key,requestData,meta={})
{
    return createAsyncAction(key, function(requestData) {
        return HttpRequest(key, requestData)
    },{requestData,...meta})(requestData)
}