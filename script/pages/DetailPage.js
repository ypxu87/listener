import React, {Component} from 'react';
import {View,Image,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class DetailPage extends Component {
    static navigationOptions = (arg)=>({
        title: '详情',
        header:null
    })
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{flexDirection:'column',height:'100%'}}>
                <ScrollView style={{flex:1}}>
                    <Image source={require("../../images/b.jpg")} style={{width:'100%',height:200}}/>
                    <Text style={{textAlign:'center',margin:10,fontWeight:'bold',fontSize:20}}>李开复：时间管理的五个方法</Text>
                    <Text style={{width:'94%',marginLeft:'3%',lineHeight:25}}>React Native 是最近非常火的一个话题，介绍如何利用 React Native 进行开发的文章和书籍多如牛毛，但面向入门水平并介绍它工作原理的文章却寥寥无几。

                        本文分为两个部分：上半部分用通俗的语言解释了相关的名词，重点介绍 React Native 出现的背景和试图解决的问题。适合新手对 React Native 形成初步了解。(事实证明，女票能看懂这段）

                        下半部分则通过源码（0.27 版本）分析 React Native 的工作原理，适合深入学习理解 React Native 的运行机制。最后则是我个人对 React Native 的分析与前景判断。
                        由于 AppStore 审核周期的限制，如何动态的更改 app 成为了永恒的话题。无论采用何种方式，我们的流程总是可以归结为以下三部曲：“从 Server 获取配置 --> 解析 --> 执行native代码”。

                        很多时候，我们自觉或者不自觉的利用 JSON 文件实现动态配置的效果，它的核心流程是：

                        通过 HTTP 请求获取 JSON 格式的配置文件。
                        配置文件中标记了每一个元素的属性，比如位置，颜色，图片 URL 等。
                        解析完 JSON 后，我们调用 Objective-C 的代码，完成 UI 控件的渲染。
                        通过这种方法，我们实现了在后台配置 app 的展示样式。从本质上来说，移动端和服务端约定了一套协议，但是协议内容严重依赖于应用内要展示的内容，不利于拓展。也就是说，如果业务要求频繁的增加或修改页面，这套协议很难应付。

                        最重要的是，JSON 只是一种数据交换的格式，说白了，我们就是在解析文本数据。这就意味着它只适合提供一些配置信息，而不方便提供逻辑信息。举个例子，我们从后台可以配置颜色，位置等信息，但如果想要控制 app 内的业务逻辑，就非常复杂了。

                        记住，我们只是在解析字符串，它完全不具备运行和调试的能力。

                        作者：bestswifter
                        链接：http://www.jianshu.com/p/978c4bd3a759
                        來源：简书
                        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

                    </Text>
                </ScrollView>
                <View style={{height:50,width:'100%',backgroundColor:'white',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>this.props.goBack()} style={{height:'100%',flex:1}}>
                        <Image source={require('../../images/back.png')} style={{height:20,marginTop:15}}/>
                    </TouchableOpacity>
                    <View style={{height:'100%',flex:5,flexDirection:'row'}}>
                        <View style={{marginTop:10,flex:4}}>
                            <Text>李开复：时间管理的五个方法</Text>
                            <Text>时长：5 分钟</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.goBack()} style={{height:'100%',flex:1}}>
                            <Image source={require('../../images/play-circle-fill.png')} style={{width:30,height:30,marginTop:10}}></Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.goBack()} style={{height:'100%',flex:1}}>
                        <Image source={require('../../images/download.png')} style={{width:20,height:20,marginTop:15}}></Image>
                    </TouchableOpacity>
                </View>
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
        dispatch:dispatch,
        goBack: ()=>dispatch( NavigationActions.back() ),
    }
}
export default connect(null,mapDispatchToProps)(DetailPage)