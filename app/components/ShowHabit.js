'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ChooseHabitButton from './ChooseHabitButton';
import NAVBAR_PADDING from '../constants/navbar_padding';

class ShowHabit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { habit } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{habit.name}</Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>{habit.description}</Text>
        </View>
        <ChooseHabitButton {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: NAVBAR_PADDING,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  },
  titleContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  title: {
    color: '#ffffff',
    fontSize: 18
  },
  paragraphContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1
  },
  paragraph: {
    color: '#ffffff'
  }
});

export default ShowHabit
