'use strict';

var React = require('react-native');
var {
  PixelRatio,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} = React;

import { Icon } from 'react-native-icons';

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    var leftButtonText = previousRoute.title;

    switch(route.id){
      case 'exercise':
        leftButtonText = 'Workout'; break;
      case 'video':
        leftButtonText = 'Exercise'; break;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Icon
          name='ion|ios-arrow-back'
          size={26}
          color='white'
          style={styles.backIcon}
        />
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {leftButtonText}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    if(route.id === 'dashboard'){
      return <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Log out
        </Text>
      </TouchableOpacity>;
    } else if(route.id === 'exercise'){
      return <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Edit
        </Text>
      </TouchableOpacity>;
    }

    return;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

var styles = StyleSheet.create({
  button: {
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  backIcon: {
    width: 26,
    height: 26,
    marginTop: 7,
    marginRight: -1
  },
  navBarText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 3,
    flexDirection: 'row'
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
  }
});

module.exports = NavigationBarRouteMapper;
