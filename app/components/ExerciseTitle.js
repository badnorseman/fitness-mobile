import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-icons';
import hasAllSetsDone from '../utils/hasAllSetsDone';

const styles = StyleSheet.create({
  main: {
    height: 65,
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 1
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20
  },
  play: {
    width: 20,
    height: 20
  },
  button: {
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    padding: 3,
    width: 45,
    alignItems: 'center'
  },
  playButton: {
    position: 'absolute',
    right: 60,
    bottom: 10
  },
  historyButton: {
    position: 'absolute',
    right: 10,
    bottom: 10
  }
});

export default class ExerciseTitle extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    workout: React.PropTypes.object,
    overview: React.PropTypes.object,
    exerciseGroup: React.PropTypes.object,
    exercise: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getTempoFromExOrSets() {
    const { exerciseGroup, exercise } = this.props;
    const sets = exerciseGroup.sets;
    let exSetTempo;

    for (let i = 0; i < sets.length; i++) {
      // Doesn't set twice
      if (sets[i].exerciseId === exercise.id && !exSetTempo) {
        exSetTempo = sets[i].tempo;
      }
    }

    if (exSetTempo) {
      return exSetTempo;
    }

    return exercise.tempo;
  }

  exerciseColor() {
    const { workout, exerciseGroup } = this.props;
    const style = {
      opacity: workout.endDT ? 0.7 : 1
    };

    if (!workout.startDT) {
      style.backgroundColor = 'rgb(51, 56, 72)';
    } else {
      style.backgroundColor = hasAllSetsDone(exerciseGroup) ? 'rgba(62, 152, 91, 1)' : 'rgba(59, 79, 151, 1)';
    }

    return style;
  }

  detailsColor() {
    const { workout, exerciseGroup } = this.props;
    const style = {
      opacity: workout.endDT ? 0.7 : 1
    };

    if (!workout.startDT) {
      style.color = 'rgb(107, 121, 177)';
    } else {
      style.color = hasAllSetsDone(exerciseGroup) ? 'rgb(176, 214, 189)' : 'rgb(119, 139, 218)';
    }

    return style;
  }

  nameColor() {
    const { workout } = this.props;
    if (!workout.startDT) {
      return { color: 'rgb(128, 128, 128)' };
    }

    return { color: 'rgb(255, 255, 255)' };
  }

  render() {
    const { exercise, overview, navigator } = this.props;
    const tempo = this.getTempoFromExOrSets(exercise);
    const tempoDetail = (tempo ? <Text>Tempo {tempo}</Text> : null);
    const setsDetail = (overview.loadTest || overview.loadTestOptional) ? (<Text>Test</Text>) : (<Text>{overview.setsNo + ' sets'}</Text>);

    return (
      <View style={[styles.main, this.exerciseColor()]}>
        <Text style={[styles.name, this.nameColor()]}>{exercise.name}</Text>
        <Text style={[styles.details, this.detailsColor()]}>
          <Text>{tempoDetail}</Text>
          <Text>{' '}</Text>
          <Text>{setsDetail}</Text>
        </Text>
        <TouchableOpacity style={styles.playButton} onPress={() => navigator.push({ id: 'video', title: exercise.shortName, props: { ...this.props } })}>
          <View style={styles.button}>
            <Icon
              name="ion|play"
              size={20}
              color="white"
              style={styles.play}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={() => navigator.push({ id: 'history', title: exercise.shortName, props: { ...this.props } })}>
          <View style={styles.button}>
            <Icon
              name="ion|clipboard"
              size={20}
              color="white"
              style={styles.play}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
