import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import ParentView from '../../ParentView';
import { getDaysDifference } from '../../../util/dateTimeUtil';
import { normalisedSource } from '../../../util/ArrayUtil';
import Images from '../../../Constants/imageConstants';
import FloatingButtonComponent from '../../detailing/FloatingButtonComponent';

export default class ContentHubComponent extends React.Component {
  renderLatestCaseStudies() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const { latest_case_studies } = data;
    const { goToContentDetail } = this.props;
    if (latest_case_studies && latest_case_studies.length !== 0) {
      return (
        <View style={styles.caseStudyContainer}>
          <Text style={styles.caseStudyHeading}>Latest Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                            latest_case_studies.map((content) => {
                              const {
                                content_id, title, thumbnail_url, publish_date
                              } = content;
                              return (
                                <TouchableOpacity style={styles.content} key={content_id} onPress={() => { goToContentDetail(content); }}>
                                  <Image source={{ uri: normalisedSource(thumbnail_url) }} style={styles.contentThumbnail} resizeMode="contain" />

                                  <View style={styles.contentDescView}>
                                    <Text style={styles.contentTitle}>{title}</Text>
                                    <Text style={styles.contentDesc}>{`${getDaysDifference(publish_date)} Day Ago`}</Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })
                        }
          </ScrollView>
        </View>
      );
    }
    return null;
  }

  renderBrandHeading() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const { items } = data;
    let { selectedSpeciality } = this.props;
    if (!selectedSpeciality) {
      selectedSpeciality = items[0];
    }
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.brandHeading}>Brands</Text>
        <TouchableOpacity
          style={styles.specialityButton}
          onPress={() => {
            if (this.SpecialityActionSheet) {
              this.SpecialityActionSheet.show();
            }
          }}
        >
          <Text style={styles.specialityButtonText}>{selectedSpeciality ? selectedSpeciality.spec_desc : 'Select Speciality'}</Text>
          <Image style={styles.specialityButtonIcon} source={Images.DropDown} />
        </TouchableOpacity>
      </View>
    );
  }

  renderBrandList() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const { items } = data;
    let { selectedSpeciality } = this.props;
    if (!selectedSpeciality) {
      selectedSpeciality = items[0];
    }
    const brands = selectedSpeciality ? selectedSpeciality.brands : [];
    const { goToBrandDetail } = this.props;
    return (
      <View>
        {brands.map((item) => (
          <TouchableOpacity
            key={item.brand_name}
            style={styles.brandRow}
            onPress={() => {
              goToBrandDetail(item);
            }}
          >
            <Text>{item.brand_name}</Text>
            <Icon style={styles.brandRowIcon} name="chevron-right" type="FontAwesome" />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

    renderSpecialityActionSheet = () => {
      const { data, selectSpeciality } = this.props;
      if (!data) {
        return null;
      }
      const { items } = data;
      if (items) {
        return (
          <ActionSheet
            ref={(o) => this.SpecialityActionSheet = o}
            title="Choose Speciality"
            options={items.map((spec) => spec.spec_desc)}
            onPress={(index) => {
              selectSpeciality(items[index]);
            }}
          />
        );
      }
      return null;
    };

    render() {
      const {
        loading, connected, onRefresh, shareButtonDisabled
      } = this.props;

      return (
        <ParentView
          onRefresh={onRefresh}
          loading={loading || shareButtonDisabled}
          style={styles.container}
          connected={connected}
        >
          <FloatingButtonComponent
            navigation={this.props.navigation}
          />
          <ScrollView>
            {this.renderLatestCaseStudies()}
            {this.renderBrandHeading()}
            {this.renderBrandList()}
            {this.renderSpecialityActionSheet()}
          </ScrollView>
        </ParentView>
      );
    }
}
