import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import ExerciseTitle from './exercisetitle';
import Repetition from './repetition';
import BreakTimer from './breaktimer';
import ExerciseNav from './exercisenav';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: 64
  }
});

export default class Exercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigator, workout, exerciseGroup, overview } = this.props;

    const repetitions = exerciseGroup.sets.map((set, i) => {
      return set.warmup ? null : (
        <View key={i}>
          <Repetition {...this.props} set={set} setId={i} />
          {set.rest && i !== exerciseGroup.sets.length - 1 ? <BreakTimer {...this.props} set={set} setId={i} /> : null}
        </View>
      );
    });

    const titles = exerciseGroup.exercises.map((exercise, i) => {
      return (
        <View key={i}>
          <ExerciseTitle navigator={navigator} workout={workout} exercise={exercise} exerciseId={i} exerciseGroup={exerciseGroup} overview={overview[i]} />
        </View>
      );
    });

    return (
      <View style={styles.main}>
        <View style={{flex: 1}}>
          {titles}
          {repetitions}
        </View>
        <ExerciseNav {...this.props}/>
      </View>
    );
  }
}
