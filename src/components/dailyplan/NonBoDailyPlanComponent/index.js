import React from 'react';

import {
  ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Icon } from 'native-base';
import {
  Menu, MenuOption, MenuOptions, MenuTrigger
} from 'react-native-popup-menu';
import styles from './styles';
import { addPercentageSign, priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ParentView from '../../ParentView';
import ColorStyles from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';

export default class NonBoDailyPlanComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }

  renderGsp() {
    const { data } = this.props;
    if (data) {
      const { date, doctors_planned } = data;
      let current_rcpa = 0;
      let last_month_rcpa = 0;
      for (const value of doctors_planned) {
        if (value.sales_planning) current_rcpa += value.sales_planning;
        last_month_rcpa += value.last_month_rcpa;
      }
      return (
        <View style={styles.gspViewContainer}>
          <View style={styles.gspContainer}>
            <Text style={styles.gspValue}>{priceFormatWithoutDecimal(current_rcpa)}</Text>
            <Text style={styles.gspSub}>
              /
              {moment(date, 'DD-MMM-YYYY').format('MMMM')}
              {' '}
              GSP
            </Text>
          </View>
          <View style={styles.rcpaContainer}>
            <Text style={styles.gspValue}>{priceFormatWithoutDecimal(last_month_rcpa)}</Text>
            <Text style={styles.gspSub}>
              /
              {moment(date, 'DD-MMM-YYYY').subtract(1, 'month').startOf('month').format('MMMM')}
              {' '}
              RCPA
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  renderPob() {
    const { data } = this.props;
    if (data) {
      const {
        jfw_abm_name, jfw_rbm_name, pob_amount, date, doctors_planned
      } = data;
      let doctor_rcpaed = 0;
      for (const value of doctors_planned) {
        if (value.is_current_month_rcpa) doctor_rcpaed++;
      }
      return (
        <View style={styles.pobContainer}>
          <Text style={styles.pob}>
            POB Till Date:
            {priceFormatWithoutDecimal(pob_amount)}
          </Text>
          <Text style={styles.pob}>
            Doctor RCPAed:
            {`${doctor_rcpaed} / ${doctors_planned.length}`}
          </Text>
          <View style={styles.row}>
            <Icon
              name="calendar"
              style={styles.calendar}
            />
            <Text style={styles.date}>{moment(date).format('DD MMM')}</Text>
            {jfw_abm_name ? <Text style={styles.topJfwLabel}>JFW (ABM)</Text> : null}
            {jfw_rbm_name ? <Text style={styles.topJfwLabel}>JFW (RBM)</Text> : null}
          </View>
        </View>
      );
    }
    return null;
  }

  renderTabs() {
    const { currentTab } = this.state;
    return (
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, currentTab === 0 ? styles.selectedTab : {}]} onPress={() => this.setState({ currentTab: 0 })}>
          <Text style={styles.tabText}>Doc Planned</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tab, currentTab === 1 ? styles.selectedTab : {}]} onPress={() => this.setState({ currentTab: 1 })}>
          <Text style={styles.tabText}>BO Action</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tab, currentTab === 2 ? styles.selectedTab : {}]} onPress={() => this.setState({ currentTab: 2 })}>
          <Text style={styles.tabText}>BO Efforts</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTab() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      return (
        <View>
          {this.renderPlannedDoctors()}
          {this.renderDoctorCompletedHeading()}
          {this.renderCompletedDoctors()}
        </View>
      );
    }
    if (currentTab === 1) {
      return this.renderActions();
    }
    if (currentTab === 2) {
      return this.renderBoEffort();
    }
    return null;
  }

  formatVirtualStartTime = (date) => {
    try {
      const splits = date.split(' ');
      const timeSplits = splits[1].split('.');
      return `${timeSplits[0]}:${timeSplits[1]} ${splits[2]}`;
    } catch (e) {
      return '';
    }
  };

  renderVirtualCallButton(doctor) {
    const {
      goToScheduleVirtualMeeting, joinVirtualCall, isPast, hasVirtualDetailing
    } = this.props;
    const { virtual_call_schedule } = doctor;
    if (isPast || !hasVirtualDetailing) {
      return null;
    }
    if (virtual_call_schedule) {
      const { start_time } = virtual_call_schedule;
      return (
        <View style={styles.virtualCallButtonRow}>
          <Text style={styles.virtualCallTime}>{this.formatVirtualStartTime(start_time)}</Text>
          <TouchableOpacity
            style={styles.virtualCallJoinButton}
            onPress={() => {
              joinVirtualCall(doctor);
            }}
          >
            <Text style={styles.virtualCallJoinText}>Join</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.virtualCallScheduleButton}
        onPress={() => {
          goToScheduleVirtualMeeting(doctor);
        }}
      >
        <Image source={Images.ic_virtual_call} style={styles.virtualCallScheduleIcon} />
        <Text style={styles.virtualCallScheduleText}>Schedule</Text>
      </TouchableOpacity>
    );
  }

  renderPlannedDoctors() {
    const {
      data, plannedDoctors, onDoctorPress, gotoSelectContent, gotoStartDetailing, isToday
    } = this.props;
    if (data && plannedDoctors && plannedDoctors.length) {
      return plannedDoctors.map((doctor) => {
        const {
          doc_code, doc_name, doc_spec, sales_planning, is_current_month_rcpa, contents
        } = doctor;
        return (
          <View key={doc_code} style={styles.doctorRow}>
            <TouchableOpacity style={styles.doctor} key={doc_code} onPress={() => onDoctorPress(doctor)}>
              <View style={styles.doctorLeft}>
                <Text style={styles.doctorName}>{doc_name}</Text>
                <Text style={styles.doctorSpec}>{doc_spec}</Text>
                <Text style={styles.doctorGsp}>
                  {priceFormatWithoutDecimal(sales_planning)}
                  {' '}
                  GSP
                </Text>
              </View>
              <View style={styles.doctorRight}>
                <View style={styles.rowPlain}>
                  {this.renderVirtualCallButton(doctor)}
                  <TouchableOpacity style={styles.selectContentButton} onPress={() => gotoSelectContent(doctor)}>
                    <Icon style={styles.startDetailingIcon} name="clone" type="FontAwesome" />
                    <Text style={styles.startDetailingText}>Select Content</Text>
                  </TouchableOpacity>

                  {isToday
                    ? (
                      <TouchableOpacity style={styles.startDetailingButton} onPress={() => gotoStartDetailing(doctor)}>
                        <Text style={styles.startDetailingText}>Start Detailing</Text>
                      </TouchableOpacity>
                    )
                    : null}
                  {this.renderMoreButton(doctor)}
                </View>

                {is_current_month_rcpa
                  ? <Text style={styles.rcpaSubmitted}>RCPA Submitted</Text>
                  : <Text style={styles.rcpaPending}>Pending</Text>}
              </View>
            </TouchableOpacity>
            {this.renderContents(contents, doctor)}
          </View>
        );
      });
    }
    return null;
  }

  renderContents(contents, doctor) {
    const {
      showContents, gotoStartDetailing, showCaseDrMapping, isToday
    } = this.props;
    if (showContents && contents && contents.length) {
      let contentsToBeShown = [];
      if (showCaseDrMapping && Object.keys(showCaseDrMapping) && Object.keys(showCaseDrMapping).length > 0) {
        const { doc_code } = doctor;
        contentsToBeShown = showCaseDrMapping[doc_code];
      }
      return (
        <ScrollView style={styles.contentContainer} horizontal>
          {
                        contents.map((content, index) => {
                          const {
                            content_id, title, thumbnail_location, name
                          } = content;
                          if (contentsToBeShown && contentsToBeShown.length > 0 && contentsToBeShown.indexOf(content_id) < 0) {
                            return null;
                          }
                          return (
                            <TouchableOpacity
                              style={styles.content}
                              key={content_id}
                              onPress={() => {
                                if (isToday) {
                                  gotoStartDetailing(doctor, index);
                                }
                              }}
                            >
                              <FastImage source={{ uri: thumbnail_location }} style={styles.contentThumbnail} />
                              <Text style={styles.contentTitle}>{name || title}</Text>
                            </TouchableOpacity>
                          );
                        })
                    }
        </ScrollView>
      );
    }
    return null;
  }

  renderActions() {
    const { data } = this.props;
    if (data) {
      const { action_items } = data;
      return action_items.map(((actionItem) => {
        const {
          action_plan, problem_description, target_date, assigned_by, action_status_name, root_cause
        } = actionItem;
        return (
          <View style={styles.actionItemContainer} key={problem_description}>
            <Text style={styles.actionPlanHeading}>{action_plan}</Text>
            <View style={styles.actionPlanReasonContainer}>
              <View style={styles.actionPlanReason}>
                <Text style={styles.actionPlanSubHeading}>Reason</Text>
                <Text style={styles.actionPlanHeading}>{root_cause}</Text>
              </View>

              <View style={styles.actionPlanReason}>
                <Text style={styles.actionPlanSubHeading}>Status</Text>
                <Text style={styles.actionPlanHeading}>{action_status_name}</Text>
              </View>
            </View>

            <View style={styles.actionPlanReason}>
              <Text style={styles.actionPlanSubHeading}>Assigned By</Text>
              <Text style={styles.actionPlanAssignedBy}>{assigned_by}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionPlanRow}>
              <Icon
                name="calendar"
                style={styles.calendar}
              />
              <Text style={styles.actionPlanDeadline}>
                Deadline:
                {target_date}
              </Text>
            </View>
          </View>
        );
      }));
    }
    return null;
  }

  renderBoEffort() {
    const { data } = this.props;
    if (data) {
      const {
        dr_call_average, mcr_coverage_old, multivisit_complience, sales_achievement_till_date, sales_achievement_till_date_percent,
        pl_rank, pl_rank_total, jfw_with_abm, jfw_with_rbm, open_action_items, last_reporting_date
      } = data.bo_effort;
      return (
        <View style={styles.boEffortContainer}>
          <View style={styles.boEffortTopContainer}>
            <View style={styles.boEffortTopValueContainer}>
              <Text style={styles.boEffortTopValueContainer.value}>{addPercentageSign(multivisit_complience)}</Text>
              <Text style={styles.boEffortTopValueContainer.subHeading}>Multi-visit & GSP</Text>
            </View>

            <View style={styles.boEffortTopValueContainer}>
              <Text style={styles.boEffortTopValueContainer.value}>{addPercentageSign(mcr_coverage_old)}</Text>
              <Text style={styles.boEffortTopValueContainer.subHeading}>MCR Cov.</Text>
            </View>

            <View style={styles.boEffortTopValueContainer}>
              <Text style={styles.boEffortTopValueContainer.value}>{dr_call_average}</Text>
              <Text style={styles.boEffortTopValueContainer.subHeading}>Call Avg.</Text>
            </View>
          </View>

          <View style={styles.boEffortValueContainer}>
            <Text>Sales Achievement Till Date</Text>
            <View>
              <Text>{priceFormatWithoutDecimal(sales_achievement_till_date)}</Text>
              <Text style={styles.ach}>
                {addPercentageSign(sales_achievement_till_date_percent)}
                {' '}
                ACH
              </Text>
            </View>
          </View>

          <View style={styles.boEffortValueContainer}>
            <Text>JFW with RBM</Text>
            <Text>{jfw_with_rbm}</Text>
          </View>

          <View style={styles.boEffortValueContainer}>
            <Text>JFW with ABM</Text>
            <Text>{jfw_with_abm}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.boEffortValueContainer}>
            <Text>Open Action Item</Text>
            <Text>{open_action_items}</Text>
          </View>

          <View style={styles.boEffortValueContainer}>
            <Text style={styles.lastReporting}>Last Reporting</Text>
            <Text style={styles.lastReporting}>{last_reporting_date}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.boEffortValueContainer}>
            <Text>Premier League Rank in Div</Text>
            <Text style={styles.rank}>{`${pl_rank} / ${pl_rank_total}`}</Text>
          </View>
        </View>
      );
    }
    return null;
  }

  renderLoader() {
    const { loading } = this.props;
    if (loading) {
      return (
        <ActivityIndicator color={ColorStyles.gray} style={styles.loader} />
      );
    }
    return null;
  }

  renderBlankSpace() {
    return (
      <View style={styles.blank} />
    );
  }

  renderDoctorCompletedHeading() {
    const { data, completedDoctors, completedHeading } = this.props;
    if (data && completedDoctors && completedDoctors.length) {
      return (
        <View style={styles.doctorPlannedHeadingContainer}>
          <Text style={styles.doctorPlannedHeading}>{completedHeading}</Text>
        </View>
      );
    }
    return null;
  }

  renderCompletedDoctors() {
    const {
      data, completedDoctors, onDoctorPress
    } = this.props;
    if (data && completedDoctors && completedDoctors.length) {
      return completedDoctors.map((doctor) => {
        const {
          doc_code, doc_name, doc_spec, is_current_month_rcpa
        } = doctor;
        return (
          <View key={doc_code} style={styles.doctorRow}>
            <TouchableOpacity style={styles.doctor} onPress={() => onDoctorPress(doctor)}>
              <View style={styles.doctorLeft}>
                <Text style={styles.doctorName}>{doc_name}</Text>
                <Text style={styles.doctorSpec}>{doc_spec}</Text>
              </View>
              <View style={styles.doctorRight}>
                {is_current_month_rcpa
                  ? <Text style={styles.rcpaSubmitted}>RCPA Submitted</Text>
                  : <Text style={styles.rcpaPending}>Pending</Text>}
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    }
    return null;
  }

  renderMoreButton(doctor) {
    const {
      cancelVirtualCall, isPast, hasVirtualDetailing, resendLink
    } = this.props;
    const { virtual_call_schedule } = doctor;
    if (isPast || !hasVirtualDetailing) {
      return null;
    }

    if (virtual_call_schedule) {
      return (
        <Menu>
          <MenuTrigger>
            <Image
              style={styles.moreIcon}
              resizeMode="contain"
              source={Images.ic_more}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => {
              Alert.alert(
                'Resend Link',
                'Are you sure you want to resend the link for this call?',
                [
                  {
                    text: 'No',
                    style: 'destructive',
                  },
                  {
                    text: 'Yes! Send Link',
                    onPress: () => {
                      resendLink(doctor).then().catch((err) => console.log(err));
                    },
                  },
                ]
              );
            }}
            >
              <Text style={styles.cancelButton}>Resend Link</Text>
            </MenuOption>
            <MenuOption onSelect={() => {
              Alert.alert(
                'Cancel Call',
                'Are you sure you want to cancel this call?',
                [
                  {
                    text: 'No'
                  },
                  {
                    text: 'Yes! Cancel',
                    style: 'destructive',
                    onPress: () => {
                      cancelVirtualCall(doctor);
                    },
                  },
                ]
              );
            }}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      );
    }

    return (
      <Image
        style={styles.moreIconDisabled}
        resizeMode="contain"
        source={Images.ic_more}
      />
    );
  }

  render() {
    const { loading, hoverLoading } = this.props;

    return (
      <ParentView
        hoverLoading={hoverLoading}
        style={styles.container}
        connected
      >
        <ScrollView>
          {this.renderLoader()}
          {loading ? null : this.renderGsp()}
          {loading ? null : this.renderBlankSpace()}
          {loading ? null : this.renderPob()}
          {loading ? null : this.renderTabs()}
          {loading ? null : this.renderTab()}
        </ScrollView>
      </ParentView>
    );
  }
}
