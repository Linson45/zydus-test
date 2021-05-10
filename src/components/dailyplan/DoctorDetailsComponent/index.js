import React, { Fragment } from 'react';
import {
  ScrollView, TextInput, TouchableOpacity, View
} from 'react-native';
import moment from 'moment';
import {
  Body, Card, CardItem, Icon
} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Tooltip } from 'react-native-elements';
import ParentView from '../../ParentView';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ColorStyles from '../../../styles/colorsStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import ModalComponent from './modal';
import layoutStyles from '../../../styles/layoutStyles';

export default class DoctorDetailsComponent extends React.Component {
  renderDrDetails() {
    const {
      data, doctor, date, openModal, hasMetDoctor, hasMet, onChangeText, comment, goToDoctorDetails, submitComment, selectDoctor
    } = this.props;
    if (data) {
      let status = hasMet;
      if (status === '') {
        status = data.status !== 'N';
      }
      const { last_visit_date, current_month_visit, last_month_visit } = data;
      const {
        doc_name, doc_spec, visit_category, sales_planning, last_month_rcpa, mcr_no, is_current_month_rcpa
      } = doctor;
      const statusStyle = JSON.parse(JSON.stringify(styles.itemValues));
      let statusText = 'Enter RCPA';
      if (!is_current_month_rcpa) {
        statusStyle.color = ColorStyles.blue;
      } else {
        statusStyle.color = ColorStyles.green;
        statusText = 'RCPA Submitted';
      }

      const current_month_visit_tooltip = current_month_visit.map((date, index) => (
        <Text key={index}>
          {date}
        </Text>
      ));

      const last_month_visit_tooltip = last_month_visit.map((date, index) => (
        <Text key={index}>
          {date}
        </Text>
      ));

      return (
        <>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                MCR #
                {mcr_no}
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                Visit last
              </Text>
            </View>
          </View>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Text>
                {doc_name}
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                {last_visit_date}
              </Text>
            </View>
          </View>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                {visit_category}
                , (
                {doc_spec}
                )
              </Text>
            </View>
          </View>
          <View style={[styles.summaryHeader, { marginTop: 8, marginBottom: 8 }]}>
            <TouchableOpacity opaque={1} onPress={() => goToDoctorDetails(doctor, data.priority_brands)}>
              <Text style={styles.blueText}>
                View priority brands for the doctor
                <Icon
                  name="arrowright"
                  type="AntDesign"
                  style={styles.blueText}
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.monthRow, styles.summaryHeader]}>
            <View style={styles.currentMonthBox}>
              <Text style={styles.currentMonthText}>
                {' '}
                {priceFormatWithoutDecimal(sales_planning)}
                {' '}
              </Text>
              <Text style={styles.currentMonthText}>
                {moment(date, 'DD-MMM-YYYY').format('MMMM')}
                {' '}
                GSP
              </Text>
            </View>
            <View style={styles.lastMonthBox}>
              <Text style={styles.currentMonthText}>
                {' '}
                {priceFormatWithoutDecimal(last_month_rcpa)}
                {' '}
              </Text>
              <Text style={styles.currentMonthText}>
                {moment(date, 'DD-MMM-YYYY').subtract(1, 'month').startOf('month').format('MMMM')}
                {' '}
                RCPA
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <TouchableOpacity onPress={openModal} opacity={1}>
                <Text style={styles.blueText}>
                  View 3 Months Data
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightTopRow}>
              <TouchableOpacity
                opaque={1}
                onPress={() => {
                  selectDoctor(doctor);
                }}
              >
                <Text style={statusStyle}>
                  {statusText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                Visit this Month
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Tooltip
                backgroundColor={ColorStyles.transparent}
                pointerColor={ColorStyles.white}
                containerStyle={{
                  backgroundColor: ColorStyles.white
                }}
                popover={(
                  <>
                    {current_month_visit_tooltip}
                  </>
                                )}
              >
                <Text note style={LightFontStyle.fontMedium}>
                  {`${current_month_visit.length} `}
                  <Icon
                    name="info"
                    type="Feather"
                    style={[{ color: ColorStyles.gray_dark }, LightFontStyle.fontMedium]}
                  />
                </Text>
              </Tooltip>
            </View>
          </View>
          <View style={[styles.topRow]}>
            <View style={styles.leftTopRow}>
              <Text note style={LightFontStyle.fontMedium}>
                Visit last Month
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Tooltip
                backgroundColor={ColorStyles.transparent}
                pointerColor={ColorStyles.white}
                containerStyle={{
                  backgroundColor: ColorStyles.white
                }}
                popover={(
                  <>
                    {last_month_visit_tooltip}
                  </>
                                )}
              >
                <Text note style={LightFontStyle.fontMedium}>
                  {`${last_month_visit.length} `}
                  <Icon
                    name="info"
                    type="Feather"
                    style={[{ color: ColorStyles.gray_dark }, LightFontStyle.fontMedium]}
                  />
                </Text>
              </Tooltip>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <ToggleSwitch
                isOn={status}
                onColor={ColorStyles.blue}
                offColor="white"
                trackOffStyle={{ borderColor: ColorStyles.blue, borderWidth: 1 }}
                trackOnStyle={{ borderColor: ColorStyles.blue, borderWidth: 1 }}
                thumbOffStyle={{ borderColor: ColorStyles.blue, borderWidth: 1, margin: 0 }}
                label="Doctor met Today"
                labelStyle={{ color: ColorStyles.blue, marginLeft: 0 }}
                size="small"
                onToggle={(isOn) => hasMetDoctor(isOn)}
              />
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <TextInput
              style={{
                height: 80,
                borderColor: ColorStyles.blue_coachmapdetails,
                borderWidth: 1,
                width: '100%',
                padding: 10,
                borderRadius: 10
              }}
              placeholder="Add Comment"
              onChangeText={(text) => onChangeText(text)}
              multiline
              value={comment}
            />
          </View>
          <View style={[styles.topRow, styles.summaryHeader, { justifyContent: 'center' }]}>
            <TouchableOpacity
              opacity={1}
              onPress={submitComment}
              style={{ width: '90%', backgroundColor: ColorStyles.blue, borderRadius: 30 }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#2F3195', '#842760']}
                style={{
                  padding: 10,
                  width: '100%',
                  borderRadius: 30,
                  alignItems: 'center'
                }}
              >
                <Text style={[styles.currentMonthText, FontStyle.fontLarge]}>SAVE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: ColorStyles.black, margin: 10 }} />
        </>
      );
    }
    return null;
  }

  renderComments() {
    const { data } = this.props;
    if (data && Array.isArray(data.comments)) {
      const renderData = data.comments.map((item, index) => {
        if (item.note) {
          return (
            <Fragment key={index}>
              <CardItem>
                <Body>
                  <Text note style={LightFontStyle.fontSmall}>
                    {item.date}
                  </Text>
                  <Text note style={LightFontStyle.fontMedium}>
                    {item.note}
                  </Text>
                </Body>
              </CardItem>
              <View style={layoutStyles.lineStyle} />
            </Fragment>
          );
        }
        return null;
      });
      return (
        <Card>
          <CardItem>
            <Body>
              <Text note>
                Previous Notes
              </Text>
            </Body>
          </CardItem>
          {renderData}
        </Card>
      );
    }
    return null;
  }

  render() {
    const {
      loading, showModal, closeModal, data, hoverLoading, connected
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
      >
        <ScrollView style={styles.mainView}>
          {this.renderDrDetails()}
          {this.renderComments()}
          <ModalComponent
            isVisible={showModal}
            closeModal={closeModal}
            data={data}
          />
        </ScrollView>
      </ParentView>
    );
  }
}
