import React from 'react';
import {
  Container
} from 'native-base';
import {
  ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import TabStyles from '../../../styles/tabStyles';
import Images from '../../../Constants/imageConstants';

export default class RbmPendingRequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray1: new Array(100).fill(false),
      collapsibleToggleArray2: new Array(100).fill(false),
    };
  }

  toggleCollapse1(position, value) {
    const toggleArray = this.state.collapsibleToggleArray1;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray1: toggleArray });
  }

  renderTab1List() {
    const { pendingApproval } = this.props;
    const { collapsibleToggleArray1 } = this.state;

    if (pendingApproval && Array.isArray(pendingApproval)) {
      return pendingApproval.map(({ hq_name, hq_code, doctors }, index) => (
        <Collapse
          key={hq_code}
          onToggle={(isCollapsed) => this.toggleCollapse1(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray1[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray1[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{hq_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {
                                    doctors.map(({
                                      doc_name, doc_code, doc_spec, visit_category, hq_desc,
                                      engagement_type, sponsorship_type, name_of_activity, proposed_expense,
                                      recommended_by, submitted_by, submitted_on, pendingwithdesignation,
                                      estimated_rome
                                    }, index) => {
                                      if (estimated_rome) estimated_rome = +estimated_rome;
                                      return (
                                        <View style={styles.item} key={index}>
                                          <Text style={styles.name}>
                                            {doc_name}
                                            {' '}
                                            (
                                            {doc_code}
                                            )
                                          </Text>
                                          <Text style={styles.subText}>
                                            {visit_category}
                                            ,
                                            {' '}
                                            {doc_spec}
                                          </Text>
                                          <Text style={styles.subText}>{hq_desc}</Text>

                                          <Text style={styles.rowHeading}>Proposed Engagement Details:</Text>
                                          <Text style={styles.subText}>
                                            Type of Engagement:
                                            {engagement_type}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Type of Sponsorship:
                                            {sponsorship_type}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Name of Activity:
                                            {name_of_activity}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Proposed Expense:
                                            {priceFormatWithoutDecimal(proposed_expense)}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Estimated ROME:
                                            {estimated_rome ? estimated_rome.toFixed(1) : '0.0'}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Recommended By:
                                            {recommended_by}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Submitted By:
                                            {submitted_by}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Submitted On:
                                            {submitted_on}
                                          </Text>
                                          <Text style={styles.status}>Status:</Text>
                                          <Text style={styles.status}>
                                            Pending with
                                            {pendingwithdesignation}
                                          </Text>
                                        </View>
                                      );
                                    })
                                }
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  toggleCollapse2(position, value) {
    const toggleArray = this.state.collapsibleToggleArray2;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray2: toggleArray });
  }

  renderTab2List() {
    const { pendingAction } = this.props;
    const { collapsibleToggleArray2 } = this.state;

    if (pendingAction && Array.isArray(pendingAction)) {
      return pendingAction.map(({ hq_name, hq_code, doctors }, index) => (
        <Collapse
          key={hq_code}
          onToggle={(isCollapsed) => this.toggleCollapse2(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray2[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray2[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{hq_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {
                                    doctors.map(({
                                      doc_name, doc_code, doc_spec, visit_category, hq_desc,
                                      engagement_type, sponsorship_type, name_of_activity, proposed_expense,
                                      recommended_by, submitted_by, submitted_on, action_item,
                                      estimated_rome
                                    }, index) => {
                                      if (estimated_rome) estimated_rome = +estimated_rome;
                                      return (
                                        <View style={styles.item} key={index}>
                                          <Text style={styles.name}>
                                            {doc_name}
                                            {' '}
                                            (
                                            {doc_code}
                                            )
                                          </Text>
                                          <Text style={styles.subText}>
                                            {visit_category}
                                            ,
                                            {' '}
                                            {doc_spec}
                                          </Text>
                                          <Text style={styles.subText}>{hq_desc}</Text>

                                          <Text style={styles.rowHeading}>Proposed Engagement Details:</Text>
                                          <Text style={styles.subText}>
                                            Type of Engagement:
                                            {engagement_type}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Type of Sponsorship:
                                            {sponsorship_type}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Name of Activity:
                                            {name_of_activity}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Proposed Expense:
                                            {priceFormatWithoutDecimal(proposed_expense)}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Estimated ROME:
                                            {estimated_rome ? estimated_rome.toFixed(1) : '0.0'}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Recommended By:
                                            {recommended_by}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Submitted By:
                                            {submitted_by}
                                          </Text>
                                          <Text style={styles.subText}>
                                            Submitted On:
                                            {submitted_on}
                                          </Text>
                                          <Text style={styles.status}>Status:</Text>
                                          <Text style={styles.status}>Completed</Text>
                                          <Text style={styles.status}>Action Item Details:</Text>
                                          <Text style={styles.status}>{action_item}</Text>

                                          <View style={styles.buttons}>
                                            <TouchableOpacity>
                                              <Text style={styles.buttonLeft}>RE-OPEN</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity>
                                              <Text style={styles.buttonRight}>CLOSE</Text>
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                      );
                                    })
                                }
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  render() {
    const { loading } = this.props;

    return (
      <ParentView loading={loading} style={styles.container}>
        <Container>
          <ScrollableTabView
            tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
            tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
            tabBarInactiveTextColor={TabStyles.textStyle.color}
            tabBarActiveTextColor={TabStyles.activeTextStyle.color}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <View tabLabel="Pending Approvals">
              <ScrollView style={styles.container}>
                {this.renderTab1List()}
              </ScrollView>
            </View>
            <View tabLabel="Pending Actions">
              <ScrollView style={styles.container}>
                {this.renderTab2List()}
              </ScrollView>
            </View>
          </ScrollableTabView>

        </Container>
      </ParentView>
    );
  }
}
