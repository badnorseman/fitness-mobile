import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    height: 60,
    backgroundColor: 'rgba(41, 44, 53, 0.95)',
    alignItems: 'center',
    // textAlign: 'center',
    justifyContent: 'center'
  },
  weekTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  arrowButton: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(36, 39, 46, 1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
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
  },
  rightArrowButtonFinal: {
    backgroundColor: 'rgba(58, 77, 153, 1)'
  }
});

export default class ExerciseNav extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    workout: React.PropTypes.object,
    exerciseGroup: React.PropTypes.object,
    exerciseGroupId: React.PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  onPressPrev() {
    const { workout, exerciseGroupId } = this.props;
    const prevId = parseInt(exerciseGroupId, 10) - 1;

    this.props.navigator.replace({
      id: 'exercise',
      props: {
        workout: workout,
        exerciseGroup: workout.exerciseGroups[prevId],
        exerciseGroupId: prevId,
        overview: workout.overview[prevId]
      }
    });
  }

  onPressNext() {
    const { workout, exerciseGroupId } = this.props;
    const nextId = parseInt(exerciseGroupId, 10) + 1;

    this.props.navigator.replace({
      id: 'exercise',
      props: {
        workout: workout,
        exerciseGroup: workout.exerciseGroups[nextId],
        exerciseGroupId: nextId,
        overview: workout.overview[nextId]
      }
    });
  }

  onPressNextFinal() {
    this.props.navigator.pop();
  }

  render() {
    const { workout, exerciseGroupId } = this.props;
    let left;
    let right;

    if (parseInt(exerciseGroupId, 10) > 0) {
      left = <TouchableOpacity style={styles.leftArrow} onPress={this.onPressPrev.bind(this)}><View style={styles.arrowButton}><Text style={styles.arrow}>&lt;</Text></View></TouchableOpacity>;
    }

    if (parseInt(exerciseGroupId, 10) + 1 < workout.exerciseGroups.length) {
      right = <TouchableOpacity style={styles.rightArrow} onPress={this.onPressNext.bind(this)}><View style={styles.arrowButton}><Text style={styles.arrow}>&gt;</Text></View></TouchableOpacity>;
    } else if (parseInt(exerciseGroupId, 10) + 1 === workout.exerciseGroups.length) {
      right = <TouchableOpacity style={styles.rightArrow} onPress={this.onPressNextFinal.bind(this)}><View style={[styles.arrowButton, styles.rightArrowButtonFinal]}><Text style={styles.arrow}>&gt;</Text></View></TouchableOpacity>;
    }

    return (
      <View style={styles.main}>
        {left}
        <Text style={styles.weekTitle}>{(parseInt(exerciseGroupId, 10) + 1)} of {workout.exerciseGroups.length}</Text>
        {right}
      </View>
    );
  }
}
