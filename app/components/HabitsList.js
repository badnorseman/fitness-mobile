import React, {
  StyleSheet,
  Component,
  ListView
} from 'react-native';

import HabitsRow from './HabitsRow';

const styles = StyleSheet.create({
});

export default class HabitsList extends Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  _renderRow(rowData, sectionID, rowID) {
    return <HabitsRow {...this.props} habit={rowData} key={rowID} />;
  }

  render() {
    const { state } = this.props;
    const habits = state.habits.all.data;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(habits || []);

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}
