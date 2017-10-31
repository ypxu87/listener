import React, {Component} from 'react';
import { BackHandler,View,DeviceEventEmitter} from 'react-native'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, NavigationActions} from 'react-navigation';
import {getDownloadList,updateDownloadList} from "./actions/DownloadAction";
import Router from './routers/Router.js';
import Video from 'react-native-video';
import RNFS from 'react-native-fs'

class AppWithNavigatior extends Component {
    constructor(props){
        super(props);
        this.state={
            audioInfo:null
        }
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
        this.props.getDownloadList();
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
            updateDownloadList(downloadList,true)
        })
        this.playerListener = DeviceEventEmitter.addListener('addToPlayer',function (data) {
            _self.setState({
                audioInfo:data
            })
        })
    }

    componentWillUnmount(){
        this.listener.remove()
        this.downloadListener.remove()
        this.playerListener.remove()
    }
    checkDownload() {
        var {downloadList,updateDownloadList} = this.props;
        if(downloadList&&downloadList.length>0) {
            var waitingTasks = []
            for (var i = 0; i < downloadList.length; i++) {
                if (downloadList[i].status == 'waiting') {
                    waitingTasks.push(downloadList[i])
                }
            }
            while(waitingTasks.length){
                var downloadItem = waitingTasks.shift()
                const formUrl = downloadItem.audio;
                var fileSize = 0;
                if(downloadItem.contentLength){
                    RNFS.stat(`${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`).then((rsp)=>{
                        const downloadDest = `${RNFS.MainBundlePath}/${downloadItem.title}_temp.mp3`;
                        const targetDest = `${RNFS.MainBundlePath}/${downloadItem.title}.mp3`;
                        var range = "bytes="+rsp.size+"-200000000"
                        options1 = {
                            fromUrl: formUrl,
                            toFile: downloadDest,
                            headers:{
                                "Range":range
                            },
                            background: true,
                            begin: (res) => {
                                console.log('begin', res);
                                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                                var itemPosition=downloadList.indexOf(function (data) {
                                    return data._id==downloadItem._id
                                })
                                downloadList[itemPosition].status="downloading"
                                downloadList[itemPosition].progress=0
                                downloadList[itemPosition].jobId=res.jobId
                                downloadList[itemPosition].contentLength=res.contentLength
                                updateDownloadList(downloadList,true);
                            },
                            progress: (res) => {
                                let pro = res.bytesWritten / res.contentLength;
                                console.log("progress",pro*100)
                                var itemPosition=downloadList.findIndex(function (value, index, arr) {
                                    return value._id==downloadItem._id
                                })
                                downloadList[itemPosition].progress=pro*100
                                updateDownloadList(downloadList,false);
                            },

                        };
                        try {
                            const ret = RNFS.downloadFile(options1);
                            ret.promise.then(res => {
                                console.log('success', res);
                                console.log('file://' + downloadDest)
                                RNFS.read(downloadDest,'base64').then((content)=>{
                                    RNFS.appendFile(targetDest,content,'base64').then(()=>{
                                        RNFS.unlink(downloadList)
                                    })
                                    RNFS.stat(downloadDest).then((result)=>{
                                        console.log("fileSize="+result.size," contentLength="+downloadItem.contentLength)
                                        if(result.size==downloadItem.contentLength){
                                            var itemPosition=downloadList.findIndex(function (value, index, arr) {
                                                return value._id==downloadItem._id
                                            })
                                            downloadList[itemPosition].status="downloaded"
                                            updateDownloadList(downloadList,true);
                                        }
                                    })
                                })

                            }).catch(err => {
                                console.log('err', err);
                            });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    })
                }else{
                    const downloadDest = `${RNFS.ExternalDirectoryPath}/${downloadItem.title}.mp3`;  //ExternalDirectoryPath //MainBundlePath
                    const options = {
                        fromUrl: formUrl,
                        toFile: downloadDest,
                        background: true,
                        begin: (res) => {
                            console.log('begin', res);
                            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                            var itemPosition=downloadList.findIndex(function (value, index, arr) {
                                return value._id==downloadItem._id
                            })
                            downloadList[itemPosition].status="downloading"
                            downloadList[itemPosition].progress=0
                            downloadList[itemPosition].jobId=res.jobId
                            downloadList[itemPosition].contentLength=res.contentLength
                            updateDownloadList(downloadList,true);
                        },
                        progress: (res) => {
                            let pro = res.bytesWritten / res.contentLength;
                            console.log("progress",pro*100)
                            var itemPosition=downloadList.findIndex(function (value, index, arr) {
                                return value._id==downloadItem._id
                            })
                            downloadList[itemPosition].progress=pro*100
                            if(pro>0.3){
                                RNFS.stopDownload(res.jobId)
                                console.log("stopDownload",res.jobId)
                            }else{
                            }
                        }
                    };
                    try {
                        const ret = RNFS.downloadFile(options);
                        ret.promise.then(res => {
                            console.log('success', res);
                            console.log('file://' + downloadDest)
                            RNFS.stat(downloadDest).then((result)=>{
                                console.log("fileSize="+result.size," contentLength="+downloadItem.contentLength)
                                if(result.size==downloadItem.contentLength){
                                    var itemPosition=downloadList.findIndex(function (value, index, arr) {
                                        return value._id==downloadItem._id
                                    })
                                    downloadList[itemPosition].status="downloaded"
                                    updateDownloadList(downloadList,true);
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
            }
        }
    }

    render() {
        var _self=this
        this.checkDownload();
        const {dispatch, nav} = this.props;
        var playerView = this.state.audioInfo ? (
            <Video
                source={{uri: _self.state.audioInfo.audio}}
                ref='video'
                volume={1.0}
                paused={false}
                playInBackground={true}
            />
        ):(<View/>)
        return (
            <View style={{width:'100%',height:'100%'}}>
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
    downloadList : state.download.downloadList
});

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getDownloadList:()=>dispatch(getDownloadList()),
        updateDownloadList:(list,saveStorage)=>dispatch(updateDownloadList(list,saveStorage)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppWithNavigatior);