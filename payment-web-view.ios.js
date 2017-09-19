import React, { Component, PropTypes } from 'react'
import { requireNativeComponent, View, StyleSheet, findNodeHandle } from 'react-native'

const WEB_VIEW_STATE = {
    IDLE: 1,
    LOADING: 2,
    ERROR: 4
}

const RCT_WEBVIEW_REF = 'webview'

class PaymentWebView extends Component {

    static propTypes = {
        url: PropTypes.string,
        resultUrl: PropTypes.string,
        onResult: PropTypes.func,
        onCancel: PropTypes.func
    }

    constructor(props){
        super(props)

        this.state = {
            viewState: WEB_VIEW_STATE.IDLE,
        }
    }

    render(){
        const scrollEnabled = true

        const webView = <RCTWKWebView
            ref={RCT_WEBVIEW_REF}
            key="webViewKey"
            style={[styles.container, styles.webView]}
            source={this.props.source}
            injectedJavaScript={false}
            bounces={false}
            scrollEnabled={scrollEnabled}
            allowsBackForwardNavigationGestures={false}
            automaticallyAdjustContentInsets={true}
            openNewWindowInWebView={false}
            onLoadingStart={this._onLoadingStart}
            onLoadingFinish={this._onLoadingFinish}
            onLoadingError={this._onLoadingError}
            onProgress={this._onProgress}
            onMessage={this._onMessage}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            pagingEnabled={false}
        />
        return (
            <View style={styles.container} >
                {webView}
            </View>
        )
    }

    getWebViewHandle() {
        return findNodeHandle(this.refs[RCT_WEBVIEW_REF]);
    }

    _onLoadingStart(event) {
        const { onLoadStart } = this.props

        onLoadStart && onLoadStart(event)
        this._updateNavigationState(event)
    }

    _onLoadingError(event) {
        event.persist() // persist this event because we need to store it
        const { onError, onLoadEnd } = this.props
        onError && onError(event)
        onLoadEnd && onLoadEnd(event)
        console.warn('Encountered an error loading page', event.nativeEvent)

        this.setState({
            lastErrorEvent: event.nativeEvent,
            viewState: WEB_VIEW_STATE.ERROR
        })
    }

    _onLoadingFinish(event) {
        const { onLoad, onLoadEnd } = this.props
        onLoad && onLoad(event)
        onLoadEnd && onLoadEnd(event) 
        
        this.setState({
            viewState: WEB_VIEW_STATE.IDLE
        })
        this._updateNavigationState(event)
    }

    _onProgress(event) {
        const { onProgress } = this.props
        onProgress && onProgress(event.nativeEvent.progress)
    }

    _updateNavigationState(event){
        const { onNavigationStateChange } = this.props
        console.log('--->',event)
        onNavigationStateChange && onNavigationStateChange(event.nativeEvent)
    }
}

const RCTWKWebView = requireNativeComponent('RCTWKWebView', PaymentWebView, {

    nativeOnly: {
        onLoadingStart: true,
        onLoadingError: true,
        onLoadingFinish: true,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        backgroundColor: '#f0f0f0',
    }
})

export default PaymentWebView
