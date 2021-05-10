import React from 'react';
import { Icon, Text } from 'native-base';
import {
  ImageBackground, ScrollView, TouchableOpacity, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ColorStyle from '../../../styles/colorsStyles';

export default class PendingApprovalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(false)
    };
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderList() {
    const { doctors, goToReview } = this.props;
    const { collapsibleToggleArray } = this.state;

    if (doctors && Array.isArray(doctors)) {
      return doctors.map(({ hq_name, hq_code, doctors }, index) => (
        <Collapse
          key={hq_code}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
          style={styles.container}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{hq_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {
                                    doctors.map((doctor, index) => {
                                      const {
                                        doc_code, hq_desc, doc_name, doc_spec, visit_category, engagement_type,
                                        sponsorship_type, name_of_activity, proposed_expense, estimated_rome,
                                        recommended_by, submitted_by, submitted_on
                                      } = doctor;

                                      return (
                                        <TouchableOpacity
                                          key={index}
                                          onPress={() => {
                                            goToReview(doctor);
                                          }}
                                          style={styles.item}
                                        >
                                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
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
                                            </View>
                                            <Icon name="information-circle-outline" style={{ color: ColorStyle.gray_light, marginRight: 10 }} />
                                          </View>
                                          <Text style={styles.itemHeading}>Proposed Engagement Details</Text>
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
                                            {estimated_rome ? (+estimated_rome).toFixed(1) : '0.0'}
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
                                        </TouchableOpacity>
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
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          {this.renderList()}
        </ScrollView>
      </ParentView>
    );
  }
}
