import React, { Component, StyleSheet, Text, View } from 'react-native';
import HabitList from './HabitList';
import NAVBAR_PADDING from '../constants/navbar_padding';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: NAVBAR_PADDING,
    backgroundColor: 'rgba(46, 49, 58, 1)'
  },
  titleContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  title: {
    color: '#ffffff',
    fontSize: 18
  },
  paragraphContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15
  },
  paragraph: {
    color: '#ffffff'
  }
});

export default class Habits extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>It’s time to choose a habit</Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>Good habits are the key to long term success regardless what your goal is. Pick one of the habits below to do daily for the next two weeks. Start with something you’re certain you can do and build on it.</Text>
        </View>
        <HabitList {...this.props} />
      </View>
    );
  }
}
