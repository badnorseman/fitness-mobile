import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image
} from 'react-native';

import WeekNav from './weeknav';
import WorkoutButton from './workoutbutton';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)'
  },
  background: {
    flex: 1,
    paddingTop: 74
  },
  halves: {
    flexDirection: 'row',
    flex: 1,
  },
  leftHalf: {
    flex: 1,
    color: '#ffffff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 20
  },
  rightHalf: {
    flex: 1,
    color: '#ffffff',
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <Image
          style={styles.background}
          source={{uri: 'http://app.fitbird.com/app/static/img/background-bird.png'}}
        >
          <View style={styles.halves}>
            <View style={styles.leftHalf}>
              <Text style={styles.halfHeader}>Workouts</Text>
              <Text style={[styles.halfHeader, {marginBottom: 20}]}>0%</Text>
              <WorkoutButton {...this.props} workoutNum={1} inProgress={true}/>
              <WorkoutButton {...this.props} workoutNum={2}/>
              <WorkoutButton {...this.props} workoutNum={3}/>
              <WorkoutButton {...this.props} workoutNum={4}/>
            </View>
            <View style={styles.rightHalf}>
              <Text style={styles.halfHeader}>Habits</Text>
              <Text style={[styles.halfHeader, {marginBottom: 20}]}>0%</Text>
            </View>
          </View>
          <WeekNav/>
        </Image>
      </View>
    );
  }
}
