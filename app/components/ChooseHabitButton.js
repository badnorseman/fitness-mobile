import React, { Alert, Component, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(58, 77, 153, 1)',
    height: 60,
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

export default class ChooseHabitButton extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    // state: React.PropTypes.object,
    habit: React.PropTypes.object,
    startHabit: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { navigator, habit, startHabit } = this.props;

    Alert.alert(
      '',
      'Are you ready to start this habit?',
      [
        { text: 'Yes', onPress: () => {
          startHabit(habit.id);
          navigator.popToTop();
        } },
        { text: 'No', onPress: () => {}, style: 'cancel' }
      ]
    );
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.handlePress}>
        <View style={styles.container}>
          <Text style={styles.text}>Choose this habit</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
