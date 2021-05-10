import React, { Component } from 'react';
import { Container, Icon } from 'native-base';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {
  ScrollView, TouchableOpacity, View, Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import ImageLoad from 'react-native-image-placeholder';
import Colors from '../../../styles/colorsStyles';
import styles from './styles';
import ParentView from '../../ParentView';
import { dynamicSort } from '../../../util/ArrayUtil';
import { secondsToHms } from '../../../util/dateTimeUtil';

class EDetailingBrandDrComponent extends Component {
  renderTabHistory() {
    const {
      startSingleShowCase,
      sharedHistory,
      isToday
    } = this.props;
    const renderedData = sharedHistory.map((datum, index) => {
      const formatted = datum.total_time ? +datum.total_time : 0;
      return (
        <View style={styles.item} key={index}>
          <View style={styles.left}>
            <ImageLoad
              loadingStyle={{ size: 'large', color: 'blue' }}
              source={{ uri: datum.thumbnail_location ? datum.thumbnail_location : datum.thumbnail }}
              style={styles.imageTop}
            />
            <View style={styles.besideImage}>
              <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                <Text style={styles.vaName}>{datum.title ? datum.title : datum.content_title}</Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.lastSharedBottonText}>
                  Last Shared:
                  {' '}
                  {datum.session_date}
                </Text>

                <Text style={styles.durationText}>
                  Duration:
                  {' '}
                  {secondsToHms(formatted)}
                </Text>
              </View>
            </View>
          </View>
          {isToday
            ? (
              <View style={styles.right}>
                { datum.isOffline
                  ? (
                    <TouchableOpacity style={styles.startDirectDetailing} onPress={() => startSingleShowCase(datum)}>
                      <Text style={styles.startDirectDetailing.text}>Start Detailing</Text>
                    </TouchableOpacity>
                  )
                  : <Text style={styles.startDetailingDisabledText}>Missing content from device</Text>}
              </View>
            )
            : null}
        </View>
      );
    });
    return (
      <ScrollView>
        {renderedData}
      </ScrollView>
    );
  }

  renderBrandScrollView(data, brandName) {
    const {
      gotoVA,
      toggleShowcase,
      sortType
    } = this.props;
    let items = JSON.parse(JSON.stringify(data));
    if (sortType) {
      if (sortType === 'asc') {
        items = items.sort(dynamicSort('title'));
      }
      if (sortType === 'desc') {
        items = items.sort(dynamicSort('-title'));
      }
    }
    if (items) {
      const renderedData = items.map((datum, index) => (
        <TouchableOpacity style={styles.item} key={index} onPress={() => gotoVA(datum)}>
          <View style={styles.left}>
            <ImageLoad
              loadingStyle={{ size: 'large', color: 'blue' }}
              source={{ uri: datum.thumbnail }}
              style={styles.imageTop}
            />
            <View style={styles.besideImage}>
              <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                <Text style={styles.vaName}>{datum.title}</Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.lastSharedBottonText}>
                  Last Shared
                  {' '}
                  {datum.last_shared}
                  {' '}
                  |
                  {datum.date}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.selectContentButton} onPress={() => gotoVA(datum)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            {
                                datum.in_showcase ? (
                                  <View style={styles.row}>
                                    <Icon
                                      style={styles.startDetailingText.icon}
                                      name="check"
                                      type="FontAwesome"
                                    />
                                    <Text
                                      style={[styles.startDetailingText, { color: Colors.contentBlue }]}
                                    >
                                      Added
                                    </Text>
                                  </View>
                                )
                                  : (
                                    <TouchableOpacity
                                      style={styles.startDetailingButton}
                                      onPress={() => toggleShowcase(brandName, index, true)}
                                    >
                                      <Text style={styles.addToShowCase}>+ Showcase</Text>
                                    </TouchableOpacity>
                                  )
                            }
          </View>
        </TouchableOpacity>
      ));
      return (
        <ScrollView>
          {renderedData}
        </ScrollView>
      );
    }
    return null;
  }

  renderSpecialityDropdown() {
    const {
      specialities, currentSpeciality, setCurrentSpeciality, isDirect
    } = this.props;
    if (isDirect) {
      return (
        <View style={styles.dropDownView}>
          <Dropdown
            itemCount={15}
            labelFontSize={0}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            containerStyle={styles.dropDown}
            label=""
            data={specialities}
            value={currentSpeciality ? currentSpeciality.speciality_name : 'Select Speciality'}
            valueExtractor={({ speciality }) => speciality}
            labelExtractor={({ speciality_name }) => speciality_name}
            onChangeText={(value, index, data) => {
              const speciality = data[index];
              setCurrentSpeciality(speciality);
            }}
          />
        </View>
      );
    }
    return null;
  }

  renderBrandTabs() {
    const {
      currentSpeciality,
      isDirect,
      brands,
    } = this.props;
    const that = this;
    if (!brands || !brands.length) {
      return this.renderNoContent();
    }
    const renderBrandTabHead = brands.map((brand) => {
      if (brand.data && brand.data.length !== 0) {
        const allowedData = [];
        brand.data.forEach((item) => {
          allowedData.push(item);
        });
        if (allowedData.length !== 0) {
          return (
            <View tabLabel={brand.name} key={brand.name}>
              {that.renderBrandScrollView(allowedData, brand.name)}
            </View>
          );
        }
      }
      return null;
    });
    return (
      <>
        {this.renderSpecialityDropdown()}
        {isDirect && !currentSpeciality ? null
          : (
            <View style={{ flex: 1 }}>
              <ScrollableTabView
                tabBarBackgroundColor={Colors.white}
                tabBarUnderlineStyle={{ backgroundColor: Colors.contentBlue, height: 1.5 }}
                tabBarInactiveTextColor={Colors.gray_dark}
                tabBarActiveTextColor={Colors.contentBlue}
                initialPage={0}
                renderTabBar={() => <DefaultTabBar />}
              >
                {renderBrandTabHead}
              </ScrollableTabView>
              <View style={styles.bottomView}>
                {this.renderBlankSpace()}
                {this.renderShowcaseToBeShown()}
                {this.renderBottomButtons()}
              </View>
            </View>
          )}
      </>
    );
  }

  renderBottomButtons() {
    const {
      startShowCase,
      previewShowCase,
      isToday,
      doctor,
      joinVirtualCall
    } = this.props;
    let virtual_call_schedule = false;

    if (doctor && doctor.virtual_call_schedule) {
      virtual_call_schedule = doctor.virtual_call_schedule;
    }

    if (isToday && virtual_call_schedule) {
      return (
        <View style={styles.bottomButtonsPart}>
          <TouchableOpacity style={styles.previewButtonPart} onPress={previewShowCase}>
            <Text style={styles.previewButton.text}>Preview</Text>
          </TouchableOpacity>
          <View style={styles.bottomButtonsRightPart}>
            <TouchableOpacity style={styles.previewButtonPart} onPress={joinVirtualCall}>
              <Text style={styles.previewButton.text}>Virtual detailing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButtonPart} onPress={startShowCase}>
              <Text style={styles.startButton.text}>Start E-detailing</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (isToday) {
      return (
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.previewButton} onPress={previewShowCase}>
            <Text style={styles.previewButton.text}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={startShowCase}>
            <Text style={styles.startButton.text}>Start E-detailing</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.previewButton} onPress={previewShowCase}>
          <Text style={styles.previewButton.text}>Preview</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTopTabs() {
    const {
      closeSharedHistory,
      openSharedHistory,
      showSharedHistory,
      isSharedHistory
    } = this.props;
    return (
      <>
        {isSharedHistory ? (
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={[styles.newButton, showSharedHistory ? {} : styles.active]}
              onPress={closeSharedHistory}
            >
              <Text style={styles.newButton.text}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sharedHistoryButton, showSharedHistory ? styles.active : {}]}
              onPress={openSharedHistory}
            >
              <Text style={styles.sharedHistoryButton.text}>Shared History</Text>
            </TouchableOpacity>
          </View>
        ) : null }
        {
                    showSharedHistory ? this.renderTabHistory() : this.renderBrandTabs()
                }
      </>
    );
  }

  renderSelectedSlide(brand, slide, index, vaPosition) {
    const {
      toggleShowcase
    } = this.props;
    return (
      <View style={styles.showcase} key={`${index} ${vaPosition}`}>
        <ImageLoad
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: slide.thumbnail }}
          style={styles.showcaseThumbnail}
        />
        <View style={styles.showcaseRightView}>
          <Text>{slide.name}</Text>
          <TouchableOpacity
            style={styles.showcaseRemove}
            onPress={() => {
              toggleShowcase(brand.name, index, false);
            }}
          >
            <Icon
              style={styles.showcaseRemove.icon}
              name="times-circle-o"
              type="FontAwesome"
            />
            <Text style={styles.showcaseRemove.text}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderShowcaseToBeShown() {
    const {
      brands,
    } = this.props;
    const renderBrandTabHead = [];
    const finalRenderBrandTabHead = [];
    const that = this;
    brands.forEach((brand) => {
      brand.data.forEach((slide, index) => {
        const {
          vaPosition,
          in_showcase,
        } = slide;
        if (in_showcase) {
          const renderedSlide = that.renderSelectedSlide(brand, slide, index, vaPosition);
          if (vaPosition && !renderBrandTabHead.hasOwnProperty(vaPosition)) {
            renderBrandTabHead[vaPosition] = renderedSlide;
          } else {
            renderBrandTabHead.push(
              renderedSlide
            );
          }
        }
      });
    });
    for (const render of renderBrandTabHead) {
      finalRenderBrandTabHead.push(
        render
      );
    }
    if (renderBrandTabHead.length) {
      return (
        <View style={styles.showcaseContainer}>
          <Text style={styles.showcaseHeading}>MY SHOWCASE SEQUENCE</Text>
          <ScrollView
            horizontal
          >
            {finalRenderBrandTabHead}
          </ScrollView>
        </View>
      );
    }
    return null;
  }

  renderBlankSpace() {
    return (
      <View style={styles.blank} />
    );
  }

    renderNoContent = () => {
      const {
        brands,
      } = this.props;
      if (!brands || !brands.length) {
        return (
          <Text style={styles.noData}>No Contents Available</Text>
        );
      }
      return null;
    };

    render() {
      const {
        loading,
        connected,
        hoverLoading,
      } = this.props;
      return (
        <>
          <ParentView
            loading={loading}
            connected={connected}
            hoverLoading={hoverLoading}
            style={styles.container}
          >
            <Container>
              {this.renderTopTabs()}
            </Container>
          </ParentView>
        </>
      );
    }
}

export default EDetailingBrandDrComponent;
