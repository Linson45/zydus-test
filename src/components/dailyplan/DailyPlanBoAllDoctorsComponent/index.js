import React from 'react';
import {
  ScrollView, View, Text, TextInput, TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';
import ParentView from '../../ParentView';
import styles from './styles';

import ColorStyles from '../../../styles/colorsStyles';

export default class DailyPlanBoAllDoctorsComponent extends React.Component {
  renderSearch() {
    const { searchText, searchQuery } = this.props;
    return (
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => searchText(text)}
        value={searchQuery}
      />
    );
  }

  renderDetails() {
    const {
      data, onChange, selected, doctors_planned
    } = this.props;
    if (data && Array.isArray(data)) {
      return data.map((doctor, index) => {
        const { doc_name, doc_spec } = doctor;
        if (doctors_planned && doctors_planned.includes(doctor.doc_code)) {
          return null;
        }
        return (
          <View style={styles.topRow} key={index}>
            <View style={styles.leftTopRow}>
              <Text style={styles.doctorName}>
                {doc_name}
              </Text>
              <Text style={styles.doctorSPec}>
                {doc_spec}
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <CheckBox
                onClick={() => onChange(index, doctor)}
                isChecked={Boolean(selected && selected[index])}
                checkBoxColor={ColorStyles.content}
              />
            </View>
          </View>
        );
      });
    }
    return null;
  }

  render() {
    const { loading, save, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        {this.renderSearch()}
        <ScrollView style={styles.mainView}>
          {this.renderDetails()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              save();
            }}
          >
            <Text style={styles.buttonText}>Add Doctor</Text>
          </TouchableOpacity>
        </View>
      </ParentView>
    );
  }
}
