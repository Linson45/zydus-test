import React from 'react';
import {
  Body, Container, Content, Icon, Input, Item, ListItem, Text
} from 'native-base';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import { ImageBackground, ScrollView } from 'react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import LayoutStyle from '../../../styles/layoutStyles';

export default class GspComplianceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: [false, false]
    };
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderList(doctors) {
    if (!Array.isArray(doctors)) {
      return null;
    }
    return doctors.map((doctor) => {
      const {
        doctor_name, doctor_code, mcr_number, doctor_speciality, rcpa, sales_planned, last_visit_date, visits_this_month
      } = doctor;
      return (
        <ListItem key={doctor_code}>
          <Body>
            <Text note style={styles.docDetails}>
              #
              {mcr_number}
            </Text>
            <Text style={styles.docName}>
              {doctor_name}
              {' '}
              <Text
                note
                style={styles.docDetails}
              >
                (
                {doctor_code}
                )
              </Text>
            </Text>
            <Text note style={styles.docDetails}>{doctor_speciality}</Text>
            <Text note style={styles.docDetails}>
              Sales Planned
              :
              {priceFormatWithoutDecimal(sales_planned)}
            </Text>
            <Text note style={styles.docDetails}>
              RCPA :
              {priceFormatWithoutDecimal(rcpa)}
            </Text>
            <Text note style={styles.docDetailsRight}>
              Last Visited Date:
              {last_visit_date}
            </Text>
            <Text note style={styles.docDetailsRight}>
              # of Visits this month:
              {visits_this_month}
            </Text>
          </Body>
        </ListItem>
      );
    });
  }

  render() {
    const {
      loading, doctors_compliance, doctors_not_compliance, _onChangeSearchText
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <Item style={LayoutStyle.searchBar}>
            <Icon name="ios-search" style={LayoutStyle.searchBarIcon} />
            <Input
              onChangeText={(searchQuery) => _onChangeSearchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          <Content>
            <Collapse onToggle={(isCollapsed) => this.toggleCollapse(0, isCollapsed)}>
              <CollapseHeader style={styles.headerStyle}>
                <ImageBackground
                  source={this.state.collapsibleToggleArray[0] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                  style={styles.headerImageBg}
                >
                  <Text style={styles.headerText}>Doctors with less Compliance</Text>
                </ImageBackground>
              </CollapseHeader>
              <CollapseBody>
                <ScrollView>
                  {doctors_compliance ? this.renderList(doctors_not_compliance) : null}
                </ScrollView>
              </CollapseBody>
            </Collapse>
            <Collapse onToggle={(isCollapsed) => this.toggleCollapse(1, isCollapsed)}>
              <CollapseHeader>
                <ImageBackground
                  source={this.state.collapsibleToggleArray[1] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                  style={styles.headerImageBg}
                >
                  <Text style={styles.headerText}>Doctors with 100% Compliance</Text>
                </ImageBackground>
              </CollapseHeader>
              <CollapseBody>
                <ScrollView>
                  {doctors_not_compliance ? this.renderList(doctors_compliance) : null}
                </ScrollView>
              </CollapseBody>
            </Collapse>

          </Content>
        </Container>
      </ParentView>
    );
  }
}
