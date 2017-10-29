import React, {Component} from 'react';
import {View,Image,Text,ScrollView,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import { Progress, Button} from 'antd-mobile';
import RNFS from 'react-native-fs';
import {addToDownloadList,updateDownloadList} from '../actions/DownloadAction'
class DownloadPage extends Component {
    static navigationOptions = (arg)=>({
        title: '下载',
        header: null,
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('../../images/download.png')}
                    style={{
                        width: 20,
                        height: 20,
                        top:-7,
                    }}
                />
            </View>
        ),
    })
    constructor(props){
        super(props)
        this.state={
            curIndex:'downloaded'
        }
    }
    componentDidMount(){

    }
    _selectTab(tabName){
        this.setState({
            curIndex:tabName
        })
    }
    _changeState(data){
        var command = null
        if(data.status=="downloading"||data.status=="waiting"){
            command = {
                _id:data._id,
                jobId:data.jobId,
                status:"pause"
            }
        }else{
            command = {
                _id:data._id,
                jobId:data.jobId,
                status:"waiting"
            }
        }
        DeviceEventEmitter.emit("downloadCommand",command)
    }
    render() {
        var _self=this
        var list=[];
        var {downloadList} = this.props;
        for(var i=0;i<downloadList.length;i++){
            if(this.state.curIndex=='downloaded'&&downloadList[i].status=='downloaded'){
                list.push(downloadList[i])
            }else if(this.state.curIndex=='downloading'&&downloadList[i].status!='downloaded'){
                list.push(downloadList[i])
            }
        }
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
                                <Progress percent={item.progress ? item.progress:0} position="normal" />
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>_self._changeState(item)} style={{marginLeft:30, margin:30}}>
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
                        <TouchableOpacity style={{flex:1}} onPress={() => _self._selectTab("downloaded")}>
                            <View style={{height:28,alignItems:'center',justifyContent:'center',
                                backgroundColor:_self.state.curIndex=='downloaded' ?'white':'transparent'}}>
                                <Text style={{alignItems:'center',fontSize:20,
                                    color:_self.state.curIndex=='downloaded' ?'#5a85d4':'white'}}>已下载</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}}  onPress={() => _self._selectTab("downloading")}>
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
    downloadList : state.download.downloadList
});
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        updateDownloadList:(downloadList,saveStorage)=>dispatch(updateDownloadList(downloadList,saveStorage))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DownloadPage)