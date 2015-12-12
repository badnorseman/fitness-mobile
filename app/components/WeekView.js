import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import WorkoutButton from './WorkoutButton';

const styles = StyleSheet.create({
  halves: {
    flexDirection: 'row',
    flex: 1
  },
  leftHalf: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 20
  },
  rightHalf: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 20
  },
  halfHeader: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 18
  }
});

export default class WeekView extends Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  getWorkoutCompliance() {
    const { state } = this.props;
    const workouts = state.plan.data.workouts;

    let c = 0;
    const dif = 100 / workouts.length;

    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].endDT) {
        c += dif;
      }
    }
    return Math.round(c);
  }

  render() {
    const { state } = this.props;
    const currentWeekNo = state.dashboard.week;
    const week = state.plan.data.weeks[currentWeekNo];
    let workouts;

    if (week && week.workouts && week.workouts.length) {
      workouts = week.workouts.map((row, i) => {
        return (
          <WorkoutButton {...this.props} workout={row} key={i} workoutNum={i + 1} currentWeekNo={currentWeekNo} week={week} />
        );
      });
    }

    return (
      <View style={styles.halves}>
        <View style={styles.leftHalf}>
          <Text style={styles.halfHeader}>Workouts</Text>
          <Text style={[styles.halfHeader, { marginBottom: 20 }]}>{this.getWorkoutCompliance()}%</Text>
          {workouts}
        </View>
        <View style={styles.rightHalf}>
          <Text style={styles.halfHeader}>Habits</Text>
          <Text style={[styles.halfHeader, { marginBottom: 20 }]}>0%</Text>
        </View>
      </View>
    );
  }
}
