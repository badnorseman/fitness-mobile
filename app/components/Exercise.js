import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';

import ExerciseTitle from './ExerciseTitle';
import Repetition from './Repetition';
import BreakTimer from './BreakTimer';
import ExerciseNav from './ExerciseNav';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: 64
  }
});

export default class Exercise extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    workout: React.PropTypes.object,
    exerciseGroup: React.PropTypes.object,
    overview: React.PropTypes.array
  }

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
        <View style={{ flex: 1 }}>
          {titles}
          {repetitions}
        </View>
        <ExerciseNav {...this.props}/>
      </View>
    );
  }
}