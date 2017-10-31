import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,ScrollView,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {httpRequestAction} from "../actions/HttpRequestAction";
import * as playerAtion from "../actions/PlayerAction";
import {addToDownloadList,updateDownloadList} from '../actions/DownloadAction'

class DetailPage extends Component {
    static navigationOptions = (arg)=>({
        title: '详情',
        header:null
    })
    constructor(props){
        super(props)
        this.info = this.props.navigation.state.params
    }
    componentDidMount(){
        this.props.getDetailData({_id:this.info._id})
    }
    _updateDownloadList(data){
        var {downloadList,updateDownloadList} = this.props
        var index = downloadList.findIndex(function (value,index,arr) {
            return value._id==data._id
        })
        if(index==-1){
            data.status="waiting";
            data.progress=0;
            downloadList.push(data);
            updateDownloadList(downloadList,true)
        }
    }
    _addToPlayer(data){
        this.props.updatePlayerData(data)
        this.props.changePlayerStatus(false)
    }
    render() {
        var {detailData} = this.props
            return (
                detailData ? (
                    <View style={{flexDirection:'column',height:'100%'}}>
                        <ScrollView style={{flex:1}}>
                            <Image source={{uri:detailData.photo}} style={{width:'100%',height:200}}/>
                            <Text style={{textAlign:'center',margin:10,fontWeight:'bold',fontSize:20}}>{detailData.title}</Text>
                            <Text style={{width:'94%',marginLeft:'3%',lineHeight:25}}>
                                {detailData.content}
                            </Text>
                        </ScrollView>
                        <View style={{height:50,width:'100%',backgroundColor:'white',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.props.goBack()} style={{height:'100%',flex:1}}>
                                <Image source={require('../../images/back.png')} style={{height:20,marginTop:15}}/>
                            </TouchableOpacity>
                            <View style={{height:'100%',flex:5,flexDirection:'row'}}>
                                <View style={{marginTop:10,flex:4}}>
                                    <Text>{detailData.title}</Text>
                                    <Text>时长：5 分钟</Text>
                                </View>
                                <TouchableOpacity onPress={()=>this._addToPlayer(detailData)} style={{height:'100%',flex:1}}>
                                    <Image source={require('../../images/play-circle-fill.png')} style={{width:30,height:30,marginTop:10}}></Image>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>this._updateDownloadList(detailData)} style={{height:'100%',flex:1}}>
                                <Image source={require('../../images/download.png')} style={{width:20,height:20,marginTop:15}}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                ):(<View/>)

            );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },

    itemStyle: {
        // 主轴方向
        flexDirection:'row',
        // 下边框
        backgroundColor:'white',
        width:'96%',
        marginLeft:'2%',
        marginRight:'2%',
        borderRadius:3,
        marginTop:5

    },

    imageStyle: {
        // 尺寸
        width:60,
        height:60,
        // 边距
        marginLeft:10,
        margin:10
    },

    subItemStyle: {
        // 对齐方式
        justifyContent:'space-around'
    }
});
const mapStateToProps = state => ({
    detailData  : state.httpRequest.detailData,
    downloadList : state.download.downloadList,
    curPlayData  : state.player.data
})
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch:dispatch,
        goBack: ()=>dispatch( NavigationActions.back() ),
        getDetailData:(config)=>dispatch(httpRequestAction('getDetailData',config,{dataName:'detailData'})),
        updateDownloadList:(downloadList,saveStorage)=>dispatch(updateDownloadList(downloadList,saveStorage)),
        updatePlayerData:(data)=>dispatch(playerAtion.updatePlayerData(data)),
        changePlayerStatus:(status)=>dispatch(playerAtion.changePlayerStatus(status))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)