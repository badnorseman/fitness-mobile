import React, {
  StyleSheet,
  Component,
  TouchableHighlight,
  ListView,
  View,
  Text
} from 'react-native';

import { Icon } from 'react-native-icons';

import ExerciseRow from './exerciserow';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)'
  },
  row: {
    justifyContent: 'center',
    padding: 10,
    height: 65,
    backgroundColor: 'rgba(59, 79, 151, 1)',
  },
  rowActive: {
    backgroundColor: 'rgba(62, 152, 91, 1)'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(46, 49, 58, 1)',
  },
  text: {
    flex: 1
  },
  name: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  },
  details: {
    color: 'rgba(120, 141, 216, 1)',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20
  },
  detailsActive: {
    color: 'rgba(176, 214, 189, 1)'
  },
  container: {},
  exchange: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: 55,
    transform: [{rotate:'90deg'}],
    opacity: 1,
    backgroundColor: 'transparent'
  }
});

function getIconColor(workout) {
  if (!workout.startDT) {
    return 'rgb(128, 128, 128)';
  } else {
    return 'rgb(255, 255, 255)';
  }
}

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
  }

  _renderRow(rowData, sectionID, rowID) {
    const { workout, workoutNum } = this.props;

    const exercises = rowData.exercises.map((exercise, i) => {
      return (<ExerciseRow key={i} workout={workout} workoutNum={workoutNum} exerciseGroup={rowData} exercise={exercise} overview={workout.overview[rowID][i]}/>);
    });

    const exchange = (rowData.exercises.length > 1 ? (<Icon
      name='ion|arrow-swap'
      size={20}
      color={getIconColor(workout)}
      style={[styles.exchange, { opacity: (!workout.endDT ? 1 : 0.7) }]}
    />) : null);

    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({id: 'exercise', props: {workout: workout, workoutNum: workoutNum, exerciseGroup: rowData, exerciseGroupId: rowID, overview: workout.overview[rowID]}})}>
        <View style={styles.container}>
          {exercises}
          {exchange}
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.exerciseGroups || []);

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}
