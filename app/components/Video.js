import React, {
  StyleSheet,
  Component
} from 'react-native';

import VideoPlayer from 'react-native-videoplayer';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    position: 'absolute',
    top: 64, left: 0, right: 0, bottom: 0,
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
      <VideoPlayer style={styles.video} url="http://stream.flowplayer.org/functional.mp4"/>
    );
  }
}
