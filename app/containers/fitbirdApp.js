'use strict';

import React, { Component, Navigator, StatusBarIOS } from 'react-native';
import { bindActionCreators } from 'redux';

import NavigationBarRouteMapper from '../components/navbar';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import Workout from '../components/workout';
import EditWorkout from '../components/editworkout';
import Exercise from '../components/exercise';
import Video from '../components/video';
import EditFeedback from '../components/editfeedback';

import * as authActions from '../actions/auth_actions';
import * as planActions from '../actions/plan_actions';
import * as dashboardActions from '../actions/dashboard_actions';
import * as appActions from '../actions/app_actions';
import { connect } from 'react-redux/native';

class FitbirdApp extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    state: React.PropTypes.object
  }

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
        return <Dashboard {...sharedProps} {...bindActionCreators({ ...dashboardActions }, this.props.dispatch)}/>;
      case 'workout':
        return <Workout {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'edit':
        return <EditWorkout {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'feedback':
        return <EditFeedback {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'exercise':
        return <Exercise {...sharedProps} {...bindActionCreators({ ...planActions }, this.props.dispatch)} />;
      case 'video':
        return <Video {...sharedProps} />;
      case 'login':
      default:
        return <Login {...sharedProps} {...bindActionCreators({ ...authActions }, this.props.dispatch)}/>;
    }
  }

  render() {
    StatusBarIOS.setStyle('light-content');

    return (
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
    );
  }
}

export default connect(state => ({ state: state }))(FitbirdApp);
