import React, { Component, PropTypes } from 'react'
import { WebView } from 'react-native'

class PaymentWebView extends Component {

    static propTypes = {
        url: PropTypes.string,
        resultUrl: PropTypes.string,
        onResult: PropTypes.func,
        onCancel: PropTypes.func
    }

    render(){
        return (
            <WebView 
                source={{uri: {url}}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
        )
    }

    _onNavigationStateChange(event){
        console.log('>>>>>',event)
    }
} 

export default PaymentWebView