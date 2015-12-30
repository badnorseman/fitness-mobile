import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  AlertIOS
} from 'react-native';

import days from '../utils/days';

const styles = StyleSheet.create({
  main: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 1
  },
  touchable: {
    alignSelf: 'stretch'
  },
  inProgress: {
    backgroundColor: 'rgba(115, 170, 133, 1)'
  },
  completed: {
    backgroundColor: 'rgba(58, 153, 89, 1)'
  },
  next: {
    backgroundColor: 'rgba(58, 77, 153, 1)'
  },
  firstLine: {
    color: 'rgba(192, 192, 195, 1)',
    fontWeight: 'bold'
  },
  firstLineInProgress: {
    color: 'white'
  },
  firstLineCompleted: {
    color: 'white'
  },
  secondLine: {
    color: 'white'
  }
});

export default class HabitButton extends Component {
  static propTypes = {
    state: React.PropTypes.object,
    workout: React.PropTypes.object,
    week: React.PropTypes.object,
    workoutNum: React.PropTypes.number,
    currentWeekNo: React.PropTypes.number,
    navigator: React.PropTypes.object,
    habitsStarted: React.PropTypes.object,
    occurences: React.PropTypes.object,
    occurence: React.PropTypes.object,
    habitsCheck: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  getHabitName() {
    const { occurence } = this.props;

    if (occurence.pick) {
      return 'Pick a habit';
    }

    return days[occurence.day % 7];
  }

  getMainStyling(occurence) {
    if (!occurence.timeStatus) {
      return { backgroundColor: 'rgba(58, 77, 153, 0.98)' };
    } else if (occurence.timeStatus !== 'today' && !occurence.dateDT) {
      return { backgroundColor: 'rgba(51, 56, 72, 0.98)', opacity: 0.7 };
    } else if (occurence.dateDT) {
      return { backgroundColor: 'rgba(58, 153, 89, 0.98)' };
    } else if (occurence.timeStatus === 'today') {
      return { backgroundColor: 'rgba(58, 77, 153, 0.98)' };
    }
  }

  handlePress(occurences, occurence) {
    const { navigator, habitsCheck } = this.props;
    if (occurence.pick) {
      navigator.push({ id: 'habits', title: 'Habits' });
    } else {
      habitsCheck(occurences.userHabit.id, occurence);
    }
  }

  render() {
    const { occurences, occurence } = this.props;
    const buttonStyles = [styles.main, this.getMainStyling(occurence)];

    return (
      <TouchableOpacity style={styles.touchable} onPress={this.handlePress.bind(this, occurences, occurence)}>
        <View style={buttonStyles}>
          <Text style={[styles.firstLine, styles.firstLineCompleted]}>{this.getHabitName()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
