import {AsyncStorage} from 'react-native'

export function updateDownloadList(downloadList) {
    return dispatch=>{
        return{}
        type:"UPDATE_DOWNLOAD_LIST",
        downloadList
    }
}