import React from 'react';
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';
import { FontStyle } from '../../../styles/fontsStyles';
import ColorStyles from '../../../styles/colorsStyles';
import styles from './styles';
import RouteModalComponent from './routeModal';

class RbmAddComponent extends React.Component {
  renderDetails() {
    const {
      openRoutes, selectedRoute, onChangeText, comment, submitComment, reset, item, date, gotoAddBo, bo_names, can_edit
    } = this.props;
    const buttonDisableStyle = can_edit ? null : { backgroundColor: ColorStyles.gray_light };
    const textDisabled = can_edit ? layoutStyles.blackText : layoutStyles.grayDisabledText;
    if (item) {
      return (
        <>
          <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
            <View>
              <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>Date</Text>
              <Text style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}>{date}</Text>
            </View>
          </View>
          <View style={layoutStyles.lineStyle} />
          <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
            <View>
              <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>Routes</Text>
              <TouchableOpacity opaque={1} onPress={() => { if (can_edit) { openRoutes(); } }}>
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
                  onPress={() => { if (can_edit) { gotoAddBo(); } }}
                  style={[layoutStyles.leftTopRow]}
                >
                  <Text
                    style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}
                  >
                    {bo_names && bo_names.map((value) => `${value}, `)}
                  </Text>
                </TouchableOpacity>
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
              style={styles.buttonRight}
              opacity={1}
              onPress={() => {
                if (can_edit) {
                  submitComment();
                }
              }}
            >
              <Text
                style={[styles.buttonRightText, buttonDisableStyle]}
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
    return null;
  }

  render() {
    const {
      loading, isRouteModalOpen, toggleRouteModal, tourplanRoutes, selectRoute
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
        </ScrollView>
      </ParentView>
    );
  }
}

export default RbmAddComponent;
