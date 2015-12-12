import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  },
  title: {
    color: 'white',
    fontSize: 21,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  smilies: {
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  feedback: {
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center'
  },
  smileyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: 'hidden'
  },
  smiley: {
    alignItems: 'center',
    height: 100
  },
  commentsInput: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(32, 34, 41, 1)',
    padding: 10,
    color: 'white',
    lineHeight: 25,
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 15
  },
  touchable: {
    alignSelf: 'stretch'
  },
  touchableSmiley: {
    flex: 1
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 1,
    backgroundColor: 'rgba(58, 77, 153, 1)'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class EditFeedback extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    persistFeedback: React.PropTypes.func,
    startWorkout: React.PropTypes.func,
    endWorkout: React.PropTypes.func,
    workoutNum: React.PropTypes.number,
    currentWeekNo: React.PropTypes.number,
    workout: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = props.workout.feedback || {};

    if (!this.state.type) {
      this.state.type = 'OK';
    }

    if (!this.state.comments) {
      this.state.comments = '';
    }
  }

  onFeedbackPress(type) {
    this.setState(React.addons.update(this.state, {
      '$set': { type: type }
    }));
  }

  onChangeComments(text) {
    this.setState(React.addons.update(this.state, {
      '$set': { comments: text }
    }));
  }

  getSmileyBackground(feedback) {
    let backgroundColor;

    if (this.state.type === feedback) {
      backgroundColor = 'rgba(58, 77, 153, 1)';
    } else {
      backgroundColor = 'transparent';
    }

    return backgroundColor;
  }

  persistFeedback() {
    const { navigator, persistFeedback, workoutNum, currentWeekNo } = this.props;
    persistFeedback(currentWeekNo, workoutNum - 1, this.state);
    navigator.pop();
  }

  endWorkout() {
    const { navigator, endWorkout, workoutNum } = this.props;
    endWorkout(workoutNum - 1, this.state);
    navigator.popToTop();
  }

  render() {
    const { workout } = this.props;
    let label;
    let onPressAction;

    if (workout.feedback) {
      label = 'Save changes';
      onPressAction = this.persistFeedback.bind(this);
    } else {
      label = 'End workout';
      onPressAction = this.endWorkout.bind(this);
    }

    return (
      <View style={styles.main} onStartShouldSetResponder={dismissKeyboard}>
        <Text style={styles.title}>How was your workout?</Text>
        <View style={styles.smilies}>
          <TouchableOpacity style={[styles.touchable, styles.touchableSmiley]} onPress={this.onFeedbackPress.bind(this, 'EASY')}>
            <View style={[styles.smileyContainer, { backgroundColor: this.getSmileyBackground('EASY') }]}>
              <Image
                style={styles.smiley}
                resizeMode="contain"
                source={require('image!smiley_too-easy')}
              />
              <Text style={styles.feedback}>Too easy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchable, styles.touchableSmiley]} onPress={this.onFeedbackPress.bind(this, 'OK')}>
            <View style={[styles.smileyContainer, { backgroundColor: this.getSmileyBackground('OK') }]}>
              <Image
                style={styles.smiley}
                resizeMode="contain"
                source={require('image!smiley_just-right')}
              />
              <Text style={styles.feedback}>Just right</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchable, styles.touchableSmiley]} onPress={this.onFeedbackPress.bind(this, 'HARD')}>
            <View style={[styles.smileyContainer, { backgroundColor: this.getSmileyBackground('HARD') }]}>
              <Image
                style={styles.smiley}
                resizeMode="contain"
                source={require('image!smiley_too-hard')}
              />
              <Text style={styles.feedback}>Too hard</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Any comments?</Text>
        <TextInput
          multiline
          style={styles.commentsInput}
          onChangeText={this.onChangeComments.bind(this)}
          value={this.state.comments}
        />
        <TouchableOpacity style={styles.touchable} onPress={onPressAction}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
