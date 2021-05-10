import React from 'react';
import {
  Body, Container, Content, Icon, Input, Item, ListItem, Text
} from 'native-base';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import { ImageBackground, ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import Images from '../../../Constants/imageConstants';
import LayoutStyle from '../../../styles/layoutStyles';

export default class RcpaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsRcpaArray: null,
      doctorsNotRcpaArray: null,
      collapsibleToggleArray: [false, false],
      searchQuery: null
    };
  }

  renderList(doctorsList, listType) {
    let doctors = null;
    if (listType === 1) {
      if (this.state.doctorsNotRcpaArray && this.state.searchQuery) {
        doctors = this.state.doctorsNotRcpaArray;
      } else doctors = doctorsList;
    } else if (this.state.doctorsRcpaArray && this.state.searchQuery) {
      doctors = this.state.doctorsRcpaArray;
    } else doctors = doctorsList;
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

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  searchText(searchQuery) {
    if (searchQuery != null) {
      this.setState({ searchQuery });
      searchQuery = searchQuery.toLowerCase();
      const { doctors_rcpa } = this.props;
      const { doctors_not_rcpa } = this.props;
      const searchResults1 = [];
      const searchResults2 = [];
      for (let index = 0; index < doctors_rcpa.length; index++) {
        const itemName = doctors_rcpa[index].doctor_name.toLowerCase();
        if (itemName.includes(searchQuery)) {
          searchResults1.push(doctors_rcpa[index]);
        }
      }
      for (let index = 0; index < doctors_not_rcpa.length; index++) {
        const itemName = doctors_not_rcpa[index].doctor_name.toLowerCase();
        if (itemName.includes(searchQuery)) {
          searchResults2.push(doctors_not_rcpa[index]);
        }
      }
      this.setState({
        doctorsRcpaArray: searchResults1,
        doctorsNotRcpaArray: searchResults2,
      });
    }
  }

  render() {
    const { loading, doctors_not_rcpa, doctors_rcpa } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <Content>
            <Item style={LayoutStyle.searchBar}>
              <Icon name="ios-search" style={LayoutStyle.searchBarIcon} />
              <Input
                onChangeText={(searchQuery) => this.searchText(searchQuery)}
                placeholder="Search"
              />
            </Item>
            <Collapse onToggle={(isCollapsed) => this.toggleCollapse(0, isCollapsed)}>
              <CollapseHeader style={styles.headerStyle}>
                <ImageBackground
                  source={this.state.collapsibleToggleArray[0] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                  style={styles.headerImageBg}
                >
                  <Text style={styles.headerText}>Doctors not RCPAed</Text>
                </ImageBackground>
              </CollapseHeader>
              <CollapseBody>
                <ScrollView>
                  {doctors_not_rcpa ? this.renderList(doctors_not_rcpa, 1) : null}
                </ScrollView>
              </CollapseBody>
            </Collapse>
            <Collapse onToggle={(isCollapsed) => this.toggleCollapse(1, isCollapsed)}>
              <CollapseHeader>
                <ImageBackground
                  source={this.state.collapsibleToggleArray[1] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                  style={styles.headerImageBg}
                >
                  <Text style={styles.headerText}>Doctors RCPAed</Text>
                </ImageBackground>
              </CollapseHeader>
              <CollapseBody>
                <ScrollView>
                  {doctors_rcpa ? this.renderList(doctors_rcpa, 2) : null}
                </ScrollView>
              </CollapseBody>
            </Collapse>

          </Content>
        </Container>
      </ParentView>
    );
  }
}
