import React, {
  StyleSheet,
  Component,
  TouchableHighlight,
  ListView,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'PT Sans',
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
  }
});

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({id: 'exercise', props: {exercise: rowData}})}>
        <View>
          <View style={(rowData.active ? [styles.row, styles.rowActive] : styles.row)}>
            <Text style={[styles.text, styles.name]}>
              {rowData.name}
            </Text>
            <Text style={(rowData.active ? [styles.text, styles.details, styles.detailsActive] : [styles.text, styles.details])}>
              Test
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID, rowData){
    console.log('pressed', rowID);
    this.props.navigator.push({id: 'exercise'});
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.exercises || []);

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}
