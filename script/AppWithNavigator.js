import React, {Component} from 'react';
import { BackHandler,View,DeviceEventEmitter,Platform,AsyncStorage} from 'react-native'
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
        AsyncStorage.getItem("downloadList").then((list)=>{
            let downloadList = JSON.parse(list)
            if(downloadList){
                for(var i=0;i<downloadList.length;i++){
                    if(downloadList[i].status!="downloaded"){
                        downloadList[i].status = "pause"
                    }
                }
                _self.props.updateDownloadList(downloadList)
            }
        })
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
            var {updateDownloadList} = _self.props
            var {downloadList} =_self.props.downloader
            if(command.status=="pause") {
                RNFS.stopDownload(command.jobId)
                downloadList[command.index].status = "pause"
            }else if(command.status=="delete"){
                RNFS.unlink(downloadList[command.index].audio)
                downloadList.splice(command.index,1);
                AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
                this.props.updateDownloadList(downloadList)
            }else{
                downloadList[command.index].status="waiting"
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
                    _self.props.downloader.downloadList[i].status = "downloading"
                    var downloadFile = Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadList[i]._id}.mp3` : `${RNFS.ExternalDirectoryPath}/${downloadList[i]._id}.mp3`;
                    RNFS.exists(downloadFile).then(isExist=>{
                        if (isExist) {
                            RNFS.stat(downloadFile).then((result) => {
                                const formUrl = _self.props.downloader.downloadList[i].audio;
                                const downloadDest = downloadFile;//Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`:`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
                                const options = {
                                    fromUrl: formUrl,
                                    headers:{
                                      Range:"bytes="+result.size+"-"+_self.props.downloader.downloadList[i].contentLength
                                    },
                                    toFile: downloadDest,
                                    startPoint: result.size,
                                    endPoint: _self.props.downloader.downloadList[i].contentLength,
                                    background: true,
                                    begin: (res) => {
                                        console.log('begin', res);
                                        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                                        _self.props.downloader.downloadList[i].jobId = res.jobId
                                        _self.props.downloader.downloadList[i].contentLength = _self.props.downloader.downloadList[i].contentLength ? _self.props.downloader.downloadList[i].contentLength : res.contentLength;
                                        _self.props.updateDownloadList(downloadList);
                                        AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))

                                    },
                                    progress: (res) => {
                                        let pro = res.bytesWritten / _self.props.downloader.downloadList[i].contentLength;
                                        var pro_int = parseInt(pro * 100)
                                        console.log("progress_" + res.jobId, pro_int + " props:" + _self.props.downloader.downloadList[i].progress)
                                        updateDownloadList(_self.props.downloader.downloadList);
                                        _self.props.downloader.downloadList[i].progress = pro_int
                                    }
                                };
                                try {
                                    console.log("start downloader", _self.props.downloader.downloadList[i].title)
                                    const ret = RNFS.downloadFile(options);
                                    ret.promise.then(res => {
                                        console.log('success', res);
                                        console.log('file://' + downloadDest)
                                        _self.props.downloader.downloadList[i].status = "downloaded"
                                        _self.props.downloader.downloadList[i].progress = 100
                                        updateDownloadList(_self.props.downloader.downloadList);
                                        AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
                                    }).catch(err => {
                                        console.log('err', err);
                                    });
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            })
                        } else {
                            const formUrl = _self.props.downloader.downloadList[i].audio;
                            const downloadDest = downloadFile;//Platform.OS == 'ios' ? `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`:`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
                            const options = {
                                fromUrl: formUrl,
                                toFile: downloadDest,
                                startPoint: 0,
                                endPoint: 0,
                                background: true,
                                begin: (res) => {
                                    console.log('begin', res);
                                    console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                                    _self.props.downloader.downloadList[i].jobId = res.jobId
                                    _self.props.downloader.downloadList[i].contentLength = _self.props.downloader.downloadList[i].contentLength ? _self.props.downloader.downloadList[i].contentLength : res.contentLength;
                                    _self.props.updateDownloadList(downloadList);
                                    AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
                                },
                                progress: (res) => {
                                    let pro = res.bytesWritten / _self.props.downloader.downloadList[i].contentLength;
                                    var pro_int = parseInt(pro * 100)
                                    console.log("progress_" + res.jobId, pro_int + " props:" + _self.props.downloader.downloadList[i].progress)
                                    updateDownloadList(_self.props.downloader.downloadList);
                                    _self.props.downloader.downloadList[i].progress = pro_int
                                }
                            };
                            try {
                                console.log("start downloader", _self.props.downloader.downloadList[i].title)
                                const ret = RNFS.downloadFile(options);
                                ret.promise.then(res => {
                                    console.log('success', res);
                                    console.log('file://' + downloadDest)
                                    _self.props.downloader.downloadList[i].status = "downloaded"
                                    _self.props.downloader.downloadList[i].progress = 100
                                    _self.props.downloader.downloadList[i].audio=downloadDest
                                    updateDownloadList(_self.props.downloader.downloadList);
                                    AsyncStorage.setItem("downloadList",JSON.stringify(downloadList))
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
        this.checkDownload(this.props.downloader.downloadList);
        const {dispatch, nav} = this.props;
        const {data} = this.props.player
        var playerView = data ? (
            <Video
                source={{uri: data.audio}}
                ref='player'
                volume={1.0}
                paused={ _self.props.player.status}
                playInBackground={true}
                onProgress={(e) => this.playerProgress(e)}
                onLoad={(e) => this.playerOnload(e)}
                onEnd={()=>{
                    this.props.updatePlayerTrackValue(0)
                    this.props.changePlayerStatus(true)
                    this.refs.player.seek(0)
                }}
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
    downloader : state.downloader,
    player  : state.player
});

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        updateDownloadList:(list,saveStorage)=>dispatch(updateDownloadList(list,saveStorage)),
        changePlayerStatus:(status)=>dispatch(playerAction.changePlayerStatus(status)),
        setPlayerDuration:(duration)=>dispatch(playerAction.playerOnload(duration)),
        updatePlayerTrackValue:(value)=>dispatch(playerAction.updatePlayerTrackValue(value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppWithNavigatior);