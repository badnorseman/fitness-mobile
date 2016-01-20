import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import ChooseHabitButton from './ChooseHabitButton';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  main: {
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

export default class Habit extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { habit } = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.titleContainer}><Text style={styles.title}>{habit.name}</Text></View>
        <View style={styles.paragraphContainer}><Text style={styles.paragraph}>{habit.description}</Text></View>
        <ChooseHabitButton {...this.props}/>
      </View>
    );
  }
}
