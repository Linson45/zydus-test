import React from 'react';
import {
  Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import styles from './styles';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import RouteModalComponent from './routeModal';
import ColorStyles from '../../../styles/colorsStyles';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';

class AbmAddComponent extends React.Component {
  renderDetails() {
    const {
      openRoutes, selectedRoute, onChangeText, comment, submitComment, reset, item, date, checkRbmComment, gotoAddBo, bo_names, can_edit
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
          {item.rbm_name ? (
            <>
              <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
                <View style={[layoutStyles.column]}>
                  <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>
                    JFW planned
                    by
                    {item.rbm_name}
                  </Text>
                  <View style={[layoutStyles.topRow, { width: '100%' }]}>
                    <TouchableOpacity
                      opaque={1}
                      style={[layoutStyles.leftTopRow]}
                    >
                      <Text
                        style={[layoutStyles.mv5, FontStyle.fontLarge, textDisabled]}
                      >
                        {item.rbm_jfw_bo_names && item.rbm_jfw_bo_names.map((value) => `${value}, `)}
                      </Text>
                    </TouchableOpacity>
                    <View style={[layoutStyles.rightTopRow]}>
                      <TouchableOpacity opaque={1} onPress={checkRbmComment}>
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
            </>
          ) : null}
          <View style={[layoutStyles.topRow, layoutStyles.mh10]}>
            <View style={[layoutStyles.column]}>
              <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>MCR Doctor</Text>
              <View style={[layoutStyles.topRow, { width: '100%' }]}>
                <TouchableOpacity
                  opaque={1}
                  onPress={() => {
                    if (can_edit) {
                      gotoAddBo();
                    }
                  }}
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
    return null;
  }

  renderRbmCommentModal() {
    const { isRbmCommentOpen, data, checkRbmComment } = this.props;
    if (data) {
      return (
        <Modal
          isVisible={isRbmCommentOpen}
          onRequestClose={checkRbmComment}
        >
          <View style={[{
            backgroundColor: 'white',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }]}
          >
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                  Comment by RBM
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={checkRbmComment}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Text>
                {data && data.rbm_comment}
              </Text>
            </ScrollView>
          </View>
        </Modal>
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
          {this.renderRbmCommentModal()}
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

export default AbmAddComponent;
