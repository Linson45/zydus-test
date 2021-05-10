import React from 'react';
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import RouteModalComponent from './routeModal';
import ColorStyles from '../../../styles/colorsStyles';
import DoctorModalComponent from './drModal';

class BoAddComponent extends React.Component {
  renderDetails() {
    const {
      openRoutes, selectedRoute, onChangeText, comment, submitComment, reset, bo_data, item, date, gotoSuggestedDoctors, toggleDoctorListModal, can_edit
    } = this.props;
    const buttonDisableStyle = can_edit ? null : { backgroundColor: ColorStyles.gray_light };
    const textDisabled = can_edit ? layoutStyles.blackText : layoutStyles.grayDisabledText;
    let selectedDoctorCount = 0;
    bo_data.forEach((doc) => {
      if (doc.hasOwnProperty('doc_code') && doc.doc_code) {
        selectedDoctorCount++;
      }
    });

    const abmVisit = item.hasOwnProperty('abm_code') && item.abm_code ? (
      <>
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>ABM</Text>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}>{item.abm_name}</Text>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
      </>
    ) : null;

    const rbmVisit = item.hasOwnProperty('rbm_code') && item.rbm_code ? (
      <>
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>RBM Visting your HQ</Text>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}>{item.rbm_name}</Text>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>RBM Comment</Text>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}>{item.rbm_comment}</Text>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
      </>
    ) : null;

    return (
      <>
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>Date</Text>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}>{date}</Text>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
        {rbmVisit}
        {abmVisit}
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>Routes</Text>
            <TouchableOpacity
              opaque={1}
              onPress={() => {
                if (can_edit) {
                  openRoutes();
                }
              }}
            >
              <Text
                style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}
              >
                {selectedRoute && selectedRoute.route ? selectedRoute.route : 'Select Route'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
        <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
          <View style={[layoutStyles.column]}>
            <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>MCR Doctor</Text>
            <View style={[layoutStyles.topRow, { width: '100%' }]}>
              <TouchableOpacity
                opaque={1}
                onPress={() => {
                  if (can_edit) {
                    gotoSuggestedDoctors();
                  }
                }}
                style={[layoutStyles.leftTopRow]}
              >
                <Text
                  style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}
                >
                  {selectedDoctorCount}
                  {' '}
                  doctors
                  selected
                </Text>
              </TouchableOpacity>
              <View style={[layoutStyles.rightTopRow]}>
                <TouchableOpacity opaque={1} onPress={toggleDoctorListModal}>
                  <Icon
                    name="info"
                    type="Feather"
                    style={[{ color: ColorStyles.gray_dark }, LightFontStyle.fontLarge]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
        <View style={[layoutStyles.topRow, layoutStyles.mv10]}>
          <TextInput
            editable={Boolean(can_edit)}
            style={[{
              height: 80,
              borderColor: can_edit ? ColorStyles.blue_coachmapdetails : ColorStyles.gray_light,
              borderWidth: 1,
              width: '100%',
              padding: 10,
              borderRadius: 10
            }]}
            placeholder="Add Comment"
            onChangeText={(text) => onChangeText(text)}
            multiline
            value={comment}
          />
        </View>
        <View style={[{
          padding: 10,
          alignItems: 'flex-end',
          flexDirection: 'row-reverse',
          flex: 1,
          margin: 20
        }]}
        >
          <TouchableOpacity
            style={[styles.buttonRight, buttonDisableStyle]}
            opacity={1}
            onPress={() => {
              if (can_edit) {
                submitComment();
              }
            }}
          >
            <Text
              style={styles.buttonRightText}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonLeft, buttonDisableStyle]}
            opacity={1}
            onPress={() => {
              if (can_edit) {
                reset();
              }
            }}
          >
            <Text
              style={styles.buttonLeftText}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  render() {
    const {
      loading, isDoctorListOpen, isRouteModalOpen, toggleRouteModal, toggleDoctorListModal, tourplanRoutes, selectRoute, bo_data
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          {this.renderDetails()}
          <RouteModalComponent
            isRouteModalOpen={isRouteModalOpen}
            toggleRouteModal={toggleRouteModal}
            tourplanRoutes={tourplanRoutes}
            selectRoute={selectRoute}
          />
          <DoctorModalComponent
            isDoctorListOpen={isDoctorListOpen}
            toggleDoctorListModal={toggleDoctorListModal}
            data={bo_data}
          />
        </ScrollView>
      </ParentView>
    );
  }
}

export default BoAddComponent;
