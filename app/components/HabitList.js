import React, { Component, ListView } from 'react-native';
import HabitListRow from './HabitListRow';

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
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
