import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import HabitsList from './HabitsList';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  paragraph: {
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15
  }
});

export default class Habits extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>It’s time to choose a habit</Text>
        <Text style={styles.paragraph}>Good habits are the key to long term success regardless what your goal is. Pick one of the habits below to do daily for the next two weeks. Start with something you’re certain you can do and build on it.</Text>
        <HabitsList {...this.props}/>
      </View>
    );
  }
}
