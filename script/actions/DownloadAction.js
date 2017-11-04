import {AsyncStorage} from 'react-native'

export function updateDownloadList(downloadList) {
    return{
        type:"UPDATE_DOWNLOAD_LIST",
        downloadList
    }
}