import React, { Component } from 'react';
import { Card } from 'native-base';
import { ImageBackground, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';

class TplUserSelectionComponent extends Component {
  render() {
    const {
      loading, divisions, selectDivision, roles, selectRole, employees, goToTpl
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <ImageBackground source={Images.ic_bg_main_2} style={styles.headerImg}>
          <View style={styles.content}>
            <Card>
              <Text style={styles.textHeading}>
                Select Employee to enter Premier League Dashboard
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
                  data={roles}
                  valueExtractor={(role) => role}
                  labelExtractor={(role) => role}
                  onChangeText={(value, index, data) => {
                    selectRole(data[index]);
                  }}
                />

                <Dropdown
                  label="Select Employee"
                  data={employees}
                  valueExtractor={({ name }) => name}
                  labelExtractor={({ name }) => name}
                  onChangeText={(value, index, data) => {
                    goToTpl(data[index]);
                  }}
                />
              </View>
            </Card>
          </View>

        </ImageBackground>

      </ParentView>
    );
  }
}

export default TplUserSelectionComponent;
