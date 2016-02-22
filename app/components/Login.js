import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CenteredText from './CenteredText';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#2e313a'
  },
  emailInput: {
    backgroundColor: '#454a5b',
    height: 40,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#ffffff',
    padding: 5
  },
  passwordInput: {
    backgroundColor: '#454a5b',
    height: 40,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#ffffff',
    marginBottom: 25,
    padding: 5
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    // resizeMode: 'cover'
  },
  button: {
    width: 100,
    backgroundColor: '#3a4d99',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default class Login extends Component {
  static propTypes = {
    state: React.PropTypes.object,
    login: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLogin() {
    const { login } = this.props;
    const { email, password } = this.state;

    login(email, password);
  }

  render() {
    const { state } = this.props;

    if (state.auth.loggingIn) {
      return (
        <View style={styles.main}>
          <CenteredText text="Logging in."/>
        </View>
      );
    }

    return (
      <View style={styles.main} onStartShouldSetResponder={dismissKeyboard}>
        <Image
          style={styles.background}
          source={{ uri: 'http://app.fitbird.com/app/static/img/background-bird.png' }}
        >
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={styles.emailInput}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#a9a9a9"
            keyboardAppearance="dark"
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onSubmitEditing={(event) => {
              this.refs.passwordInput.focus();
            }}
          />
          <TextInput
            ref="passwordInput"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={styles.passwordInput}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Password"
            placeholderTextColor="#a9a9a9"
            secureTextEntry
            keyboardAppearance="dark"
            returnKeyType="go"
            enablesReturnKeyAutomatically
            onSubmitEditing={this.onPressLogin.bind(this)}
          />
          <TouchableOpacity style={styles.touchable} onPress={this.onPressLogin.bind(this)}>
            <View style={styles.button}><Text style={styles.buttonText}>Login</Text></View>
          </TouchableOpacity>
          <KeyboardSpacer/>
        </Image>
      </View>
    );
  }
}
