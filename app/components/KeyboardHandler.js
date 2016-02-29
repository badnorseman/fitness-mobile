// Adapted from:
// https://github.com/facebook/react-native/issues/3309
/**
 * Handle resizing enclosed View and scrolling to input
 * Usage:
 *    <KeyboardHandler ref='kh' offset={50}>
 *      <View>
 *        ...
 *        <TextInput ref='username'
 *          onFocus={()=>this.refs.kh.inputFocused(this,'username')}/>
 *        ...
 *      </View>
 *    </KeyboardHandler>
 *
 *  offset is optional and defaults to 34
 *  Any other specified props will be passed on to ScrollView
 */
import React, { DeviceEventEmitter, ScrollView, View } from 'react-native';

const myprops = { offset: 34 };

export default React.createClass({
  propTypes: {
    offset: React.PropTypes.number
  },

  getDefaultProps() {
    return myprops;
  },

  getInitialState() {
    this.scrollviewProps = {
      automaticallyAdjustContentInsets: true,
      scrollEventThrottle: 200
    };

    // pass on any props we don't own to ScrollView
    Object.keys(this.props).filter((n) => { return n !='children' }).forEach((e) => {
      if (!myprops[e]) this.scrollviewProps[e] = this.props[e];
    });

    return {
      keyboardSpace: 0
    };
  },

  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardDidShow', (frames) => {
      if (!frames.endCoordinates) return;
      this.setState({ keyboardSpace: frames.endCoordinates.height });
    });

    DeviceEventEmitter.addListener('keyboardWillHide', () => {
      this.setState({ keyboardSpace: 0 });
    });
  },

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('keyboardDidShow');
    DeviceEventEmitter.removeAllListeners('keyboardWillHide');
  },

  inputFocused(_this, refName) {
    setTimeout(() => {
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(_this.refs[refName]),
        this.props.offset,
        true
      );
    }, 50);
  },


  render() {
    return (
      <ScrollView ref="scrollView" {...this.scrollviewProps}>
        {this.props.children}
        <View style={{ height: this.state.keyboardSpace }}></View>
      </ScrollView>
    );
  }
});
