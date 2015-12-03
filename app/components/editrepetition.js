import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-icons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    height: 45,
    backgroundColor: 'rgba(51, 56, 72, 1)',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: 'bold',
    lineHeight: 25
  },
  input: {
    color: 'white',
    fontWeight: 'bold'
  },
  left: {
    flex: 2
  },
  middle: {
    flex: 1,
    flexDirection: 'row'
  },
  right: {
    flex: 1,
    flexDirection: 'row'
  },
  reps: {
    height: 35,
    width: 48,
    marginRight: 3,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(69, 74, 91, 1)',
    color: 'rgba(169, 169, 169, 1)'
  },
  c1: {
    lineHeight: 27,
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c1t: {
    color: 'rgb(128, 128, 128)'
  },
  c2: {
    lineHeight: 27,
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c2t: {
    color: 'rgb(128, 128, 128)'
  },
  missingFieldInputContainer: {
    flexDirection: 'row'
  }
});

export default class EditRepetition extends Component {
  constructor(props) {
    super(props);
    const { set } = props;
    this.state = {};
    this.state.c1 = set.c1 ? set.c1.toString() : '';
    this.state.c2 = set.c2 ? set.c2.toString() : '';
  }

  onC1Change(c1) {
    this.setState(React.addons.update(this.state, {
      '$set': { c1: c1 ? c1.toString() : '' }
    }));
  }

  onC2Change(c2) {
    this.setState(React.addons.update(this.state, {
      '$set': { c2: c2 ? c2.toString() : '' }
    }));
  }

  onC1Blur() {
    const { workoutNum, exerciseGroupId, setId, set } = this.props;
    const workoutId = workoutNum - 1;
    this.props.updateWorkout(workoutId, exerciseGroupId, setId, set.c1t, this.state.c1);
  }

  onC2Blur() {
    const { workoutNum, exerciseGroupId, setId, set } = this.props;
    const workoutId = workoutNum - 1;
    this.props.updateWorkout(workoutId, exerciseGroupId, setId, set.c2t, this.state.c2);
  }

  render() {
    const { navigator, workout, exerciseGroup, overview, set, setId } = this.props;
    const inputDisabled = !workout.startDT || workout.endDT;

    let left;
    let middle;
    let right;

    const inputProps = {
      keyboardType: 'number-pad',
      keyboardAppearance: 'dark',
      style: styles.reps,
      onBlur: dismissKeyboard,
      editable: !!set.dateDT
    };

    return (
      <View style={[styles.main, (!set.rest ? {marginBottom: 1} : {})]} onStartShouldSetResponder={dismissKeyboard}>
        <View style={styles.left}>
          <Text style={styles.text}>{set.ex.shortName}</Text>
        </View>
        <View style={styles.middle}>
          <View style={styles.missingFieldInputContainer}>
            <TextInput {...inputProps} value={this.state.c1} onChangeText={this.onC1Change.bind(this)} onBlur={this.onC1Blur.bind(this)} />
            <Text style={styles.input} style={[styles.text, styles.c1t]}>{set.c1t}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.missingFieldInputContainer}>
            <TextInput style={styles.input} {...inputProps} value={this.state.c2} onChangeText={this.onC2Change.bind(this)} onBlur={this.onC2Blur.bind(this)} />
            <Text style={[styles.text, styles.c2t]}>{set.c2t}</Text>
          </View>
        </View>
      </View>
    );
  }
}
