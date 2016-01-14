import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import CenteredText from './CenteredText';
import getDayName from '../utils/getDayName';
import getMonthName from '../utils/getMonthName';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)',
    paddingTop: 64
  },
  dayHeader: {
    backgroundColor: 'rgba(58, 153, 89, 1)',
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    marginBottom: 1
  },
  set: {
    backgroundColor: 'rgba(51, 56, 72, 1)',
    padding: 10,
    marginBottom: 1,
    flexDirection: 'row'
  },
  third: {
    flex: 1
  },
  setNo: {
    lineHeight: 18,
    color: 'grey'
  },
  c1: {
    lineHeight: 18,
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c1t: {
    color: 'rgb(128, 128, 128)'
  },
  c2: {
    lineHeight: 18,
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c2t: {
    color: 'rgb(128, 128, 128)'
  }
});

export default class ExerciseHistory extends Component {
  static propTypes = {
    state: React.PropTypes.object,
    exercise: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { exercise } = this.props;
    const history = this.props.state.plan.data.history[exercise.id];
    const groups = {};
    let days = [];

    if (!history) {
      return <CenteredText text="There is no history for this exercise yet. Time to make one!"/>;
    }

    history.forEach((day) => {
      const d = new Date(day.dateDT);
      const date = getDayName(d) + ', ' + d.getDate() + ' ' + getMonthName(d) + ' ' + d.getFullYear();

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(day);
    });

    Object.keys(groups).forEach((date) => {
      const sets = groups[date].sort((a, b) => {
        return a.dateDT - b.dateDT;
      });

      let rows = [];

      rows = sets.map((set, i) => {
        return (
          <View style={styles.set} key={i}>
            <View style={styles.third}>
              <Text style={styles.setNo}>Set {i + 1}</Text>
            </View>
            <View style={styles.third}>
              <Text><Text style={styles.c1}>{set.c1}</Text><Text>{' '}</Text><Text style={styles.c1t}>{set.c1t}</Text></Text>
            </View>
            <View style={styles.third}>
              <Text><Text style={styles.c2}>{set.c2}</Text><Text>{' '}</Text><Text style={styles.c2t}>{set.c2t}</Text></Text>
            </View>
          </View>
        );
      });

      days.push(
        <View key={date}>
          <Text style={styles.dayHeader}>{date}</Text>
          {rows}
        </View>
      );
    });

    return (
      <View style={styles.main}>
        {days}
      </View>
    );
  }
}
