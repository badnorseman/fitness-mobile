import React, {
  StyleSheet,
  Component,
  StatusBar
} from 'react-native';

export default class FitbirdStatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StatusBar
        backgroundColor="#292c34"
        barStyle="light-content"
      />
    );
  }
}
