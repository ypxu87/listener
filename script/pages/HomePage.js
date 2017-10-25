import React, {Component} from 'react';
import {View,Image,ListView,StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Carousel,List} from 'antd-mobile'
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
    _gotoDetailPage = ()=>{
        this.props.navigation.navigate('DetailPage')
    }
    render() {
        return (
            <ScrollView >
                <Carousel
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                    afterChange={index => console.log('slide to', index)}>
                    <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                        <Image
                            source={require('../../images/a.jpg')}
                                style={{width: '100%', height: 200}}
                                />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                        <Image
                            source={require('../../images/b.jpg')}
                            style={{width: '100%', height: 200}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                        <Image
                            source={require('../../images/c.jpg')}
                            style={{width: '100%', height: 200}}
                        />
                    </TouchableOpacity>
                </Carousel>
                <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                    <View style={styles.itemStyle}>
                        <Image source={require("../../images/3.jpg")} style={styles.imageStyle}/>
                        <View style={styles.subItemStyle}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                    <View style={styles.itemStyle}>
                        <Image source={require("../../images/1.jpg")} style={styles.imageStyle}/>
                        <View style={styles.subItemStyle}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                    <View style={styles.itemStyle}>
                        <Image source={require("../../images/2.jpg")} style={styles.imageStyle}/>
                        <View style={styles.subItemStyle}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                    <View style={styles.itemStyle}>
                        <Image source={require("../../images/3.jpg")} style={styles.imageStyle}/>
                        <View style={styles.subItemStyle}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._gotoDetailPage()}>
                    <View style={styles.itemStyle}>
                        <Image source={require("../../images/4.jpg")} style={styles.imageStyle}/>
                        <View style={styles.subItemStyle}>
                            <Text style={{marginTop:5, fontSize:17}}>这是一篇好文章</Text>
                            <Text style={{marginBottom:5, fontSize:13, color:'gray'}}>简介：这篇文章主要是描述xxxxxxx</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch
    }
}
export default connect(null,mapDispatchToProps)(HomePage)