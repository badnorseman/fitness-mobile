'use strict';

import React, { Component, Navigator, StatusBarIOS } from 'react-native';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';

import NavigationBarRouteMapper from '../components/navbar';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import Workout from '../components/workout';
import Exercise from '../components/exercise';
import Video from '../components/video';

import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux/native';


@connect(state => ({
  state: state.counter
}))
class FitbirdApp extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    switch(route.id){
      case 'login':
        return <Login {...route.props} navigator={navigator} {...bindActionCreators(counterActions, this.props.dispatch)}/>;
      case 'dashboard':
        return <Dashboard {...route.props} navigator={navigator} {...bindActionCreators(counterActions, this.props.dispatch)}/>;
      case 'workout':
        return <Workout {...route.props} navigator={navigator} {...bindActionCreators(counterActions, this.props.dispatch)}/>;
      case 'exercise':
        return <Exercise {...route.props} navigator={navigator} {...bindActionCreators(counterActions, this.props.dispatch)}/>;
      case 'video':
        return <Video {...route.props} navigator={navigator} {...bindActionCreators(counterActions, this.props.dispatch)}/>;
    }
  }

  render() {
    StatusBarIOS.setStyle('light-content');
    const { state, dispatch } = this.props;

    return (
      <Navigator
        style={{
          flex: 1,
          backgroundColor: 'rgba(46, 49, 58, 1)'
        }}
        //barTintColor='#292c34'
        //titleTextColor='#ffffff'
        initialRoute={{id: 'login', title: 'Login'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={{
              backgroundColor: 'rgba(41, 44, 52, 0.98)'
            }}
          />
        }
      />
    );
  }
}

export default FitbirdApp;
