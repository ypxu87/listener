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
            isplayBtn:require('../../images/player/play.png'),  //播放/暂停按钮背景图
            imgRotate: new Animated.Value(0),
            trackValue:0
        }
        this.isGoing = false; //为真旋转
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 20000,
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
                    duration: 20000,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1-oneTimeRotate) * 20000,
                    easing: Easing.inOut(Easing.linear),
                });
            });

        }

    };

    changePlageSource(command){
        var _self = this
        var index = this.props.listData.findIndex(function (value,index,arr) {
            return value._id == _self.props.player.data._id
        })
        if(command=="next"){
            if(index<this.props.listData.length-1){
                index = index+1
            }else{
                index = 0;
            }
        }else{
            if(index>0){
                index = index-1
            }else{
                index = this.props.listData.length-1;
            }
        }
        this.props.updatePlayerTrackValue(0)
        this.props.updatePlayerData(this.props.listData[index])

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
            return (
                <View style={styles.container}>

                    <View style = {{position:'absolute',width: width,flexDirection:'column'}}>
                        <Text style={{fontSize:24,width:'100%',textAlign:'center',marginTop:50}}>{curData.title}</Text>
                        <Image source={require('../../images/player/blackRing.png')} style={{width:220,height:220,marginTop:30,alignSelf:'center'}}/>
                        <Animated.Image
                            ref = 'myAnimate'
                            style={{width:140,height:140,marginTop: -180,alignSelf:'center',borderRadius: 140*0.5,transform: [{rotate:spin}]}}
                            source={{uri: curData.thumbnail}}
                        />
                        <View style={styles.playingInfo}>
                            <View style={{marginTop:10}}>
                            </View>
                            <Text style={{marginTop:10}}>{this.props.player.duration? this.props.player.duration:'00:00'}</Text>
                        </View>
                        <Slider
                            ref='slider'
                            style={{ marginLeft: 10, marginRight: 10}}
                            value={this.props.player.trackValue}
                            maximumValue={this.props.player.time}
                            step={1}
                            minimumTrackTintColor='#FFDB42'
                            onValueChange={(value) => {
                                    this.props.updatePlayerTrackValue(value)
                                }
                            }
                            onSlidingComplete={(value) => {
                                DeviceEventEmitter.emit("changePlayeTime",value)
                            }}
                        />
                        {/*歌曲按钮*/}
                        <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={()=>this.changePlageSource("before")}>
                                <Image source={require('../../images/player/previous.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.playAction()}>
                                <Image source={this.state.isplayBtn} style={{width:30,height:30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.changePlageSource("next")}>
                                <Image source={require('../../images/player/next.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{position:"absolute",top:30,left:20}} onPress={()=>this.props.goBack()}>
                        <Image source={require('../../images/back.png')}/>
                    </TouchableOpacity>
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
    player  : state.player,
    listData: state.httpRequest.listDate,
})
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch:dispatch,
        goBack: ()=>dispatch( NavigationActions.back() ),
        changePlayerStatus:(status)=>dispatch(playerAtions.changePlayerStatus(status)),
        updatePlayerData:(data)=>dispatch(playerAtions.updatePlayerData(data)),
        updatePlayerTrackValue:(value)=>dispatch(playerAtions.updatePlayerTrackValue(value))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage)