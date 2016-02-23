'use strict';
import React, {
  Component,
  ListView,
  StyleSheet
} from 'react-native';

import HabitsRow from './HabitsRow';

class HabitList extends Component {
  constructor(props) {
    super(props);
  }

  renderRow(rowData, sectionId, rowId) {
    return <HabitsRow {...this.props} habit={rowData} key={rowId} />;
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
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
};

HabitList.propTypes = {
  state: React.PropTypes.object
};

export default HabitList
