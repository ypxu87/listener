import React, {Component} from 'react';
import { BackHandler,View} from 'react-native'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, NavigationActions} from 'react-navigation';
import Router from './routers/Router.js';
import Video from 'react-native-video'

class AppWithNavigatior extends Component {

    componentDidMount(){
        this.listener = BackHandler.addEventListener('hardwareBackPress',()=>{
            //this.props.dispatch(NavigationActions.navigate({ routeName: 'ProfileScreen' }));
            const routers = this.props.nav.routes;
            if (routers.length > 1) {
                this.props.dispatch(NavigationActions.back())
                return true;
            }
            return false;
        })
    }

    componentWillUnmount(){
        this.listener.remove()
    }

    render() {
        const {dispatch, nav} = this.props;
        return (
            <View style={{width:'100%',height:'100%'}}>
                <Video
                    source={{uri: 'http://yinyueshiting.baidu.com/data2/music/239908cd71a27d737fef95b17d18b97c/540728460/540728460.mp3?xcode=508c0cc9612d89f796a2d3f13bf86a03'}}
                    ref='video'
                    volume={1.0}
                    paused={false}
                    //onProgress={(e) => this.onProgress(e)}
                    //onLoad={(e) => this.onLoad(e)}
                    playInBackground={true}
                />
                <Router navigation={addNavigationHelpers({dispatch: dispatch, state: nav})}/>
            </View>
        );
    }
}

AppWithNavigatior.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigatior);