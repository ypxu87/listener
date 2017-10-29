import {createAction,createAsyncAction} from 'redux-action-tools'
import {AsyncStorage} from 'react-native'

//添加文件到下载列表
export const addToDownloadList= function (downloadData) {
    return createAsyncAction("addDownloadData",async (downloadData)=>{
        try {
            await AsyncStorage.setItem("downloadList",JSON.stringify([]))
            var downloadList = await AsyncStorage.getItem('downloadList')
            console.log("downloadList",downloadList)
            downloadList = JSON.parse(downloadList);
            if(downloadList){
                downloadList.push(downloadData);
            }else{
                downloadList = [];
                downloadList.push(downloadData)
            }
            await AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
            var promise = new Promise(function (resolve,reject) {
                resolve({data:downloadList})
            })
            return promise
        }catch (err){
            return Promise.reject(err)
        }
    })(downloadData)
}

//更新下载列表
export const updateDownloadList = function (downloadList,saveStorage) {
    return createAsyncAction("updateDownloadList",async (downloadList)=>{
        try{
            if(saveStorage){
                await AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
            }
            var promise = new Promise(function (resolve,reject) {
                setTimeout(()=> {
                    resolve({data:downloadList});
                }, 1)
            });
            return promise
        }catch (err){
            return Promise.reject(err)
        }
    })(downloadList,saveStorage)
}


//获取下载列表
export const getDownloadList = function () {
    return createAsyncAction("getDownloadList",async ()=>{
        try{
            var downloadList = await AsyncStorage.getItem('downloadList')
            downloadList = JSON.parse(downloadList)
            if(!downloadList){
                downloadList=[];
                await AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
            }
            var promise = new Promise(function (resolve,reject) {
                setTimeout(()=> {
                    resolve({data:downloadList});
                }, 1)
            });
            return promise
        }catch (err){
            return Promise.reject(err)
        }
    })()
}

//改变下载状态
export const changeDownloadStatus = function (jobId,dataId,targetState) {
    return createAsyncAction("changeDownloadStatus",async ()=>{
        var promise = new Promise(function (resolve,reject) {
            var command = {
                jobId,
                dataId,
                targetState
            }
            setTimeout(()=>{
                resolve({data:command})
            },1)
        })
        return promise
    })(jobId,targetState,dataId)
}