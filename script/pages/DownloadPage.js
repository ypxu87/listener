import React, {Component} from 'react';
import {View,Image,Text,ScrollView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { Progress, Button} from 'antd-mobile';
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
    }
    render() {
        return (
            <View style={{flexDirection:'column'}}>
                <View style={{backgroundColor:'#5a85d4',height:70,alignItems:'center'}}>
                    <View style={{flexDirection:'row',height:30,width:150,borderRadius:5,borderColor:'white',
                        marginTop:30,borderWidth:2}}>
                        <TouchableOpacity style={{flex:1}}>
                            <View style={{height:28,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{alignItems:'center',fontSize:20,color:'#5a85d4'}}>已下载</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}}>
                            <View style={{height:28,flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{alignItems:'center',fontSize:20,color:'white'}}>正下载</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10}}/>
                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <View style={{height:5,width:200}}>
                                <Progress percent={50} position="normal" />
                            </View>
                        </View>
                        <Image source={require("../../images/pause.png")} style={{width:30, height:30, marginLeft:30, margin:30}}/>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10}}/>
                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <View style={{height:5,width:200}}>
                                <Progress percent={60} position="normal" />
                            </View>
                        </View>
                        <Image source={require("../../images/downloadActivity.png")} style={{width:30, height:30, marginLeft:30, margin:30}}/>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10
                        }}/>
                        <View style={{justifyContent:'space-around'
                        }}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10
                        }}/>
                        <View style={{justifyContent:'space-around'
                        }}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View><View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                    <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10
                    }}/>
                    <View style={{justifyContent:'space-around'
                    }}>
                        <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                        <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', width:'96%', marginLeft:'2%', marginRight:'2%', borderRadius:3, marginTop:5}}>
                        <Image source={require("../../images/3.jpg")} style={{width:60, height:60, marginLeft:10, margin:10
                        }}/>
                        <View style={{justifyContent:'space-around'
                        }}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch
    }
}
export default connect(null,mapDispatchToProps)(DownloadPage)