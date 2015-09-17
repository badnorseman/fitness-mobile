import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
    height: 45,
    backgroundColor: 'rgba(51, 56, 72, 1)',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: 'bold',
    lineHeight: 25
  },
  left: {
    flex: 1
  },
  middle: {
    flex: 1,
    flexDirection: 'row'
  },
  right: {
    flex: 1,
    flexDirection: 'row'
  },
  reps: {
    height: 35,
    width: 48,
    marginRight: 3,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(69, 74, 91, 1)',
    color: 'rgba(169, 169, 169, 1)'
  }
});

export default class Repetition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.left}>
          <Text style={styles.text}>Pull Ups</Text>
        </View>
        <View style={styles.middle}>
          <TextInput keyboardType='numeric' placeholder='MAX' placeholderTextColor='rgba(169, 169, 169, 1)' style={styles.reps}/>
          <Text style={styles.text}>reps</Text>
        </View>
        <View style={styles.right}>
          <TextInput keyboardType='numeric' placeholder='MAX' placeholderTextColor='rgba(169, 169, 169, 1)' style={styles.reps}/>
          <Text style={styles.text}>kg</Text>
        </View>
      </View>
    );
  }
}
