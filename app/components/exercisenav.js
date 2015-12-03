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
  arrow: {
    height: 60,
    width: 60,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(36, 39, 46, 1)',
    textAlign: 'center',
    lineHeight: 39,
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
  rightArrowFinal: {
    backgroundColor: 'rgba(58, 77, 153, 1)'
  }
});

export default class ExerciseNav extends Component {
  constructor(props) {
    super(props);
  }

  onPressPrev(){
    const { workout, exerciseGroupId } = this.props;
    let prevId = parseInt(exerciseGroupId)-1;

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

  onPressNext(){
    const { workout, exerciseGroupId } = this.props;
    let nextId = parseInt(exerciseGroupId)+1;

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

  onPressNextFinal(){
    this.props.navigator.pop();
  }

  render() {
    const { workout, exerciseGroupId } = this.props;
    let left;
    let right;

    if(parseInt(exerciseGroupId) > 0) {
      left = <TouchableOpacity style={styles.leftArrow} onPress={this.onPressPrev.bind(this)}><Text style={styles.arrow}>&lt;</Text></TouchableOpacity>;
    }

    if(parseInt(exerciseGroupId) + 1 < workout.exerciseGroups.length) {
      right = <TouchableOpacity style={styles.rightArrow} onPress={this.onPressNext.bind(this)}><Text style={styles.arrow}>&gt;</Text></TouchableOpacity>;
    } else if(parseInt(exerciseGroupId) + 1 === workout.exerciseGroups.length) {
      right = <TouchableOpacity style={styles.rightArrow} onPress={this.onPressNextFinal.bind(this)}><Text style={[styles.arrow, styles.rightArrowFinal]}>&gt;</Text></TouchableOpacity>;
    }

    return (
      <View style={styles.main}>
        {left}
        <Text style={styles.weekTitle}>{(parseInt(exerciseGroupId)+1)} of {workout.exerciseGroups.length}</Text>
        {right}
      </View>
    );
  }
}
