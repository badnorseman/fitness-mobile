import React, {
  StyleSheet,
  Component,
  View,
  ScrollView
} from 'react-native';

import KeyboardHandler from './KeyboardHandler';
import EditRepetition from './EditRepetition';
import BreakTimer from './BreakTimer';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: NAVBAR_PADDING
  }
});

export default class EditWorkout extends Component {
  static propTypes = {
    exerciseGroup: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  scrollToInput(_this, refKey) {
    this.refs.keyboardHandler.inputFocused(_this, refKey);
  }

  render() {
    const { exerciseGroup } = this.props;

    const repetitions = exerciseGroup.sets.map((set, i) => {
      return set.warmup ? null : (
        <View key={i}>
          <EditRepetition {...this.props} set={set} setId={i} scrollToInput={this.scrollToInput.bind(this)} />
          {set.rest && i !== exerciseGroup.sets.length - 1 ? <BreakTimer {...this.props} set={set} setId={i} /> : null}
        </View>
      );
    });

    return (
      <KeyboardHandler ref='keyboardHandler' offset={75}>
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            {repetitions}
          </View>
        </View>
      </KeyboardHandler>
    );
  }
}
