import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-icons';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    height: 65,
    padding: 10,
    backgroundColor: 'rgba(58, 77, 153, 1)',
    alignSelf: 'stretch'
  },
  name: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  },
  details: {
    color: 'rgba(120, 141, 216, 1)',
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
    backgroundColor: 'rgba(46, 63, 120, 1)',
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
  constructor(props) {
    super(props);
  }

  render() {
    const {exercise, navigator} = this.props;

    return (
      <View style={styles.main}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.details}>Tempo 2021 3 sets</Text>
        <TouchableOpacity style={styles.playButton} onPress={() => navigator.push({id: 'video', title: exercise.name})}>
          <View style={styles.button}>
            <Icon
              name='ion|play'
              size={20}
              color='white'
              style={styles.play}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton}>
          <View style={styles.button}>
            <Icon
              name='ion|clipboard'
              size={20}
              color='white'
              style={styles.play}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
