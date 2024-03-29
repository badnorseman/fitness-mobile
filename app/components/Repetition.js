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
    height: 45,
    backgroundColor: 'rgba(51, 56, 72, 1)',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 13,
    fontWeight: 'bold'
  },
  left: {
    flex: 0.9,
    justifyContent: 'center'
  },
  middle: {
    flex: 1,
    flexDirection: 'row'
  },
  right: {
    flex: 1,
    flexDirection: 'row'
  },
  check: {
    flex: 0.35,
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
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c1t: {
    color: 'rgb(128, 128, 128)'
  },
  c2: {
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c2t: {
    color: 'rgb(128, 128, 128)'
  },
  bigNumber: {
    position: 'relative',
    top: -1
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible'
  },
  checkIcon: {
    width: 35,
    height: 35,
    opacity: 1,
    backgroundColor: 'transparent'
  },
  hidden: {
    opacity: 0
  }
});

export default class Repetition extends Component {
  static propTypes = {
    workout: React.PropTypes.object,
    set: React.PropTypes.object,
    checkSet: React.PropTypes.func,
    checkSetWithValue: React.PropTypes.func,
    workoutNum: React.PropTypes.number,
    exerciseGroupId: React.PropTypes.number,
    setId: React.PropTypes.number,
    currentWeekNo: React.PropTypes.number,
    scrollToInput: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      missingValue: null
    };
  }

  onPressCheck() {
    const { checkSet, currentWeekNo, workoutNum, exerciseGroupId, setId } = this.props;
    const workoutKey = workoutNum - 1;
    checkSet(currentWeekNo, workoutKey, exerciseGroupId, setId);
  }

  handleInputBlur() {
    const { checkSetWithValue, currentWeekNo, workoutNum, exerciseGroupId, setId } = this.props;
    const workoutKey = workoutNum - 1;
    checkSetWithValue(currentWeekNo, workoutKey, exerciseGroupId, setId, this.state.missingValue);
    dismissKeyboard();
  }

  handleInputChange(newValue) {
    this.setState({ missingValue: newValue });
  }

  handleFocus(refKey) {
    this.props.scrollToInput(this, refKey);    
  }

  render() {
    const { workout, set } = this.props;
    const inputDisabled = !workout.startDT || workout.endDT;
    let middle;
    let right;
    let check;

    const inputProps = {
      keyboardType: 'number-pad',
      keyboardAppearance: 'dark',
      placeholder: 'MAX',
      placeholderTextColor: 'rgba(169, 169, 169, 1)',
      style: styles.reps,
      onBlur: this.handleInputBlur.bind(this),
      onChangeText: this.handleInputChange.bind(this),
      value: this.state.missingValue,
      keyboardAppearance: 'dark', 
      returnKeyType: 'done', 
      onSubmitEditing: this.handleInputBlur.bind(this)
    };

    if (set.c1) {
      middle = <View style={styles.fieldContainer}><Text style={[styles.text, styles.bigNumber]}><Text style={styles.c1}>{set.c1}</Text></Text><Text>{' '}</Text><Text style={styles.text}><Text style={styles.c1t}>{set.c1t}</Text></Text></View>;
    } else if (set.missingField && set.c1Missing) {
      middle = <View style={styles.fieldContainer}><TextInput {...inputProps} ref="c1" onFocus={this.handleFocus.bind(this, 'c1')}/><Text style={[styles.text, styles.c1t]}>{set.c1t}</Text></View>;
    }

    if (set.c2) {
      right = <View style={styles.fieldContainer}><Text style={[styles.text, styles.bigNumber]}><Text style={styles.c2}>{set.c2}</Text></Text><Text>{' '}</Text><Text style={styles.text}><Text style={styles.c2t}>{set.c2t}</Text></Text></View>;
    } else if (set.missingField && set.c2Missing) {
      right = <View style={styles.fieldContainer}><TextInput {...inputProps} ref="c2" onFocus={this.handleFocus.bind(this, 'c2')}/><Text style={[styles.text, styles.c2t]}>{set.c2t}</Text></View>;
    }

    if (!set.missingField && !inputDisabled) {
      if (set.dateDT) {
        check = (
          <Icon
            name="ion|ios-checkmark-outline"
            size={35}
            color="white"
            style={styles.checkIcon}
          />
        );
      } else {
        check = (
          <TouchableOpacity onPress={this.onPressCheck.bind(this)}>
            <Icon
              name="ion|ios-circle-outline"
              size={35}
              color="grey"
              style={styles.checkIcon}
            />
          </TouchableOpacity>
        );
      }
    }

    return (
      <View style={[styles.main, (!set.rest ? { marginBottom: 1 } : {})]} onStartShouldSetResponder={dismissKeyboard}>
        <View style={styles.left}>
          <Text style={styles.text}>{set.ex.shortName}</Text>
        </View>
        <View style={styles.middle}>
          {middle}
        </View>
        <View style={styles.right}>
          {right}
        </View>
        <View style={check ? styles.check : [styles.check, styles.hidden]}>
          {check}
        </View>
      </View>
    );
  }
}
