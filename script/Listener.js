import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/ConfigyreStore'
import AppWithNavigatior from './AppWithNavigator'
import CodePush from "react-native-code-push";
require('./utils/StorageMgr.js')
import {setHttpRequestHeader} from "./network/HttpRequest"

export default class Listener extends Component {
    static store = configureStore();

    render() {
        return (
            <Provider store={Listener.store}>
                <AppWithNavigatior/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('listener', () => Listener);