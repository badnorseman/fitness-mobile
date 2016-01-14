import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 1
  },
  touchable: {
    alignSelf: 'stretch'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class FooterButton extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    state: React.PropTypes.object,
    workout: React.PropTypes.object,
    workoutNum: React.PropTypes.number,
    startWorkout: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  endWorkout() {
    const { navigator, workout, workoutNum } = this.props;

    navigator.push({
      id: 'feedback',
      props: {
        workout: workout,
        workoutNum: workoutNum
      }
    });
  }

  startWorkout() {
    const { navigator, state } = this.props;
    const nextWorkoutId = state.plan.data.nextWorkoutId;

    Alert.alert(
      '',
      'Are you ready to start?',
      [
        { text: 'Yes', onPress: () => {
          this.props.startWorkout(nextWorkoutId);
          navigator.popToTop();
        } },
        { text: 'Not yet', onPress: () => {}, style: 'cancel' }
      ]
    );
  }

  render() {
    const { state, workout } = this.props;
    const plan = state.plan.data;
    let backgroundColor;
    let label;
    let onPress;

    if (workout.id === plan.activeWorkoutId) {
      backgroundColor = 'rgba(41, 44, 52, 1)';
      label = 'End workout';
      onPress = this.endWorkout.bind(this);
    } else if (workout.id === plan.nextWorkoutId) {
      backgroundColor = 'rgba(58, 77, 153, 1)';
      label = 'Start workout';
      onPress = this.startWorkout.bind(this);
    }

    return label ? (
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={[styles.main, { backgroundColor: backgroundColor }]}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  }
}
