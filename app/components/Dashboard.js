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
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props;
    let loadingText;

    if (state && state.plan && state.plan.ok && state.habits.all.ok && state.habits.started.ok) {
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

    if (state.habits.started.loading) {
      loadingText = 'Loading your habits...';
    } else if (state.habits.all.loading) {
      loadingText = 'Loading list of available habits...';
    } else if (state.plan.loading) {
      loadingText = 'Loading your plan...';
    }

    return (
      <View style={styles.main}>
        <Image
          style={styles.background}
          source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
        >
          <CenteredText text={loadingText}/>
        </Image>
      </View>
    );
  }
}
