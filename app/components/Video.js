import React, {
  StyleSheet,
  Component
} from 'react-native';

import WebViewVideo from './WebViewVideo';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    position: 'absolute',
    top: 64, 
    left: 0, 
    right: 0, 
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebViewVideo style={styles.video} url={this.props.exercise.videoLink}/>
    );
  }
}
