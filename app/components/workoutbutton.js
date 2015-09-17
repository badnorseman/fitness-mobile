import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
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
    backgroundColor: 'rgba(115, 170, 133, 0.98)',
  },
  firstLine: {
    color: 'rgba(192, 192, 195, 1)',
    fontWeight: 'bold'
  },
  firstLineInProgress: {
    color: 'white'
  },
  secondLine: {
    color: 'white'
  }
});

export default class WorkoutButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {inProgress, workoutNum, navigator} = this.props;

    if(inProgress){
      return (
        <TouchableOpacity style={styles.touchable} onPress={() => navigator.push({id: 'workout', title: `Workout ${workoutNum}`})}>
          <View style={[styles.main, styles.inProgress]}>
            <Text style={[styles.firstLine, styles.firstLineInProgress]}>Workout in progress</Text>
            <Text style={styles.secondLine}>Tap to resume</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.touchable} onPress={() => navigator.push({id: 'workout', title: `Workout ${workoutNum}`})}>
          <View style={styles.main}>
            <Text style={styles.firstLine}>Week {workoutNum}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
