import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    height: 60,
    backgroundColor: 'rgba(41, 44, 53, 0.95)',
    alignItems: 'center',
    textAlign: 'center',
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
  }
});

export default class ExerciseNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity style={styles.leftArrow}><Text style={styles.arrow}>&lt;</Text></TouchableOpacity>
        <Text style={styles.weekTitle}>1 of 5</Text>
        <TouchableOpacity style={styles.rightArrow}><Text style={styles.arrow}>&gt;</Text></TouchableOpacity>
      </View>
    );
  }
}
