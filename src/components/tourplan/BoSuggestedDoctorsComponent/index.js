import React from 'react';
import {
  ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import CheckBox from 'react-native-check-box';
import styles from './styles';
import ParentView from '../../ParentView';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';

class BoSuggestedDoctorsComponent extends React.Component {
  renderSelectedDoctors() {
    const { selectedDr } = this.props;
    if (selectedDr) {
      return selectedDr.map((doc, index) => (
        <View key={index}>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={[LightFontStyle.fontSmall]}>
              #
              {' '}
              {doc.mcr_no}
            </Text>
            <Text style={[LightFontStyle.fontSmall]}>
              <Text
                style={[layoutStyles.grayText, FontStyle.fontMedium]}
              >
                {doc.doc_name}
              </Text>
              {' '}
              (
              {doc.doc_code}
              )
            </Text>
            <Text style={[LightFontStyle.fontSmall]}>
              {doc.doc_spec}
              {' '}
              (
              {doc.visit_category}
              )
            </Text>
          </View>
          <View style={layoutStyles.lineStyle} />
        </View>
      ));
    }
    return null;
  }

  renderDoctor(doc, index) {
    const { bo_data, addDoctor } = this.props;
    return (
      <View key={index}>
        <View style={[layoutStyles.topRow]}>
          <View style={[layoutStyles.leftTopRow, { paddingHorizontal: 15, paddingVertical: 10 }]}>
            <Text style={[LightFontStyle.fontSmall]}>
              #
              {' '}
              {doc.mcr_no}
            </Text>
            <Text style={[LightFontStyle.fontSmall]}>
              <Text
                style={[layoutStyles.grayText, FontStyle.fontMedium]}
              >
                {doc.doc_name}
              </Text>
              {' '}
              (
              {doc.doc_code}
              )
            </Text>
            <Text style={[LightFontStyle.fontSmall]}>
              {doc.doc_spec}
              {' '}
              (
              {doc.visit_category}
              )
            </Text>
          </View>
          <View style={[layoutStyles.rightTopRow]}>
            <CheckBox
              onClick={() => addDoctor(doc)}
              isChecked={Boolean(bo_data && bo_data[doc.doc_code])}
            />
          </View>
        </View>
        <View style={layoutStyles.lineStyle} />
      </View>
    );
  }

  renderCollapsedList() {
    const { data } = this.props;
    const renderDoctor = this.renderDoctor.bind(this);
    if (data) {
      const { all_doctors, compliance_doctors, suggested_doctors } = data;
      return (
        <>
          <Collapse>
            <CollapseHeader>
              <ImageBackground
                style={styles.imageTop}
                source={Images.myPerformanceListHeaderDown}
              >
                <View style={modalStyles.leftTopRow}>
                  <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                    All Doctor
                  </Text>
                </View>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              <View style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: colorsStyles.light_grey
              }}
              >
                {all_doctors
                  ? all_doctors.map((doc, index) => renderDoctor(doc, index))
                  : (
                    <View style={{ alignItems: 'center', margin: 10 }}>
                      <Text style={[layoutStyles.grayText]}>No Data Available</Text>
                    </View>
                  )}
              </View>
            </CollapseBody>
          </Collapse>
          <View style={layoutStyles.lineStyle} />
          <Collapse>
            <CollapseHeader>
              <ImageBackground
                style={styles.imageTop}
                source={Images.myPerformanceListHeaderDown}
              >
                <View style={modalStyles.leftTopRow}>
                  <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                    Non Compliant Doctor
                  </Text>
                </View>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              <View style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: colorsStyles.light_grey
              }}
              >
                {compliance_doctors.length > 0
                  ? compliance_doctors.map((doc, index) => renderDoctor(doc, index))
                  : (
                    <View style={{ alignItems: 'center', margin: 10 }}>
                      <Text style={[layoutStyles.grayText]}>No Data Available</Text>
                    </View>
                  )}
              </View>
            </CollapseBody>
          </Collapse>
          <View style={layoutStyles.lineStyle} />
          <Collapse>
            <CollapseHeader>
              <ImageBackground
                style={styles.imageTop}
                source={Images.myPerformanceListHeaderDown}
              >
                <View style={modalStyles.leftTopRow}>
                  <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                    Suggested Doctor
                  </Text>
                </View>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              <View style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: colorsStyles.light_grey
              }}
              >
                {suggested_doctors.length > 0
                  ? suggested_doctors.map((doc, index) => renderDoctor(doc, index))
                  : (
                    <View style={{ alignItems: 'center', margin: 10 }}>
                      <Text style={[layoutStyles.grayText]}>No Data Available</Text>
                    </View>
                  )}
              </View>
            </CollapseBody>
          </Collapse>
        </>
      );
    }
    return null;
  }

  render() {
    const { loading } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <View style={[layoutStyles.column]}>
          <View
            style={[layoutStyles.col5, layoutStyles.lineStyle, { backgroundColor: colorsStyles.light_grey }]}
          >
            <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
              {this.renderSelectedDoctors()}
            </ScrollView>
          </View>
          <View style={layoutStyles.lineStyle} />
          <View style={[layoutStyles.col5]}>
            <ScrollView>
              {this.renderCollapsedList()}
              <View style={{ paddingBottom: 30 }} />
            </ScrollView>
          </View>
        </View>
      </ParentView>
    );
  }
}

export default BoSuggestedDoctorsComponent;
