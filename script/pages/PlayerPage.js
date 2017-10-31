import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import * as playerAtions  from '../actions/PlayerAction'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ListView,
    ActivityIndicator,
    Animated,
    Easing,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native'
import {connect} from 'react-redux';
var {width,height} = Dimensions.get('window');
var lyrObj = []   // 存放歌词
var myAnimate;

class PlayerPage extends Component {
    static navigationOptions = (arg)=>({
        title: '播放',
        header:null
    })

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            songs: [],   //歌曲id数据源
            playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            btnModel:require('../../images/player/列表循环.png'), //播放模式按钮背景图
            pic_small:'',    //小图
            pic_big:'',      //大图
            file_duration:0,    //歌曲长度
            song_id:'',     //歌曲id
            title:'',       //歌曲名字
            author:'',      //歌曲作者
            file_link:'',   //歌曲播放链接
            songLyr:[],     //当前歌词
            sliderValue: 0,    //Slide的value
            pause:false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex:0,    //当前第几首
            isplayBtn:require('../../images/player/play.png'),  //播放/暂停按钮背景图
            imgRotate: new Animated.Value(0),
        }
        this.isGoing = false; //为真旋转
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear),
        });

    }
    imgMoving = () => {

        if (this.isGoing) {
            this.state.imgRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            })
        }

    };

    stop = () => {
        if (this.props.player.status) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1-oneTimeRotate) * 6000,
                    easing: Easing.inOut(Easing.linear),
                });
            });

        }

    };
    //上一曲
    prevAction = (index) =>{
        this.recover()
        lyrObj = [];
        if(index == -1){
            index = this.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        }
        this.setState({
            currentIndex:index  //更新数据
        })
        this.loadSongInfo(index)  //加载数据
    }
    //下一曲
    nextAction = (index) =>{
        this.recover()
        lyrObj = [];
        if(index == 10){
            index = 0 //如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex:index,  //更新数据
        })
        this.loadSongInfo(index)   //加载数据
    }
    //换歌时恢复进度条 和起始时间
    recover = () =>{
        this.setState({
            sliderValue:0,
            currentTime: 0.0
        })
    }
    //播放模式 接收传过来的当前播放模式 this.state.playModel
    playModel = (playModel) =>{
        playModel++;
        playModel = playModel == 4 ? 1 : playModel
        //重新设置
        this.setState({
            playModel:playModel
        })
        //根据设置后的模式重新设置背景图片
        if(playModel == 1){
            this.setState({
                btnModel:require('../../images/player/列表循环.png'),
            })
        }else if(playModel ==  2){
            this.setState({
                btnModel:require('../../images/player/随机.png'),
            })
        }else{
            this.setState({
                btnModel:require('../../images/player/单曲循环.png'),
            })
        }
    }
    //播放/暂停
    playAction =() => {
        this.stop()
        this.props.changePlayerStatus(!this.props.player.status)
        //判断按钮显示什么
        if(this.props.player.status == true){
            this.setState({
                isplayBtn:require('../../images/player/play.png')
            })
        }else {
            this.setState({
                isplayBtn:require('../../images/player/stop.png')
            })
        }

    }


    componentDidMount() {
        this.spin()
    }

    //旋转动画
    spin () {
        this.spinValue.setValue(0)
        myAnimate = Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear
            }
        ).start(() => this.spin())

    }

    render() {
        //如果未加载出来数据 就一直转菊花
        if (!this.props.player.data) {
            return(
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}
                    size="large" />
            )
        }else{
            const spin = this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
            var curData = this.props.player.data
            //数据加载出来
            return (
                <View style={styles.container}>

                    <View style = {{position:'absolute',width: width,flexDirection:'column'}}>
                        {/*作者-歌名*/}
                        <Text style={{fontSize:24,width:'100%',textAlign:'center',marginTop:50}}>{curData.title}</Text>
                        {/*胶片光盘*/}
                        <Image source={require('../../images/player/blackRing.png')} style={{width:220,height:220,marginTop:30,alignSelf:'center'}}/>

                        {/*旋转小图*/}
                        <Animated.Image
                            ref = 'myAnimate'
                            style={{width:140,height:140,marginTop: -180,alignSelf:'center',borderRadius: 140*0.5,transform: [{rotate:spin}]}}
                            source={{uri: curData.thumbnail}}
                        />
                        {/*歌曲信息*/}
                        <View style={styles.playingInfo}>
                            <TouchableOpacity onPress={()=>this.playModel(this.state.playModel)} style={{marginTop:10}}>
                                <Image source={this.state.btnModel} style={{width:20,height:20}}/>
                            </TouchableOpacity>
                            {/*时间*/}
                            <Text style={{marginTop:10}}>{this.props.player.duration? this.props.player.duration:'00:00'}</Text>
                        </View>
                        {/*进度条*/}
                        <Slider
                            ref='slider'
                            style={{ marginLeft: 10, marginRight: 10}}
                            value={this.props.player.trackValue}
                            maximumValue={this.props.player.time}
                            step={1}
                            minimumTrackTintColor='#FFDB42'
                            onValueChange={(value) => {
                                this.setState({
                                    currentTime:value
                                })
                            }
                            }
                            onSlidingComplete={(value) => {
                                this.refs.video.seek(value)
                            }}
                        />
                        {/*歌曲按钮*/}
                        <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={()=>this.prevAction(this.state.currentIndex - 1)}>
                                <Image source={require('../../images/player/上一首.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.playAction()}>
                                <Image source={this.state.isplayBtn} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.nextAction(this.state.currentIndex + 1)}>
                                <Image source={require('../../images/player/下一首.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>
                        </View>
                        {/*<ScrollView style={{marginTop:20,backgroundColor:'white',width:'94%',height:200,borderRadius:4,marginLeft:'3%'}}>*/}
                                {/*<View style={{width:'94%',height:30,marginLeft:'3%',flexDirection:'row',marginTop:5}}>*/}
                                    {/*<TouchableOpacity style={{flex:8}}>*/}
                                        {/*<Text style={{marginLeft:10,marginTop:5,color:'#5a85d4',flex:1}}>赵雷-成都</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                    {/*<TouchableOpacity  style={{flex:1}}>*/}
                                        {/*<Image source={require('../../images/downloadActivity.png')} style={{height:15,width:15,marginTop:5,}}/>*/}
                                    {/*</TouchableOpacity>*/}
                                {/*</View>*/}
                                {/*<View  style={{width:'94%',height:1,marginLeft:'3%',backgroundColor:'grey'}}/>*/}
                            {/*<View style={{width:'94%',height:30,marginLeft:'3%',flexDirection:'row',marginTop:5}}>*/}
                                {/*<TouchableOpacity style={{flex:8}}>*/}
                                    {/*<Text style={{marginLeft:10,marginTop:5,color:'#5a85d4',flex:1}}>赵雷-成都</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<TouchableOpacity  style={{flex:1}}>*/}
                                    {/*<Image source={require('../../images/downloadActivity.png')} style={{height:15,width:15,marginTop:5,}}/>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                            {/*<View  style={{width:'94%',height:1,marginLeft:'3%',backgroundColor:'grey'}}/><View style={{width:'94%',height:30,marginLeft:'3%',flexDirection:'row',marginTop:5}}>*/}
                            {/*<TouchableOpacity style={{flex:8}}>*/}
                                {/*<Text style={{marginLeft:10,marginTop:5,color:'#5a85d4',flex:1}}>赵雷-成都</Text>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity  style={{flex:1}}>*/}
                                {/*<Image source={require('../../images/downloadActivity.png')} style={{height:15,width:15,marginTop:5,}}/>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                            {/*<View  style={{width:'94%',height:1,marginLeft:'3%',backgroundColor:'grey'}}/><View style={{width:'94%',height:30,marginLeft:'3%',flexDirection:'row',marginTop:5}}>*/}
                            {/*<TouchableOpacity style={{flex:8}}>*/}
                                {/*<Text style={{marginLeft:10,marginTop:5,color:'#5a85d4',flex:1}}>赵雷-成都</Text>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity  style={{flex:1}}>*/}
                                {/*<Image source={require('../../images/downloadActivity.png')} style={{height:15,width:15,marginTop:5,}}/>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                            {/*<View  style={{width:'94%',height:1,marginLeft:'3%',backgroundColor:'grey'}}/><View style={{width:'94%',height:30,marginLeft:'3%',flexDirection:'row',marginTop:5}}>*/}
                            {/*<TouchableOpacity style={{flex:8}}>*/}
                                {/*<Text style={{marginLeft:10,marginTop:5,color:'#5a85d4',flex:1}}>赵雷-成都</Text>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity  style={{flex:1}}>*/}
                                {/*<Image source={require('../../images/downloadActivity.png')} style={{height:15,width:15,marginTop:5,}}/>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                            {/*<View  style={{width:'94%',height:1,marginLeft:'3%',backgroundColor:'grey'}}/>*/}

                        {/*</ScrollView>*/}
                    </View>
                </View>
            )
        }

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    playingInfo: {
        flexDirection: 'row',
        alignItems:'stretch',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255,255,255,0.0)'
    },
    text: {
        color: "black",
        fontSize: 22
    },
    modal: {
        height: 300,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 50
    },
    itemStyle: {
        paddingTop: 20,
        height:25,
        backgroundColor:'rgba(255,255,255,0.0)',
    }
})
const mapStateToProps = state => ({
    player  : state.player
})
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch:dispatch,
        goBack: ()=>dispatch( NavigationActions.back() ),
        changePlayerStatus:(status)=>dispatch(playerAtions.changePlayerStatus(status))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage)