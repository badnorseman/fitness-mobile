import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  AlertIOS
} from 'react-native';

const styles = StyleSheet.create({
  main: {
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

export default class FooterButton extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    state: React.PropTypes.object,
    habit: React.PropTypes.object,
    habitsStart: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  handlePress() {
    const { navigator, habit, habitsStart } = this.props;

    AlertIOS.alert(
      '',
      'Are you ready to start this habit?',
      [
        { text: 'Yes', onPress: () => {
          habitsStart(habit.id);
          navigator.popToTop();
        } },
        { text: 'Not yet', onPress: () => {}, style: 'cancel' }
      ]
    );
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.handlePress.bind(this)}>
        <View style={styles.main}>
          <Text style={styles.text}>Choose this habit</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
