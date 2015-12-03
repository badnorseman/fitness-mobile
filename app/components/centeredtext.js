import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 21
  }
});

export default class CenteredText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const text = this.props.text || '';
    return (
      <View style={styles.main}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}
