import React, {
  StyleSheet,
  Component,
  View,
  ScrollView,
  Text
} from 'react-native';

import CenteredText from './CenteredText';
import getDayName from '../utils/getDayName';
import getMonthName from '../utils/getMonthName';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)',
    paddingTop: NAVBAR_PADDING
  },
  dayHeaderContainer: {
    backgroundColor: 'rgba(58, 153, 89, 1)',
    padding: 10,
    marginBottom: 1,
    justifyContent: 'center'
  },
  dayHeader: {
    fontWeight: 'bold',
    color: 'white'
  },
  set: {
    backgroundColor: 'rgba(51, 56, 72, 1)',
    padding: 10,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  third: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  setNo: {
    color: 'grey'
  },
  text: {
    fontWeight: 'bold'
  },
  c1: {
    position: 'relative',
    top: -1,
    fontSize: 18,
    color: 'rgb(255, 255, 255)'
  },
  c1t: {
    color: 'rgb(128, 128, 128)'
  },
  c2: {
    position: 'relative',
    top: -1,
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
              <Text style={[styles.text, styles.setNo]}>Set {i + 1}</Text>
            </View>
            <View style={styles.third}>
              <Text style={styles.text}><Text style={styles.c1}>{set.c1}</Text></Text><Text>{' '}</Text><Text style={styles.text}><Text style={styles.c1t}>{set.c1t}</Text></Text>
            </View>
            <View style={styles.third}>
              <Text style={styles.text}><Text style={styles.c2}>{set.c2}</Text></Text><Text>{' '}</Text><Text style={styles.text}><Text style={styles.c2t}>{set.c2t}</Text></Text>
            </View>
          </View>
        );
      });

      days.push(
        <View key={date}>
          <View style={styles.dayHeaderContainer}><Text style={styles.dayHeader}>{date}</Text></View>
          {rows}
        </View>
      );
    });

    return (
      <ScrollView style={styles.main} showsHorizontalScrollIndicator>
        {days}
      </ScrollView>
    );
  }
}
