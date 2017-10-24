import React, {Component} from 'react';
import {View,Image,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class DetailPage extends Component {
    static navigationOptions = (arg)=>({
        title: '详情',
    })
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View >
                <Image source={require("../../images/1.jpg")} style={{width:200,height:200,margin:'auto'}}/>
                <Text style={{textAlign:'center',margin:10,fontWeight:'bold',fontSize:20}}>这是一篇好文章</Text>
                <Text style={{width:'96%',marginLeft:'2%'}}>React Native 是最近非常火的一个话题，介绍如何利用 React Native 进行开发的文章和书籍多如牛毛，但面向入门水平并介绍它工作原理的文章却寥寥无几。

                    本文分为两个部分：上半部分用通俗的语言解释了相关的名词，重点介绍 React Native 出现的背景和试图解决的问题。适合新手对 React Native 形成初步了解。(事实证明，女票能看懂这段）

                    下半部分则通过源码（0.27 版本）分析 React Native 的工作原理，适合深入学习理解 React Native 的运行机制。最后则是我个人对 React Native 的分析与前景判断。

                    作者：bestswifter
                    </Text>

            </View>
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
export default connect(null,mapDispatchToProps)(DetailPage)