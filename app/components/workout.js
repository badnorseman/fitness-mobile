import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import ExercisesList from './exerciseslist';
import EndWorkout from './endworkout';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  }
});

export default class Workout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const exercises = [
      {
        name: 'Bench Press (Test)',
        active: true
      },
      {
        name: 'Pull Ups (Wide Grip)'
      },
      {
        name: 'Shoulder Press (Test)'
      }
    ];

    return (
      <View style={styles.main}>
        <ExercisesList {...this.props} exercises={exercises}/>
        <EndWorkout/>
      </View>
    );
  }
}
