import React, {
  StyleSheet,
  Component,
  View,
  ScrollView
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import KeyboardHandler from './KeyboardHandler';
import ExerciseTitle from './ExerciseTitle';
import Repetition from './Repetition';
import BreakTimer from './BreakTimer';
import ExerciseNav from './ExerciseNav';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: NAVBAR_PADDING
  }
});

export default class Exercise extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    workout: React.PropTypes.object,
    exerciseGroup: React.PropTypes.object,
    overview: React.PropTypes.array
  };

  constructor(props) {
    super(props);
  }
  
  scrollToInput(_this, refKey) {
    this.refs.keyboardHandler.inputFocused(_this, refKey);
  }

  render() {
    const { navigator, workout, exerciseGroup, overview } = this.props;

    const repetitions = exerciseGroup.sets.map((set, i) => {
      return set.warmup ? null : (
        <View key={i}>
          <Repetition {...this.props} set={set} setId={i} scrollToInput={this.scrollToInput.bind(this)} />
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
        <KeyboardHandler ref='keyboardHandler' offset={75}>
          <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false} showsVerticalScrollIndicator>
            {titles}
            {repetitions}
          </ScrollView>
        </KeyboardHandler>
        <ExerciseNav {...this.props}/>
      </View>
    );
  }
}
