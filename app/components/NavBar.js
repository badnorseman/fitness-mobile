const React = require('react-native');
const {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity
} = React;

import { Icon } from 'react-native-icons';

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500'
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
    marginVertical: 10
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 3,
    flexDirection: 'row'
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {}
});

const NavigationBarRouteMapper = {
  LeftButton: function LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    let leftButtonText = previousRoute.title;

    switch (route.id) {
      case 'exercise':
      case 'feedback':
        leftButtonText = 'Workout'; break;
      case 'video':
      case 'history':
        leftButtonText = 'Exercise'; break;
      case 'workout':
      case 'habits':
        leftButtonText = 'Dashboard'; break;
      case 'habit':
        leftButtonText = 'Habits'; break;
      default:
        leftButtonText = 'Back'; break;
    }

    if (route.id === 'edit') {
      return <Text/>;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Icon
          name="ion|ios-arrow-back"
          size={26}
          color="white"
          style={styles.backIcon}
        />
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {leftButtonText}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function RightButton(route, navigator) {
    if (route.id === 'dashboard') {
      return (<TouchableOpacity
        onPress={() => navigator.props.logout()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Log out
        </Text>
      </TouchableOpacity>);
    }

    if (route.id === 'exercise') {
      return (<TouchableOpacity
        onPress={() => navigator.push({
          id: 'edit',
          props: route.props
        })}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Edit
        </Text>
      </TouchableOpacity>);
    }

    if (
        route.id === 'workout' &&
        route.props.workout &&
        route.props.workout.feedback &&
        route.props.workout.feedback.type
    ) {
      return (<TouchableOpacity
        onPress={() => navigator.push({
          id: 'feedback',
          props: route.props
        })}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Edit
        </Text>
      </TouchableOpacity>);
    }

    if (route.id === 'edit') {
      return (<TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Done
        </Text>
      </TouchableOpacity>);
    }

    return <Text/>;
  },

  Title: function Title(route) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  }
};

module.exports = NavigationBarRouteMapper;
