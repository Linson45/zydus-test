import React from 'react';
import { Card } from 'native-base';
import {
  ImageBackground, Text, View, TouchableOpacity
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';
import { Role } from '../../../util/Constants';

const userLevel = [
  { value: Role.BO, label: Role.BO },
  { value: Role.ABM, label: Role.ABM },
  { value: Role.RBM, label: Role.RBM },
  { value: Role.ZBM, label: Role.ZBM },
];

export default class HoUseSelectionComponent extends React.Component {
  render() {
    const {
      loading,
      hoverLoading,
      divisions,
      selectDivision,
      selectDesignation,
      employee,
      openActionItems,
      resetDropdown,
      submitData,
      connected
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
      >
        <ImageBackground source={Images.ic_bg_main_2} style={styles.headerImg}>
          <View style={styles.content}>
            <Card>
              <Text style={styles.textHeading}>
                Select Employees to enter Action Item Dashboard
              </Text>

              <View style={styles.dropDownView}>
                <Dropdown
                  label="Select Division"
                  data={divisions}
                  valueExtractor={({ div_id }) => div_id}
                  labelExtractor={({ div_name }) => div_name}
                  onChangeText={(value, index, data) => {
                    selectDivision(data[index]);
                  }}
                />

                <Dropdown
                  label="Select Designation"
                  data={userLevel}
                  onChangeText={(value, index, data) => {
                    selectDesignation(data[index]);
                  }}
                />

                <Dropdown
                  label="Select Employee"
                  data={employee != null ? employee : []}
                  valueExtractor={({ rep_code }) => rep_code}
                  labelExtractor={({ name }) => name}
                  onChangeText={(value, index, data) => {
                    openActionItems(data[index]);
                  }}
                />
                <View style={styles.container}>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => {
                      resetDropdown();
                    }}
                  >
                    <Text style={{ color: 'white' }}>Reset</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                      submitData();
                    }}
                  >
                    <Text style={{ color: 'white' }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        </ImageBackground>
      </ParentView>
    );
  }
}
