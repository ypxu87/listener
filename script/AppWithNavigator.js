import React, {Component} from 'react';
import { BackHandler,View,DeviceEventEmitter,Platform} from 'react-native'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, NavigationActions} from 'react-navigation';
import {getDownloadList,updateDownloadList} from "./actions/DownloadAction";
import * as playerAction from "./actions/PlayerAction";
import Router from './routers/Router.js';
import Video from 'react-native-video';
import RNFS from 'react-native-fs'

class AppWithNavigatior extends Component {
    constructor(props){
        super(props);
        this.hasStop=false;
    }

    componentDidMount(){
        var _self = this
        this.listener = BackHandler.addEventListener('hardwareBackPress',()=>{
            //this.props.dispatch(NavigationActions.navigate({ routeName: 'ProfileScreen' }));
            const routers = this.props.nav.routes;
            if (routers.length > 1) {
                this.props.dispatch(NavigationActions.back())
                return true;
            }
            return false;
        })
        this.downloadListener = DeviceEventEmitter.addListener('downloadCommand',function (command) {
            var {downloadList,updateDownloadList} = _self.props
            var index=downloadList.findIndex(function (data,index,arr) {
                return command._id==data._id
            })
            if(command.status=="pause"){
                RNFS.stopDownload(command.jobId)
                downloadList[index].status="pause"
            }else{
                downloadList[index].status="waiting"
            }
            updateDownloadList(downloadList)
        })
        this.playerListener = DeviceEventEmitter.addListener('changePlayeTime',function (value) {
            _self.refs.player.seek(value)
        })
    }

