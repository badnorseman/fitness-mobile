import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import getDayName from '../utils/getDayName';

const styles = StyleSheet.create({
  main: {
    height: 60,
    backgroundColor: 'rgba(49, 53, 67, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 1
  },
  touchable: {
    alignSelf: 'stretch'
  },
  inProgress: {
    backgroundColor: 'rgba(115, 170, 133, 1)'
  },
  completed: {
    backgroundColor: 'rgba(58, 153, 89, 1)'
  },
  next: {
    backgroundColor: 'rgba(58, 77, 153, 1)'
  },
  firstLine: {
    color: 'rgba(192, 192, 195, 1)',
    fontWeight: 'bold'
  },
  firstLineInProgress: {
    color: 'white'
  },
  firstLineCompleted: {
    color: 'white'
  },
  secondLine: {
    color: 'white'
  }
});

export default class WorkoutButton extends Component {
  static propTypes = {
    state: React.PropTypes.object,
    workout: React.PropTypes.object,
    workoutNum: React.PropTypes.number,
    navigator: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { state, workout, workoutNum, navigator } = this.props;
    const plan = state.plan.data;
    const buttonStyles = [styles.main];
    const firstLineStyles = [styles.firstLine];
    let secondLine;
    let label = `Workout ${workoutNum}`;

    if (workout.endDT) {
      buttonStyles.push(styles.completed);
      firstLineStyles.push(styles.firstLineCompleted);
      label = getDayName(new Date(workout.startDT));
    } else if (workout.startDT && workout.id === plan.activeWorkoutId) {
      buttonStyles.push(styles.inProgress);
      firstLineStyles.push(styles.firstLineInProgress);
      secondLine = (<Text style={styles.secondLine}>Tap to resume</Text>);
      label = 'Workout in progress';
    } else if (workout.id === plan.nextWorkoutId) {
      buttonStyles.push(styles.next);
    }

    return (
      <TouchableOpacity style={styles.touchable} onPress={() => navigator.push({ id: 'workout', title: `Workout ${workoutNum}`, props: { workout: workout, workoutNum: workoutNum } })}>
        <View style={buttonStyles}>
          <Text style={[styles.firstLine, styles.firstLineCompleted]}>{label}</Text>
          {secondLine}
        </View>
      </TouchableOpacity>
    );
  }
}
