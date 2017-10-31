import {TabNavigator} from 'react-navigation';
import React from 'react';

import HomePage from './HomePage';
import DownloadPage from './DownloadPage';
const MainPage = TabNavigator({
        HomePage: {
            screen: HomePage
        },
        DownloadPage: {
            screen: DownloadPage
        }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled:true,
        lazy:true,
        tabBarOptions:{
            showIcon: true,
            style: {
                backgroundColor: 'white',
            },
            tabStyle:{
                padding: 5
            },
            labelStyle:{margin:0},
            inactiveTintColor: 'gray',
            activeTintColor: '#385fdd',
            indicatorStyle:{ height: 0 },
        }
    }
);

export default MainPage;