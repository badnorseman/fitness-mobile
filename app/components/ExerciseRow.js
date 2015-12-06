import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import hasAllSetsDone from '../utils/hasAllSetsDone';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)'
  },
  row: {
    justifyContent: 'center',
    padding: 10,
    height: 65
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  },
  text: {
    flex: 1
  },
  name: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  details: {
    marginRight: 15,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20
  }
});

function getExerciseColor(workout, exerciseGroup) {
  const style = {
    opacity: (!workout.endDT ? 1 : 0.7)
  };

  if (!workout.startDT) {
    style.backgroundColor = 'rgb(51, 56, 72)';
  } else if (hasAllSetsDone(exerciseGroup)) {
    style.backgroundColor = 'rgba(62, 152, 91, 1)';
  } else {
    style.backgroundColor = 'rgba(59, 79, 151, 1)';
  }

  return style;
}

function getExerciseDetailsColor(workout, exerciseGroup) {
  if (!workout.startDT) {
    return { color: 'rgb(107, 121, 177)' };
  }

  if (hasAllSetsDone(exerciseGroup)) {
    return { color: 'rgb(176, 214, 189)' };
  }

  return { color: 'rgb(119, 139, 218)' };
}

function getExerciseNameColor(workout) {
  if (!workout.startDT) {
    return { color: 'rgb(128, 128, 128)' };
  }

  return { color: 'rgb(255, 255, 255)' };
}

export default class ExerciseRow extends Component {
  static propTypes = {
    workout: React.PropTypes.object,
    exercise: React.PropTypes.object,
    exerciseGroup: React.PropTypes.object,
    overview: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { workout, exercise, exerciseGroup, overview } = this.props;
    const detailsStyle = [styles.details, getExerciseDetailsColor(workout, exerciseGroup)];

    return (
      <View style={[styles.row, getExerciseColor(workout, exerciseGroup)]}>
        <Text style={[styles.text, styles.name, getExerciseNameColor(workout)]}>
          {exercise.name}
        </Text>
        <View style={[styles.text, styles.detailsContainer]}>
          <Text style={detailsStyle}>{overview.setsNo} sets</Text>
          <Text style={detailsStyle}>{overview.col1}</Text>
          <Text style={detailsStyle}>{overview.col2}</Text>
        </View>
      </View>
    );
  }
}
