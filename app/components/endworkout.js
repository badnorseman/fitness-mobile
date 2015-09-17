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
    backgroundColor: 'rgba(41, 44, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 1
  },
  touchable: {
    alignSelf: 'stretch'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class EndWorkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.main}>
          <Text style={styles.text}>End Workout</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
