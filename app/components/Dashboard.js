import React, {
  StyleSheet,
  Component,
  View,
  Image
} from 'react-native';

import WeekNav from './WeekNav';
import WeekView from './WeekView';
import CenteredText from './CenteredText';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)'
  },
  background: {
    flex: 1,
    paddingTop: 74
  }
});

export default class Dashboard extends Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props;

    if (state && state.plan && state.plan.ok) {
      return (
        <View style={styles.main}>
          <Image
            style={styles.background}
            source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
          >
            <WeekView {...this.props}/>
            <WeekNav {...this.props}/>
          </Image>
        </View>
      );
    }

    if (state && state.plan && state.plan.ok === false) {
      return (
        <View style={styles.main}>
          <Image
            style={styles.background}
            source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
          >
            <CenteredText text="You will recieve an e-mail notification when your coach has reviewed your profile and created your plan."/>
          </Image>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <Image
          style={styles.background}
          source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
        >
          <CenteredText text="Loading your plan..."/>
        </Image>
      </View>
    );
  }
}
