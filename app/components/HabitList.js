import React, { Component, ListView, Text, View } from 'react-native';
import HabitListRow from './HabitListRow';
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

export default class HabitList extends Component {
  static propTypes = {
    state: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionId, rowId) {
    return <HabitListRow {...this.props} habit={rowData} key={rowId} />;
  }

  render() {
    const { state } = this.props;
    const habits = state.habit.all.data;
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    const dataSource = ds.cloneWithRows(habits || []);

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>It’s time to choose a habit</Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>
            Good habits are key to success regardless what your goal is.
            Choose one of the habits to do daily for the next two weeks.
            Start with something you’re certain you can do and build on it.
          </Text>
        </View>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