    componentWillUnmount(){
        this.listener.remove()
        this.downloadListener.remove()
        this.playerListener.remove()
    }
    checkDownload(downloadList) {
        var _self = this;
        var {updateDownloadList} = this.props;
        if(downloadList&&downloadList.length>0) {
            for(let i =0;i<downloadList.length;i++) {
                if (downloadList[i].status == "waiting") {
                    RNFS.exists(`${RNFS.ExternalDirectoryPath}/${downloadList[i].title}.mp3`).then(isExist=>{
                        if (isExist) {
                            RNFS.stat(`${RNFS.ExternalDirectoryPath}/${downloadList[i].title}.mp3`).then((result) => {
                                const formUrl = _self.props.downloadList[i].audio;
                                const downloadDest = Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadList[i].title}.mp3` : `${RNFS.ExternalDirectoryPath}/${downloadList[i].title}.mp3`;//Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`:`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
                                _self.props.downloadList[i].status = "downloading"
                                const options = {
                                    fromUrl: formUrl,
                                    headers:{
                                      Range:"bytes="+result.size+"-"+_self.props.downloadList[i].contentLength
                                    },
                                    toFile: downloadDest,
                                    startPoint: result.size,
                                    endPoint: _self.props.downloadList[i].contentLength,
                                    background: true,
                                    begin: (res) => {
                                        console.log('begin', res);
                                        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                                        _self.props.downloadList[i].progress = 0
                                        _self.props.downloadList[i].jobId = res.jobId
                                        _self.props.downloadList[i].contentLength = _self.props.downloadList[i].contentLength ? _self.props.downloadList[i].contentLength : res.contentLength;
                                        _self.props.updateDownloadList(downloadList);
                                    },
                                    progress: (res) => {
                                        let pro = res.bytesWritten / 100000;
                                        if (_self.props.downloadList[i].jobId != res.jobId) {
                                            RNFS.stopDownload(res.jobId)
                                        }
                                        var pro_int = parseInt(pro * 100)
                                        console.log("progress_" + res.jobId, pro_int + " props:" + _self.props.downloadList[i].progress)
                                        updateDownloadList(_self.props.downloadList);
                                        _self.props.downloadList[i].progress = pro_int
                                    }
                                };
                                try {
                                    console.log("start download", _self.props.downloadList[i].title)
                                    const ret = RNFS.downloadFile(options);
                                    ret.promise.then(res => {
                                        console.log('success', res);
                                        console.log('file://' + downloadDest)
                                        RNFS.stat(downloadDest).then((result) => {
                                            if (_self.props.downloadList[i].contentLength > result.size) {
                                                _self.props.downloadList[i].status = "pause"
                                                let pro = result.size / _self.props.downloadList[i].contentLength;
                                                _self.props.downloadList[i].progress = pro * 100
                                                updateDownloadList(_self.props.downloadList);
                                            } else {
                                                _self.props.downloadList[i].status = "downloaded"
                                                _self.props.downloadList[i].progress = 100
                                                updateDownloadList(_self.props.downloadList);
                                            }
                                        })
                                    }).catch(err => {
                                        console.log('err', err);
                                    });
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            })
                        } else {
                            const formUrl = _self.props.downloadList[i].audio;
                            const downloadDest = Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadList[i].title}.mp3` : `${RNFS.ExternalDirectoryPath}/${downloadList[i].title}.mp3`;//Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`:`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
                            _self.props.downloadList[i].status = "downloading"
                            const options = {
                                fromUrl: formUrl,
                                toFile: downloadDest,
                                startPoint: 0,
                                endPoint: 0,
                                background: true,
                                begin: (res) => {
                                    console.log('begin', res);
                                    console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                                    _self.props.downloadList[i].progress = 0
                                    _self.props.downloadList[i].jobId = res.jobId
                                    _self.props.downloadList[i].contentLength = _self.props.downloadList[i].contentLength ? _self.props.downloadList[i].contentLength : res.contentLength;
                                    _self.props.updateDownloadList(downloadList);
                                },
                                progress: (res) => {
                                    let pro = res.bytesWritten / 100000;
                                    if (_self.props.downloadList[i].jobId != res.jobId) {
                                        RNFS.stopDownload(res.jobId)
                                    }
                                    var pro_int = parseInt(pro * 100)
                                    console.log("progress_" + res.jobId, pro_int + " props:" + _self.props.downloadList[i].progress)
                                    updateDownloadList(_self.props.downloadList);
                                    _self.props.downloadList[i].progress = pro_int
                                }
                            };
                            try {
                                console.log("start download", _self.props.downloadList[i].title)
                                const ret = RNFS.downloadFile(options);
                                ret.promise.then(res => {
                                    console.log('success', res);
                                    console.log('file://' + downloadDest)
                                    RNFS.stat(downloadDest).then((result) => {
                                        if (_self.props.downloadList[i].contentLength > result.size) {
                                            _self.props.downloadList[i].status = "pause"
                                            let pro = result.size / _self.props.downloadList[i].contentLength;
                                            _self.props.downloadList[i].progress = pro * 100
                                            updateDownloadList(_self.props.downloadList);
                                        } else {
                                            _self.props.downloadList[i].status = "downloaded"
                                            _self.props.downloadList[i].progress = 100
                                            updateDownloadList(_self.props.downloadList);
                                        }
                                    })
                                }).catch(err => {
                                    console.log('err', err);
                                });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    })
                }
            }
            // while(waitingTasks.length){
            //     var downloadItem = waitingTasks.shift()
            //     const formUrl = downloadItem.audio;
            //     const downloadDest = '/sdcard/Android/data/com.listener/files/'+downloadItem.title+'.mp3'//Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`:`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
            //     const options = {
            //         fromUrl: formUrl,
            //         toFile: downloadDest,
            //         contentLength:downloadItem.downloadItem ? downloadItem.downloadItem:0,
            //         background: true,
            //         begin: (res) => {
            //             console.log('begin', res);
            //             console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            //             var itemPosition=downloadList.findIndex(function (value, index, arr) {
            //                 return value._id==downloadItem._id
            //             })
            //             downloadList[itemPosition].status="downloading"
            //             downloadList[itemPosition].progress=0
            //             downloadList[itemPosition].jobId=res.jobId
            //             downloadList[itemPosition].contentLength=downloadList[itemPosition].contentLength ? downloadList[itemPosition].contentLength :res.contentLength;
            //             updateDownloadList(downloadList);
            //         },
            //         progress: (res) => {
            //             let pro = res.bytesWritten / res.contentLength;
            //             console.log("progress_"+res.jobId,pro*100)
            //             DeviceEventEmitter.emit("downloadProgress",{value:pro*100,_id:downloadItem._id})
            //             // var itemPosition=downloadList.findIndex(function (value, index, arr) {
            //             //     return value._id==downloadItem._id
            //             // })
            //             // downloadList[itemPosition].progress=pro*100
            //         }
            //     };
            //     try {
            //         const ret = RNFS.downloadFile(options);
            //         ret.promise.then(res => {
            //             console.log('success', res);
            //             console.log('file://' + downloadDest)
            //             var itemPosition=downloadList.findIndex(function (value, index, arr) {
            //                 return value._id==downloadItem._id
            //             })
            //             RNFS.stat(downloadDest).then((result)=>{
            //                 if(downloadList[itemPosition].contentLength>result.size){
            //                     downloadList[itemPosition].status="pause"
            //                     let pro = result.size / downloadList[itemPosition].contentLength;
            //                     downloadList[itemPosition].progress=pro*100
            //                     updateDownloadList(downloadList);
            //                 }else {
            //                     downloadList[itemPosition].status="downloaded"
            //                     downloadList[itemPosition].progress=100
            //                     updateDownloadList(downloadList);
            //                 }
            //             })
            //         }).catch(err => {
            //             console.log('err', err);
            //         });
            //     }
            //     catch (error) {
            //         console.log(error);
            //     }
            // }
        }
    }
    playerProgress(data){
        let val = parseInt(data.currentTime)
        //DeviceEventEmitter.emit("playerTrackValue",val)
        this.props.updatePlayerTrackValue(val)
    }
    playerOnload(data){
        let time= data.duration
        let duration = Math.floor(time/60)+":"+(time%60/100).toFixed(2).slice(-2)
        this.props.setPlayerDuration({time,duration})
    }
    render() {
        var _self=this
        this.checkDownload(this.props.downloadList);
        const {dispatch, nav} = this.props;
        var playerView = this.props.player.data ? (
            <Video
                source={{uri: _self.props.player.data.audio}}
                ref='player'
                volume={1.0}
                paused={ _self.props.player.status}
                playInBackground={true}
                onProgress={(e) => this.playerProgress(e)}
                onLoad={(e) => this.playerOnload(e)}
            />
        ):(<View/>)
        return (
            <View style={{width:'100%',height:'100%'}}>
                <View style={{width:0,height:0}}/>
                {playerView}
                <Router navigation={addNavigationHelpers({dispatch: dispatch, state: nav})}/>
            </View>
        );
    }
}

AppWithNavigatior.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    nav: state.nav,
    downloadList : state.download.downloadList,
    player  : state.player
});

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        updateDownloadList:(list,saveStorage)=>dispatch(updateDownloadList(list,saveStorage)),
        updatePlayer:(data)=>dispatch(playerAction.updatePlayerData(data)),
        setPlayerDuration:(duration)=>dispatch(playerAction.playerOnload(duration)),
        updatePlayerTrackValue:(value)=>dispatch(playerAction.updatePlayerTrackValue(value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppWithNavigatior);