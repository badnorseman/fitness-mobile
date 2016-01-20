import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';

import ExercisesList from './ExercisesList';
import FooterButton from './FooterButton';
import Feedback from './Feedback';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: NAVBAR_PADDING,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  }
});

export default class Workout extends Component {
  static propTypes = {
    workout: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { workout } = this.props;

    return (
      <View style={styles.main}>
        <Feedback {...this.props} />
        <ExercisesList {...this.props} overview={workout.overview} workout={workout} exerciseGroups={workout.exerciseGroups} />
        <FooterButton {...this.props} />
      </View>
    );
  }
}
