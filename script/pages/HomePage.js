import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class HomePage extends Component {
    static navigationOptions = (arg)=>({
        title: '发现',
    })
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View >

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch
    }
}
export default connect(null,mapDispatchToProps)(HomePage)