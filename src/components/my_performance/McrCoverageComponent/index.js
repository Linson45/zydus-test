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

export default class McrCoverageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: [false, false]
    };
  }

    _onChangeSearchText = (searchQuery) => {
      searchQuery = searchQuery.trim();
      this.props._onChangeSearchText({ searchQuery });
    };

    renderList(doctors) {
      if (!Array.isArray(doctors)) {
        return null;
      }
      return doctors.map((doctor) => {
        const {
          doctor_name, doctor_code, mcr_number, doctor_speciality, rcpa, sales_planned, visit_category
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
                <Text note style={styles.docDetails}>
                  (
                  {doctor_code}
                  )
                </Text>
              </Text>
              <Text note style={styles.docDetails}>
                {doctor_speciality}
                {' '}
                {visit_category}
              </Text>
              <Text note style={styles.docDetails}>
                Sales Planned
                :
                {priceFormatWithoutDecimal(sales_planned)}
              </Text>
              <Text note style={styles.docDetails}>
                RCPA :
                {priceFormatWithoutDecimal(rcpa)}
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

    render() {
      const {
        loading, doctors_met, doctors_not_met, _onChangeSearchText
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
                    <Text style={styles.headerText}>Doctors Not Met</Text>
                  </ImageBackground>
                </CollapseHeader>
                <CollapseBody>
                  <ScrollView>
                    {doctors_not_met ? this.renderList(doctors_not_met) : null}
                  </ScrollView>
                </CollapseBody>
              </Collapse>

              <Collapse onToggle={(isCollapsed) => this.toggleCollapse(1, isCollapsed)}>
                <CollapseHeader>
                  <ImageBackground
                    source={this.state.collapsibleToggleArray[1] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                    style={styles.headerImageBg}
                  >
                    <Text style={styles.headerText}>Doctors Met</Text>
                  </ImageBackground>
                </CollapseHeader>
                <CollapseBody>
                  <ScrollView>
                    {doctors_met ? this.renderList(doctors_met) : null}
                  </ScrollView>
                </CollapseBody>
              </Collapse>

            </Content>
          </Container>
        </ParentView>
      );
    }
}
