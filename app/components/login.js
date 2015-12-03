import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    alignItems: 'center',
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    backgroundColor: '#3a4d99',
    color: '#ffffff',
    height: 40,
    fontWeight: 'bold',
    lineHeight: 28,
    textAlign: 'center'
  },
  toucable: {
    marginTop: 20
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLogin() {
    const { login } = this.props;
    const { email, password } = this.state;

    login(email, password);
    // this.props.navigator.replace({ id: 'dashboard', title: 'Dashboard' });
  }

  render() {
    return (
      <View style={styles.main}>
        <Image
          style={styles.background}
          source={{uri: 'http://app.fitbird.com/app/static/img/background-bird.png'}}
        >
          <TextInput
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            style={styles.emailInput}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='Email...'
            placeholderTextColor='#a9a9a9'
          />
          <TextInput
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            style={styles.passwordInput}
            autoCapitalize='none'
            keyboardType='default'
            placeholder='Password...'
            placeholderTextColor='#a9a9a9'
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.touchable} onPress={this.onPressLogin.bind(this)}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}
