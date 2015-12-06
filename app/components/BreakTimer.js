import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    height: 25,
    backgroundColor: 'rgba(36, 39, 46, 1)',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default class BreakTimer extends Component {
  static propTypes = {
    set: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { set } = this.props;

    return (
      <View style={styles.main}>
        <Text style={styles.text}>{set.restPretty}</Text>
      </View>
    );
  }
}
