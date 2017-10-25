import React, {Component} from 'react';
import {View,Image,Text,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import { Progress, Button} from 'antd-mobile';
class DownloadPage extends Component {
    static navigationOptions = (arg)=>({
        title: '下载',
        header:()=>(
            <View style={{backgroundColor:'#5a85d4',height:70,alignItems:'center', }}>
                <View style={{flexDirection:'row',height:30,width:150,borderRadius:5,borderColor:'white',
                    marginTop:30,borderWidth:2}}>
                    <Text style={{lineHeight:30,alignItems:'center',fontSize:20,color:'#5a85d4',flex:1,backgroundColor:'white'}}>已下载</Text>
                    <Text style={{lineHeight:30,alignItems:'center',fontSize:20,color:'white',flex:1}}>正下载</Text>
                </View>
            </View>),
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
            <ScrollView >
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
                        <View style={{height:5,width:200}}>
                            <Progress percent={50} position="normal" />
                        </View>
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
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch
    }
}
export default connect(null,mapDispatchToProps)(DownloadPage)