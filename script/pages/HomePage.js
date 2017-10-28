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
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('../../images/home.png')}
                    style={{
                        width: 20,
                        height: 20,
                        top:-7,
                        tintColor: 'blue'
                    }}
                />
            </View>
        ),
    })
    constructor(props){
        super(props)
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            dataSource:[
                {
                    img:'../../images/1.jpg',
                    title:"test"
                },
                {
                    img:'../../images/2.jpg',
                    title:"test"
                },
                {
                    img:'../../images/3.jpg',
                    title:"test"
                },
                {
                    img:'../../images/4.jpg',
                    title:"test"
                }
            ]
        }
    }
    _gotoDetailPage = (data)=>{
        this.props.navigation.navigate('DetailPage',data)
    }
    _gotoPlayerPage = ()=>{
        this.props.navigation.navigate('PlayerPage',data)
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
        }

        return (
            listData ? (
                <ScrollView >
                    <Carousel
                        autoplay={true}
                        infinite
                        selectedIndex={1}
                        swipeSpeed={35}>
                        {
                            recommendList.map(function (item,index) {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => _self._gotoDetailPage(item)}>
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
                                    <TouchableOpacity key={item._id} onPress={()=>_self._gotoDetailPage(item)}>
                                        <View style={styles.itemStyle}>
                                            <Image source={{uri:item.thumbnail}} style={styles.imageStyle}/>
                                            <View style={styles.subItemStyle}>
                                                <Text style={{marginTop:5, fontSize:17}}>{item.title}</Text>
                                                <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>{item.create_time}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                        })
                    }
                </ScrollView>
            ) :<View/>

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
    listData: state.httpRequest.listDate,
})
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getListDate:(config)=>dispatch(httpRequestAction('getListDate',config,{listName:'listDate'})),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)