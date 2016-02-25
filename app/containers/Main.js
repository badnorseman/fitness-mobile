'use strict';
import React, { Component, Navigator, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import EditFeedback from '../components/EditFeedback';
import EditWorkout from '../components/EditWorkout';
import Exercise from '../components/Exercise';
import ExerciseHistory from '../components/ExerciseHistory';
import FitbirdStatusBar from '../components/FitbirdStatusBar';
import Habits from '../components/Habits';
import Login from '../components/Login';
import NavigationBarRouteMapper from '../components/NavBar';
import ShowHabit from '../components/ShowHabit';
import Video from '../components/Video';
import Workout from '../components/Workout';
import * as appActions from '../actions/app_actions';
import * as authActions from '../actions/auth_actions';
import * as countersActions from '../actions/counters_actions';
import * as dashboardActions from '../actions/dashboard_actions';
import * as habitActions from '../actions/habit_actions';
import * as planActions from '../actions/plan_actions';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(authActions.authByCookie());
  }

  componentWillReceiveProps(nextProps) {
    const currentRoute = this.refs.navigator.getCurrentRoutes()[0];

    if (nextProps.state.auth.ok && !Object.keys(nextProps.state.plan).length) {
      nextProps.dispatch(planActions.planLoad());
    }

    if (nextProps.state.auth.ok && !Object.keys(nextProps.state.habit.all).length && !nextProps.state.habit.all.loading && !nextProps.state.habit.all.loaded) {
      nextProps.dispatch(habitActions.getHabits());
    }

    if (nextProps.state.auth.ok && !Object.keys(nextProps.state.habit.started).length && !nextProps.state.habit.started.loading && !nextProps.state.habit.started.loaded) {
      nextProps.dispatch(habitActions.getStartedHabits());
    }

    if (currentRoute.id !== 'login' && nextProps.state.auth.logout) {
      nextProps.dispatch(authActions.clear());
      this.refs.navigator.replace({ id: 'login', title: 'Login' });
      return nextProps;
    }

    if (currentRoute.id === 'login' && nextProps.state.auth.ok) {
      this.refs.navigator.replace({ id: 'dashboard', title: 'Dashboard' });
      return nextProps;
    }

    if (nextProps.state.auth.ok === false && nextProps.state.auth.ok !== this.props.state.auth.ok) {
      nextProps.dispatch(appActions.alert('Authentication Failed', 'Please enter a valid e-mail and password'));
      nextProps.dispatch(authActions.clear());
      return nextProps;
    }
  }

  renderScene(route, navigator) {
    const sharedProps = {};

    Object.assign(
      sharedProps,
      route.props,
      {
        navigator: navigator,
        state: this.props.state,
        dispatch: this.props.dispatch
      }
    );

    switch (route.id) {
      case 'dashboard':
        return <Dashboard {...sharedProps} {...bindActionCreators({ ...dashboardActions, ...habitActions }, this.props.dispatch)}/>;
      case 'feedback':
        return <EditFeedback {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'edit':
        return <EditWorkout {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'exercise':
        return <Exercise {...sharedProps} {...bindActionCreators({ ...planActions, ...countersActions }, this.props.dispatch)} />;
      case 'history':
        return <ExerciseHistory {...sharedProps} />;
      case 'habits':
        return <Habits {...sharedProps} {...bindActionCreators({ ...habitActions }, this.props.dispatch)} />;
      case 'habit':
        return <ShowHabit {...sharedProps} {...bindActionCreators({ ...habitActions }, this.props.dispatch)} />;
      case 'video':
        return <Video {...sharedProps} />;
      case 'workout':
        return <Workout {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'login':
      default:
        return <Login {...sharedProps} {...bindActionCreators({ ...authActions }, this.props.dispatch)}/>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FitbirdStatusBar />
        <Navigator
          ref="navigator"
          style={{
            flex: 1,
            backgroundColor: 'rgba(46, 49, 58, 1)'
          }}
          initialRoute={{ id: 'login', title: 'Fitbird' }}
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper}
              style={{
                backgroundColor: 'rgba(41, 44, 52, 0.98)'
              }}
            />
          }
          logout={() => this.props.dispatch(authActions.logout())}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

Main.propTypes = {
  dispatch: React.PropTypes.func,
  state: React.PropTypes.object
};

export default connect(state => ({ state: state }))(Main);
