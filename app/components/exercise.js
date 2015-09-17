import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import ExerciseTitle from './exercisetitle';
import Repetition from './repetition';
import BreakTimer from './breaktimer';
import ExerciseNav from './exercisenav';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: 64
  }
});

export default class Exercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <ExerciseTitle {...this.props}/>
        <View style={{flex: 1}}>
          <Repetition/>
          <BreakTimer/>
          <Repetition/>
          <BreakTimer/>
          <Repetition/>
        </View>
        <ExerciseNav/>
      </View>
    );
  }
}
