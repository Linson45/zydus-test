import React from 'react';
import {
  Image, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import moment from 'moment';
import ToggleSwitch from 'toggle-switch-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import ParentView from '../../ParentView';
import styles from './styles';
import ModalComponent from './modal';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ColorStyles from '../../../styles/colorsStyles';
import ChartView from '../../detailing/Chart';
import { generateHighChartData } from './chartUtils';
import Images from '../../../Constants/imageConstants';

export default class DoctorDetailsDailyPlanComponent extends React.Component {
  renderHeader() {
    const {
      doctor, data, openModal, selectDoctor
    } = this.props;
    let current_month_visit_dates = '';
    let current_month_visit = [];
    if (doctor) {
      const { doc_name, visit_category, doc_spec } = doctor;
      if (data) {
        current_month_visit = data.current_month_visit;
        if (!current_month_visit) {
          current_month_visit = [];
        }
        current_month_visit_dates = current_month_visit.join(' | ');
      }
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.doctorName}>{`${doc_name}    ${visit_category}`}</Text>
          <Text style={styles.doctorSpec}>{doc_spec}</Text>
          <View style={styles.headerActions}>
            <View style={styles.headerLeft}>
              <View style={styles.row}>
                <Text style={styles.visits}>
                  Visit This Month:
                  {current_month_visit.length}
                </Text>
                <TouchableOpacity onPress={openModal}>
                  <Text style={styles.last3Month}>Last 3 Months Data</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.dates}>{current_month_visit_dates}</Text>
            </View>

            <TouchableOpacity style={styles.headerRight} onPress={() => selectDoctor(doctor)}>
              <Text style={styles.rcpa}>Enter RCPA</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }

  renderGsp() {
    const { doctor } = this.props;

    if (doctor) {
      const { sales_planning, last_month_rcpa } = doctor;

      return (
        <View style={styles.gspViewContainer}>
          <View style={styles.gspContainer}>
            <Text style={styles.gspValue}>{priceFormatWithoutDecimal(sales_planning)}</Text>
            <Text style={styles.gspSub}>
              /
              {moment(moment(), 'DD-MMM-YYYY').format('MMMM')}
              {' '}
              GSP
            </Text>
          </View>
          <View style={styles.rcpaContainer}>
            <Text style={styles.gspValue}>{priceFormatWithoutDecimal(last_month_rcpa)}</Text>
            <Text style={styles.gspSub}>
              /
              {moment(moment(), 'DD-MMM-YYYY').subtract(1, 'month').startOf('month').format('MMMM')}
              {' '}
              RCPA
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  renderPriorityBrand() {
    const { data, goToDoctorDetails, doctor } = this.props;
    if (data) {
      let { priority_brands } = data;
      if (!priority_brands) {
        priority_brands = [];
      }
      const brands = priority_brands.map((brand) => brand.brand_name);
      return (
        <View style={styles.brandsContainer}>
          <View style={styles.brandLeft}>
            <Text style={styles.brandHeading}>Priority Brands</Text>
            <Text style={styles.brands}>{brands.join(' , ')}</Text>
          </View>

          <TouchableOpacity style={styles.brandRight} onPress={() => goToDoctorDetails(doctor, data.priority_brands)}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderContentSelect() {
    const { gotoSelectContent, doctor } = this.props;
    const { is_completed } = doctor;
    if (is_completed || !DeviceInfo.isTablet()) {
      return null;
    }
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentLeft}>
          <Text style={styles.contentHeading}>Browse Speciality Based Content for E-Detailing</Text>
        </View>

        <TouchableOpacity style={styles.contentRight} onPress={gotoSelectContent}>
          <Image source={Images.select_content} style={styles.startDetailingIcon} />
          <Text style={styles.selectContentButton}>Select Content</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderBlankSpace() {
    return (
      <View style={styles.blank} />
    );
  }

  renderHistory() {
    const { history, gotoHistory, doctor } = this.props;
    const { is_completed } = doctor;
    const showHistory = !is_completed && DeviceInfo.isTablet();
    const conf = generateHighChartData(history);
    let last_shared = null; let title = null; let brand = null;
    let e_detailed_time = null;
    const firstHistory = history[0];
    if (firstHistory) {
      last_shared = firstHistory.date;
      title = firstHistory.title;
      brand = firstHistory.brand;
      e_detailed_time = firstHistory.e_detailed_time;
    }

    const options = {
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      }
    };
    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyHeading}>History</Text>
        <View style={styles.historySharedContainer}>
          <Text style={styles.historySharedLastShared}>
            Last Shared:
            {last_shared || '-'}
          </Text>
          {showHistory ? (
            <TouchableOpacity onPress={gotoHistory}>
              <Text style={styles.viewSharedHistory}>View Shared history</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.historySharedContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.displayView}>
              <Image source={Images.clock} style={styles.displayClock} />
              <Text style={styles.displayTime}>
                {e_detailed_time
                  ? `${Math.floor(e_detailed_time / 60)}:${Math.floor(e_detailed_time % 60)} min`
                  : '-'}
              </Text>
            </View>
          </View>
          <Text style={styles.brand}>{brand || '-'}</Text>
          <Text style={styles.detailingType}>E-detailing</Text>
        </View>

        <ChartView
          originWhitelist={['']}
          style={styles.chart}
          config={conf}
          options={options}
        />
      </View>
    );
  }

  renderDoctorMet() {
    const {
      data, hasMet, hasMetDoctor, comment, onChangeText, submitComment
    } = this.props;
    let status = hasMet;
    if (status === '') {
      status = data ? data.status !== 'N' : false;
    }

    return (
      <View style={styles.doctorMetContainer}>
        <View style={styles.doctorMetHeadingContainer}>
          <Text style={styles.doctorMetHeading}>Doctor Met Today ?</Text>
          <ToggleSwitch
            isOn={status}
            onColor={ColorStyles.blue}
            offColor="white"
            trackOffStyle={styles.doctorToggle}
            trackOnStyle={styles.doctorToggle}
            thumbOffStyle={styles.doctorToggle}
            size="small"
            onToggle={(isOn) => hasMetDoctor(isOn)}
          />
        </View>
        <Text style={styles.doctorNotesHeading}>Notes / Comments</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Enter your note here..."
          onChangeText={(text) => onChangeText(text)}
          multiline
          value={comment}
        />

        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={submitComment} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderComments() {
    const { data } = this.props;
    if (data) {
      const { comments } = data;
      if (comments && Array.isArray(comments)) {
        return (
          <View style={styles.commentContainer}>
            <Text style={styles.commentHeading}>Previous Notes</Text>
            {comments.map((comment) => {
              const { date, note } = comment;
              return (
                <View key={note} style={styles.comment}>
                  <Text style={styles.commentDate}>{date}</Text>
                  <Text style={styles.commentNote}>{note}</Text>
                </View>
              );
            })}
          </View>
        );
      }
    }
    return null;
  }

  render() {
    const {
      loading, showModal, closeModal, data, hoverLoading
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected
        hoverLoading={hoverLoading}
      >
        <KeyboardAwareScrollView>
          {this.renderHeader()}
          {this.renderGsp()}
          {this.renderBlankSpace()}
          {this.renderPriorityBrand()}
          {this.renderBlankSpace()}
          {this.renderContentSelect()}
          {this.renderBlankSpace()}
          {this.renderHistory()}
          {this.renderBlankSpace()}
          {this.renderDoctorMet()}
          {this.renderBlankSpace()}
          {this.renderComments()}
          {this.renderBlankSpace()}
          <ModalComponent
            isVisible={showModal}
            closeModal={closeModal}
            data={data}
          />
        </KeyboardAwareScrollView>
      </ParentView>
    );
  }
}
