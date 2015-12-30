import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(58, 77, 153, 1)',
    padding: 10,
    marginBottom: 1
  },
  touchable: {
    alignSelf: 'stretch'
  },
  title: {
    color: '#ffffff'
  },
  description: {
    fontSize: 12,
    color: 'rgba(119, 139, 218, 1)'
  }
});

export default class HabitsRow extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    habit: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  handlePress() {
    this.props.navigator.push({ id: 'habit', title: 'Details', props: this.props });
  }

  render() {
    const { habit } = this.props;

    return (
      <TouchableOpacity style={styles.touchable} onPress={this.handlePress.bind(this)}>
        <View style={styles.main}>
          <Text style={styles.title}>{habit.name}</Text>
          <Text style={styles.description}>{habit.nameLong}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
