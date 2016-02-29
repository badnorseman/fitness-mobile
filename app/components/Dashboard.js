import React, { Component, Image, StyleSheet, View } from 'react-native';
import WeekNav from './WeekNav';
import WeekView from './WeekView';
import CenteredText from './CenteredText';

const styles = StyleSheet.create({
  container: {
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

  render() {
    const { state } = this.props;
    let loadingText;

    if (state && state.plan && state.plan.ok && state.habit.all.ok && state.habit.started.ok) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.background}
            source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
          >
            <WeekView {...this.props} />
            <WeekNav {...this.props} />
          </Image>
        </View>
      );
    }

    if (state && state.plan && state.plan.ok === false) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.background}
            source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
          >
            <CenteredText text="You will recieve an email notification when your coach has reviewed your profile and created your plan." />
          </Image>
        </View>
      );
    }

    if (state.habit.started.loading) {
      loadingText = 'Loading your habits...';
    } else if (state.habit.all.loading) {
      loadingText = 'Loading available habits...';
    } else if (state.plan.loading) {
      loadingText = 'Loading your workouts...';
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
        >
          <CenteredText text={loadingText} />
        </Image>
      </View>
    );
  }
}
