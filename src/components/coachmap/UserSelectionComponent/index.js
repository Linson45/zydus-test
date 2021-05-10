import React, { Component } from 'react';
import { Card } from 'native-base';
import { ImageBackground, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';

class UserSelectionComponent extends Component {
  render() {
    const {
      loading, hoverLoading, divisions, selectDivision, regions, selectRegion, connected
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
                Select Region to enter Coachmap / Leadermap
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
                  label="Select Region"
                  data={regions}
                  valueExtractor={({ reg_id }) => reg_id}
                  labelExtractor={({ reg_name }) => reg_name}
                  onChangeText={(value, index, data) => {
                    selectRegion(data[index]);
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

export default UserSelectionComponent;
