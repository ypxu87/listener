import React, {Component} from 'react';
import {View,Image} from 'react-native';
import {connect} from 'react-redux';

class DownloadPage extends Component {
    static navigationOptions = (arg)=>({
        title: '下载',
        header:null,
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('../../images/download.png')}
                    style={{
                        width: 20,
                        height: 20,
                        top:-7,
                    }}
                />
            </View>
        ),
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
export default connect(null,mapDispatchToProps)(DownloadPage)