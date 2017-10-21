import React, {Component} from 'react';
import { BackHandler} from 'react-native'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, NavigationActions} from 'react-navigation';
import Router from './routers/Router.js';

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
        return (<Router navigation={addNavigationHelpers({dispatch: dispatch, state: nav})}/>);
    }
}

AppWithNavigatior.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigatior);