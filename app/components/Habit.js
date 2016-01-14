import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import ChooseHabitButton from './ChooseHabitButton';

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
    flex: 1,
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10
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
        <Text style={styles.title}>{habit.name}</Text>
        <Text style={styles.paragraph}>{habit.description}</Text>
        <ChooseHabitButton {...this.props}/>
      </View>
    );
  }
}
