import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

import { COUNT_DOWN } from '../constants/counter_directions';
import prettifySeconds from '../utils/prettifySeconds';

const styles = StyleSheet.create({
  main: {
    height: 25,
    backgroundColor: 'rgba(36, 39, 46, 1)',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  textIdle: {
    color: 'rgba(128, 128, 128, 1)'
  },
  textCounting: {
    color: 'rgba(255, 255, 255, 1)'
  },
  bar: {
    height: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row'
  },
  barPositive: {
    backgroundColor: 'rgba(101, 103, 113, 1)'
  },
  barDone: {
    backgroundColor: 'rgba(43, 48, 66, 1)'
  }
});

export default class BreakTimer extends Component {
  static propTypes = {
    set: React.PropTypes.object,
    setId: React.PropTypes.number,
    startCounter: React.PropTypes.func,
    state: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { set, state } = this.props;
    const counter = state.counters && state.counters[set.id];
    let prettyTime;
    let flexPositive;
    let flexNegative;

    if (counter && counter.count <= counter.limit) {
      return (
        <View style={[styles.main, styles.barDone]}>
          <Text style={[styles.text, styles.textIdle]}>00:00</Text>
        </View>
      );
    } else if (counter) {
      prettyTime = prettifySeconds(counter.count);
      flexPositive = (set.rest - counter.count) / set.rest;
      flexNegative = counter.count / set.rest;

      return (
        <View style={styles.main}>
          <View style={styles.bar}>
            <View style={[styles.barPositive, { flex: flexPositive }]} />
            <View style={{ flex: flexNegative }} />
          </View>
          <Text style={[styles.text, styles.textCounting]}>{prettyTime}</Text>
        </View>
      );
    } else {
      prettyTime = set.restPretty;

      return (
        <View style={styles.main}>
          <Text style={[styles.text, styles.textIdle]}>{prettyTime}</Text>
        </View>
      );
    }
  }
}
