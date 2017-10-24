import { Animated, Easing, Platform } from 'react-native';
import { StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import MainPage from '../pages/MainPage.js'
import DetailPage from "../pages/DetailPage";

const Router = StackNavigator({
    MainPage: {screen: MainPage},
    DetailPage:{screen: DetailPage}
},{
    //导航视觉效果
    navigationOptions:{
        gesturesEnabled:true// 允许滑动返回
    },
    transitionConfig:()=>({// 返回的动画全改成水平移动
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        transitionSpec: {
            duration: 500,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
        },
    })
});

export default Router;