import React from 'react';
import {
  Image, ImageBackground, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import { Text } from 'native-base';
import styles from './styles';
import { Role } from '../../../util/Constants';
import { getLastSixMonthAndYear } from '../../../util/dateTimeUtil';

const userLevel = [{ value: Role.BO, label: Role.BO }];
const userLevelABM = [{ value: Role.BO, label: Role.BO }, { value: Role.ABM, label: Role.ABM }];
const userLevelRBM = [{ value: Role.BO, label: Role.BO }, { value: Role.ABM, label: Role.ABM }, { value: Role.RBM, label: Role.RBM }];
const userLevelZBM = [{ value: Role.BO, label: Role.BO }, { value: Role.ABM, label: Role.ABM }, { value: Role.RBM, label: Role.RBM }, { value: Role.ZBM, label: Role.ZBM }];
export default class SelectFilterByTplComponent extends React.Component {
  renderSbus() {
    const {
      sbu_grp_code,
      loading,
      divisions,
      changeTime,
      changeDivision,
      changeUserType,
      month,
      reloadData,
      sbu_code,
      user_type,
      closeModal,
      loadData,
      rank_type,
      changeSbuGroupCode,
      sbus,
    } = this.props;

    if (!loading) {
      return (
        <View>
          <ImageBackground
            style={styles.imageTop}
            source={require('../../../../assets/images/ic_myperformance_list_header.png')}
          >
            <Text style={styles.filterHeader}>Filter By</Text>
            <TouchableOpacity
              style={styles.closeButton}
              opacity={1}
              onPress={closeModal}
            >
              <Image
                style={styles.closeButtonIcon}
                source={require('../../../../assets/images/ic_close.png')}
              />
            </TouchableOpacity>

          </ImageBackground>

          <View style={{ padding: 10 }}>
            <Dropdown
              label="Select Time"
              value={month}
              data={getLastSixMonthAndYear()}
              onChangeText={(value, index, data) => {
                changeTime(data[index]);
              }}
            />

            {rank_type === 'SBU' ? (
              <Dropdown
                label="Select Cluster"
                value={sbu_grp_code || ''}
                data={sbus}
                valueExtractor={(value) => value}
                labelExtractor={(value) => value}
                onChangeText={(value, index, data) => {
                  changeSbuGroupCode(data[index]);
                }}
              />
            ) : (
              <Dropdown
                label="Select Division"
                value={sbu_code}
                data={divisions}
                valueExtractor={({ code }) => code}
                labelExtractor={({ name }) => name}
                onChangeText={(value, index, data) => {
                  changeDivision(data[index]);
                }}
              />
            )}

            <Dropdown
              label="Select Level"
              value={user_type}
              data={
                user_type === Role.BO
                  ? userLevel
                  : user_type === Role.ABM
                    ? userLevelABM
                    : user_type === Role.RBM
                      ? userLevelRBM
                      : user_type === Role.ZBM
                        ? userLevelZBM
                        : null
              }
              onChangeText={(value) => {
                changeUserType(value);
              }}
            />
          </View>
          <View
            style={[
              {
                padding: 10,
                alignItems: 'flex-end',
                flexDirection: 'row-reverse',
                flex: 1,
                margin: 20,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonRight}
              opacity={1}
              onPress={() => {
                closeModal();
                loadData();
              }}
            >
              <Text style={styles.buttonRightText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLeft}
              opacity={1}
              onPress={reloadData}
            >
              <Text style={styles.buttonLeftText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { isVisible, closeModal } = this.props;

    return (
      <Modal onRequestClose={closeModal} isVisible={isVisible}>
        <View style={{ ...styles.content }}>
          {/* {loading ? <Spinner color={ColorsStyles.colorPrimary}/> : null} */}
          {this.renderSbus()}
        </View>
      </Modal>
    );
  }
}
