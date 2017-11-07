import React, {Component} from 'react';
import {View,Image,ListView,StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Carousel,List} from 'antd-mobile'
import {httpRequestAction} from "../actions/HttpRequestAction";
const Item = List.Item;
const Brief = Item.Brief;
class HomePage extends Component {
    static navigationOptions = (arg)=>({
        title: '发现',
        header:null,
        tabBarIcon: ({tintColor}) => (<Image source={require('../../images/home.png')} style={{
            tintColor: tintColor
        }}/>
        ),
    })
    constructor(props){
        super(props)
    }
    _gotoDetailPage = (data)=>{
        this.props.navigation.navigate('DetailPage',data)
    }
    _gotoPlayerPage = ()=>{
        this.props.navigation.navigate('PlayerPage')
    }
    componentDidMount(){
        this.props.getListDate({type:'all'})
    }
    render() {
        var _self = this;
        var {listData} = this.props;
        console.log("listData",listData)
        var recommendList = new Array();
        var hotspotList = new Array();
        if(listData){
            for(var i=0;i<listData.length;i++){
                if(listData[i].type=="recommend"){
                    recommendList.push(listData[i])
                }else if(listData[i].type=="hotspot"){
                    hotspotList.push(listData[i])
                }
            }
            if(!this.props.player.data) {
                this.props.player.data = listData[0]
            }

        }

        return (
            listData ? (
                <View style={{width:'100%',height:'100%'}}>
                    <ScrollView>
                        <Carousel
                            autoplay={true}
                            infinite
                            selectedIndex={1}
                            swipeSpeed={35}>
                            {
                                recommendList.map(function (item,index) {
                                        return (
                                            <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => _self._gotoDetailPage(item)}>
                                                <Image
                                                    source={{uri: item.photo}}
                                                    style={{width: '100%', height: 200}}
                                                />
                                                <Text style={{position:"absolute",bottom:30,fontSize:20,color:'white',
                                                    backgroundColor:'transparent',left:10,fontWeight:'bold'}}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                })
                            }
                        </Carousel>
                        {
                            hotspotList.map(function (item,index) {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} key={item._id} onPress={()=>_self._gotoDetailPage(item)}>
                                            <View style={styles.itemStyle}>
                                                <Image source={{uri:item.thumbnail}} style={styles.imageStyle}/>
                                                <View style={styles.subItemStyle}>
                                                    <Text style={{marginTop:5, fontSize:17}}>{item.title}</Text>
                                                    <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>{item.create_time.substring(0,10)}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.9} style={{position:'absolute',width:'100%',bottom:_self.props.player.data ? 0:-50}} onPress={()=>_self._gotoPlayerPage()}>
                        <View style={{width:"100%",height:50,backgroundColor:"#d9ddea",flexDirection:'row'}}>
                                <Image source={{uri:this.props.player.data.thumbnail}} style={{width:35,height:35,borderRadius:3,marginTop:7,marginLeft:15}}/>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{marginLeft:15,marginTop:3,fontSize:16}}>{this.props.player.data.title}</Text>
                                <Text style={{marginLeft:15,marginTop:2,fontSize:10}}>{this.props.player.data.create_time.substring(0,10)}</Text>
                            </View>
                            <Image style={{position:"absolute",width:30,height:30,right:20,top:10}} source={require('../../images/rightbutton.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            ) :<View/>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    itemStyle: {
        flexDirection:'row',
        backgroundColor:'white',
        width:'96%',
        marginLeft:'2%',
        marginRight:'2%',
        borderRadius:3,
        marginTop:5

    },

    imageStyle: {
        width:60,
        height:60,
        marginLeft:10,
        margin:10
    },

    subItemStyle: {
        justifyContent:'space-around'
    }
});
const mapStateToProps = state => ({
    listData: state.httpRequest.listDate,
    player  : state.player
})
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getListDate:(config)=>dispatch(httpRequestAction('getListDate',config,{listName:'listDate'})),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)