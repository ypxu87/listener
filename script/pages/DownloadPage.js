import React, {Component} from 'react';
import {View,Image,Text,ScrollView,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import { Progress, Button} from 'antd-mobile';
import RNFS from 'react-native-fs';
import * as downloadAction from '../actions/DownloadAction'
class DownloadPage extends Component {
    static navigationOptions = (arg)=>({
        title: '下载',
        header: null,
        tabBarIcon: ({tintColor}) => (<Image source={require('../../images/download.png')} style={{
            tintColor: tintColor
        }}/>
        ),
    })
    constructor(props){
        super(props)
        this.state={
            curIndex:'downloaded',
        }
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    _selectTab(tabName){
        this.setState({
            curIndex:tabName
        })
    }
    _changeState(data,index){
        var command = {
            _id: data._id,
            jobId: data.jobId,
            status: data.status == "downloading" || data.status == "waiting" ? "pause" : "waiting",
            index: index
        }
        DeviceEventEmitter.emit("downloadCommand",command)
    }
    render() {
        var _self=this
        var list=[];
        var {downloadList} = this.props.downloader;
        for(var i=0;i<downloadList.length;i++){
            if(this.state.curIndex=='downloaded'&&downloadList[i].status=='downloaded'){
                list.push(downloadList[i])
            }else if(this.state.curIndex=='downloading'&&downloadList[i].status!='downloaded'){
                list.push(downloadList[i])
            }
        }
        console.log("show list "+this.state.curIndex,list)
        var listView = list.map(function (item,index) {
            if(_self.state.curIndex=="downloaded"){
                return (
                    <View key={item._id} style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={{uri:item.thumbnail}} style={{width:60, height:60, marginLeft:10, margin:10}}/>
                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{marginTop:5, fontSize:17}}>{item.title}</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>{item.create_time}</Text>
                        </View>
                    </View>
                )
            }else{
                return(
                    <View key={item._id} style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={{uri:item.thumbnail}} style={{width:60, height:60, marginLeft:10, margin:10}}/>
                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{marginTop:5, fontSize:17}}>{item.title}</Text>
                            <View style={{height:5,width:200}}>
                                <Progress ref={item._id} percent={item.progress ? item.progress:0} position="normal" />
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>_self._changeState(item,index)} style={{marginLeft:30, margin:30}}>
                            <Image source={item.status=="downloading"||item.status=="waiting"?require("../../images/pause.png"):
                                require("../../images/download.png")} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        })
        return (
            <View style={{flexDirection:'column'}}>
                <View style={{backgroundColor:'#5a85d4',height:70,alignItems:'center'}}>
                    <View style={{flexDirection:'row',height:30,width:150,borderRadius:5,borderColor:'white',
                        marginTop:30,borderWidth:2}}>
                        <TouchableOpacity activeOpacity={0.8} style={{flex:1}} onPress={() => _self._selectTab("downloaded")}>
                            <View style={{height:28,alignItems:'center',justifyContent:'center',
                                backgroundColor:_self.state.curIndex=='downloaded' ?'white':'transparent'}}>
                                <Text style={{alignItems:'center',fontSize:20,
                                    color:_self.state.curIndex=='downloaded' ?'#5a85d4':'white'}}>已下载</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{flex:1}}  onPress={() => _self._selectTab("downloading")}>
                            <View style={{height:28,flex:1,alignItems:'center',justifyContent:'center',
                                backgroundColor:_self.state.curIndex=='downloading' ?'white':'transparent'}}>
                                <Text style={{alignItems:'center',fontSize:20,
                                    color:_self.state.curIndex == 'downloading' ?'#5a85d4':'white'}}>正下载</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{}}>
                    {listView}
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    downloader : state.downloader
});
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        updateDownloadList:(downloadList)=>dispatch(downloadAction.updateDownloadList(downloadList))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DownloadPage)