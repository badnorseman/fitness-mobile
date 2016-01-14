import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import getWeek from '../utils/getWeek';

const styles = StyleSheet.create({
  main: {
    height: 60,
    backgroundColor: 'rgba(41, 44, 53, 0.95)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weekTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  arrow: {
    height: 60,
    width: 60,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(36, 39, 46, 1)',
    textAlign: 'center',
    lineHeight: 39
  },
  leftArrow: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  rightArrow: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});

export default class WeekNav extends Component {
  static propTypes = {
    state: React.PropTypes.object,
    prevWeek: React.PropTypes.func,
    nextWeek: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  onPressPrev() {
    this.props.prevWeek();
  }

  onPressNext() {
    this.props.nextWeek();
  }

  render() {
    const { state } = this.props;
    const currentWeekNo = state.dashboard.week;
    const week = state.plan.data.weeks[currentWeekNo];
    const totalWeeks = state.plan.data.weeks.length;
    const currentWeek = getWeek();
    let label = '';
    let prevWeekButton;
    let nextWeekButton;

    if (week && week.weekNo === currentWeek) {
      label = 'This week';
    } else if (week) {
      label = `Week ${week.weekNo}`;
    }

    if (currentWeekNo > 0) {
      prevWeekButton = (<TouchableOpacity style={styles.leftArrow} onPress={this.onPressPrev.bind(this)}><Text style={styles.arrow}>&lt;</Text></TouchableOpacity>);
    }

    if (currentWeekNo <= totalWeeks - 2) {
      nextWeekButton = (<TouchableOpacity style={styles.rightArrow} onPress={this.onPressNext.bind(this)}><Text style={styles.arrow}>&gt;</Text></TouchableOpacity>);
    }

    return (
      <View style={styles.main}>
        {prevWeekButton}
        <Text style={styles.weekTitle}>{label}</Text>
        {nextWeekButton}
      </View>
    );
  }
}
