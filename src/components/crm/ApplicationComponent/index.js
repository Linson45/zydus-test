import React from 'react';
import { Card, CardItem } from 'native-base';
import {
  ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import ColorsStyles from '../../../styles/colorsStyles';
import { getMonthString } from '../../../util/dateTimeUtil';
import { priceFormatWithDecimal, priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';

export default class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: [false, false, false, false]
    };
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderDoctorDetail() {
    const { doctor_details } = this.props;
    if (doctor_details) {
      const { bo_details, doc_details, past_engagemet } = doctor_details;

      return (
        <View>
          <Text style={styles.boName}>
            BO:
            {bo_details.name}
          </Text>
          <Card style={styles.card}>
            <CardItem style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>BO Details:</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>HQ Primary Sales % Ach:</Text>
                <Text style={styles.cardItemText}>{bo_details.hq_pri}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Regional Primary Sales % Ach:</Text>
                <Text style={styles.cardItemText}>{bo_details.region_pri}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>HQ Secondary Sales (% of Primary Sales):</Text>
                <Text style={styles.cardItemText}>{bo_details.hq_sec}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>DOH:</Text>
                <Text style={styles.cardItemText}>{bo_details.doh}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}># ofBO Visits last month:</Text>
                <Text style={styles.cardItemText}>{bo_details.visit ? bo_details.visit : 0}</Text>
              </View>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Doctor Details:</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Doctor Name:</Text>
                <Text style={styles.cardItemText}>{doc_details.name}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Doctor Spec:</Text>
                <Text style={styles.cardItemText}>{doc_details.spec}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Contact No:</Text>
                <Text style={styles.cardItemText}>{doc_details.contact ? doctor_details.contact : '-'}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>3 - month avg GSP:</Text>
                <Text style={styles.cardItemText}>{doc_details.tmon_gsp}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>3 - month avg RCPA:</Text>
                <Text style={styles.cardItemText}>{doc_details.tmon_rcpa}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Priority Brands:</Text>
                <Text style={styles.cardItemText} />
              </View>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Past Engagements:</Text>
            </CardItem>
            <CardItem>
              {past_engagemet
                ? past_engagemet.map((engagement) => (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View>
                      <Text style={styles.cardItemTextLeft}>
                        Type:
                        {engagement.type}
                      </Text>
                      <Text style={styles.cardItemTextLeft}>
                        Date:
                        {getMonthString(engagement.month)}
                        {' '}
                        { engagement.year }
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.amount}>{priceFormatWithoutDecimal(engagement.amt)}</Text>
                    </View>
                  </View>
                ))
                : null}
            </CardItem>
          </Card>
        </View>
      );
    }
    return null;
  }

  renderDoctorMetrics() {
    const { doctor_metrics } = this.props;
    if (doctor_metrics) {
      const {
        red_flag, month, matrics, current_support, expected_support, proposed_exp,
        curr_rome, estimated_rome
      } = doctor_metrics;
      return (
        <View style={{ marginTop: 15 }}>
          <View style={styles.row}>
            <Text style={{ flex: 6 }}>No of Red Flags</Text>
            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[0]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[1]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[2]}</Text>
            </View>
          </View>

          <Card>
            <View style={styles.cardHeading}>
              <Text style={{ flex: 6, color: ColorsStyles.white, marginRight: 15 }}>Parameter (Division Norm)</Text>
              <Text style={styles.month}>{getMonthString(month[0])}</Text>
              <Text style={styles.month}>{getMonthString(month[1])}</Text>
              <Text style={styles.month}>{getMonthString(month[2])}</Text>
            </View>

            {
                            matrics.map(({
                              title, subTitle, val1_flag, val2_flag, val3_flag, value1, value2, value3
                            }, index) => {
                              let color_1 = ColorsStyles.gray;
                              let color_2 = ColorsStyles.gray;
                              let color_3 = ColorsStyles.gray;
                              if (val1_flag) color_1 = ColorsStyles.red;
                              if (val2_flag) color_2 = ColorsStyles.red;
                              if (val3_flag) color_3 = ColorsStyles.red;

                              return (
                                <View style={styles.cardRow} key={index}>
                                  <Text style={styles.cardTitle}>
                                    {index !== 0 ? title : 'GSP'}
                                    {' '}
                                    {subTitle}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_1 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value1) : value1}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_2 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value2) : value2}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_3 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value3) : value3}
                                  </Text>
                                </View>
                              );
                            })
                        }

          </Card>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.simpleText}>
              Current Support (12 months RCPA):
              {priceFormatWithDecimal(current_support)}
            </Text>
            <Text style={styles.simpleText}>
              Total Expected Support (12 months):
              {priceFormatWithDecimal(expected_support)}
            </Text>
            <Text style={styles.simpleText}>
              Proposed Expense:
              {priceFormatWithDecimal(proposed_exp)}
            </Text>
            <Text style={styles.simpleText}>
              Current ROME:
              {(+curr_rome).toFixed(1)}
            </Text>
            <Text style={styles.simpleText}>
              Estimated ROME:
              {(+estimated_rome).toFixed(1)}
            </Text>
          </View>

        </View>
      );
    }
    return null;
  }

  renderReasonForEngagement() {
    const { reason_of_engagement } = this.props;
    if (reason_of_engagement) {
      return (
        <Card>
          {
                        reason_of_engagement.map((question, index) => (
                          <CardItem key={index} bordered style={styles.cardEngagementReason}>
                            <Text style={styles.engagementQuestion}>
                              FLAG:
                              {question.red_flag}
                            </Text>
                            <Text style={styles.engagementAnswer}>
                              {question.question}
                              :
                              {' '}
                              {question.reason}
                            </Text>
                            <Text style={styles.engagementAnswer}>
                              {question.improveaction}
                              :
                              {' '}
                              {question.action}
                            </Text>
                          </CardItem>
                        ))
                    }
        </Card>
      );
    }
    return null;
  }

  renderEngagementDetails() {
    const { engagement_details } = this.props;
    if (engagement_details) {
      const {
        brands, type_of_engagement, type_of_sponsorship, name_of_activity, recommended_by
      } = engagement_details;
      return (
        <View>
          <View style={styles.modalBrands}>
            {
                            brands.map((brand, index) => (
                              <Text style={styles.modalBrand} key={index}>
                                Focus Brand
                                {index + 1}
                                {' '}
                                (as per GSP):
                                {brand.Name}
                              </Text>
                            ))
                        }
          </View>
          <Text style={styles.engagementDetail}>
            Type Of Engagement:
            {type_of_engagement}
          </Text>
          <Text style={styles.engagementDetail}>
            Type Of Sponsorship:
            {type_of_sponsorship}
          </Text>
          <Text style={styles.engagementDetail}>
            Name Of Activity:
            {name_of_activity}
          </Text>
          <Text style={styles.engagementDetail}>
            Recommended by:
            {recommended_by}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { collapsibleToggleArray } = this.state;
    const { loading } = this.props;

    return (
      <ParentView loading={loading}>
        <ScrollView>
          <Collapse
            onToggle={(isCollapsed) => this.toggleCollapse(0, isCollapsed)}
            isCollapsed={collapsibleToggleArray[0]}
            style={styles.container}
          >
            <CollapseHeader style={styles.headerStyle}>
              <ImageBackground
                source={this.state.collapsibleToggleArray[0] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                style={styles.headerImageBg}
                resizeMode="contain"
              >
                <Text style={styles.headerText}>Select Doctor</Text>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              {this.renderDoctorDetail()}
            </CollapseBody>
          </Collapse>

          <Collapse
            onToggle={(isCollapsed) => this.toggleCollapse(1, isCollapsed)}
            isCollapsed={collapsibleToggleArray[1]}
            style={styles.container}
          >
            <CollapseHeader style={styles.headerStyle}>
              <ImageBackground
                source={this.state.collapsibleToggleArray[1] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                style={styles.headerImageBg}
                resizeMode="contain"
              >
                <Text style={styles.headerText}>Doctor Metrics</Text>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              {this.renderDoctorMetrics()}
            </CollapseBody>
          </Collapse>

          <Collapse
            onToggle={(isCollapsed) => this.toggleCollapse(2, isCollapsed)}
            isCollapsed={collapsibleToggleArray[2]}
            style={styles.container}
          >
            <CollapseHeader style={styles.headerStyle}>
              <ImageBackground
                source={this.state.collapsibleToggleArray[2] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                style={styles.headerImageBg}
                resizeMode="contain"
              >
                <Text style={styles.headerText}>Reason for Engagement</Text>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              {this.renderReasonForEngagement()}
            </CollapseBody>
          </Collapse>

          <Collapse
            onToggle={(isCollapsed) => this.toggleCollapse(3, isCollapsed)}
            isCollapsed={collapsibleToggleArray[3]}
            style={styles.container}
          >
            <CollapseHeader style={styles.headerStyle}>
              <ImageBackground
                source={this.state.collapsibleToggleArray[3] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                style={styles.headerImageBg}
                resizeMode="contain"
              >
                <Text style={styles.headerText}>Engagement Details</Text>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              {this.renderEngagementDetails()}
            </CollapseBody>
          </Collapse>

        </ScrollView>
      </ParentView>
    );
  }
}
