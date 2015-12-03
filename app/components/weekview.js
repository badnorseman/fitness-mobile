import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import WorkoutButton from './workoutbutton';

const styles = StyleSheet.create({
  halves: {
    flexDirection: 'row',
    flex: 1,
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
  constructor(props) {
    super(props);
  }

  getWorkoutCompliance() {
    const { state } = this.props;
    let workouts = state.plan.data.workouts;

    var c = 0;
		var dif = 100 / workouts.length;
		for (var i = 0; i < workouts.length; i++) {
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

    if(week && week.workouts && week.workouts.length){
      workouts = week.workouts.map((row, i) => {
        return (
          <WorkoutButton {...this.props} workout={row} key={i} workoutNum={i+1} />
        );
      });
    }

    return (
      <View style={styles.halves}>
        <View style={styles.leftHalf}>
          <Text style={styles.halfHeader}>Workouts</Text>
          <Text style={[styles.halfHeader, {marginBottom: 20}]}>{this.getWorkoutCompliance()}%</Text>
          {workouts}
        </View>
        <View style={styles.rightHalf}>
          <Text style={styles.halfHeader}>Habits</Text>
          <Text style={[styles.halfHeader, {marginBottom: 20}]}>0%</Text>
        </View>
      </View>
    );
  }
}
