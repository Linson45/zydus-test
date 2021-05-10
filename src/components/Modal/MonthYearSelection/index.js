import React from 'react';
import {
  TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import { Text } from 'native-base';
import styles from './styles';
import { getLastMonthAndYear } from '../../../util/dateTimeUtil';

export default class MonthYearSelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      year: null
    };
  }

  changeTime(data) {
    const { month, year } = data;
    this.setState({
      month,
      year
    });
  }

  renderModal() {
    const {
      month, closeModal, changeQuery, lastMonths, year
    } = this.props;
    const selectedMonth = this.state.month ? this.state.month : month;
    const selectedYear = this.state.year ? this.state.year : year;
    let value = `${selectedYear}-${selectedMonth}`;
    if (!selectedMonth && !selectedYear) {
      value = 'Select Time';
    }
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Dropdown
            label="Select Time"
            value={value}
            data={getLastMonthAndYear(lastMonths)}
            onChangeText={(value, index, data) => {
              this.changeTime(data[index]);
            }}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonLeft} opacity={1} onPress={closeModal}>
            <Text style={styles.buttonLeftText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRight}
            opacity={1}
            onPress={() => {
              if (value !== 'Select Time') {
                closeModal();
                changeQuery(value);
              }
            }}
          >
            <Text style={styles.buttonRightText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { isVisible, closeModal } = this.props;

    return (

      <Modal isVisible={isVisible} onRequestClose={closeModal}>
        <View style={styles.container}>
          <View style={{ ...styles.content }}>
            {this.renderModal()}
          </View>
        </View>
      </Modal>
    );
  }
}
