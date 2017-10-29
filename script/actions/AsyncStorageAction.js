import {AsyncStorage} from 'react-native'
import {createAsyncAction} from 'redux-action-tools'

export const AsyncStorageAction = function (key,storageRequest) {
    return createAsyncAction(key, function(storageRequest) {
        return AsyncStorageRquest(key, requestData)
    },{requestData,...meta})(requestData)
}

const getStorageItem = (itemName)=>(AsyncStorage.getItem(itemName,function (err,result) {
    if(!err){
        return {data:result.json()}
    }else{
        return {}
    }
}))