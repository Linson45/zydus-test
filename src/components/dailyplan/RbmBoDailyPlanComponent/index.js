import React from 'react';
import {
  Body, Container, Content, Icon, ListItem, Right, Text
} from 'native-base';
import {
  ActivityIndicator, ImageBackground, ScrollView, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ParentView from '../../ParentView';
import styles from './styles';
import Images from '../../../Constants/imageConstants';
import Colors from '../../../styles/colorsStyles';

export default class RbmBoDailyPlanComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(true)
    };
  }

  renderCalendar() {
    const { changeQuery, date } = this.props;
    return (
      <CalendarStrip
        scrollable
        style={styles.calendar}
        selectedDate={date}
        calendarHeaderStyle={styles.calendarHeader}
        highlightDateNameStyle={styles.calendarDateName}
        highlightDateNumberStyle={styles.calendarDateNumber}
        onDateSelected={(date) => {
          changeQuery(date.format('DD-MMM-YYYY'));
        }}
      />
    );
  }

  renderLoader() {
    const { loading } = this.props;
    if (loading) {
      return (
        <ActivityIndicator color={Colors.gray} style={styles.loader} />
      );
    }
    return null;
  }

  renderList(bos) {
    const { onPress } = this.props;

    return bos.map((bo, index) => {
      const { name, hq_name, is_jfw } = bo;

      return (
        <ListItem key={index} onPress={() => onPress(bo)}>
          <Body>
            <Text style={styles.name}>{name}</Text>
            <Text note style={styles.secondaryTitle}>
              (BO,
              {hq_name}
              )
            </Text>
          </Body>

          <Right>
            <View style={styles.rightAlign}>
              {is_jfw ? <Text style={styles.masterTitle}>JFW</Text> : null}
              <Icon
                name="rightcircle"
                type="AntDesign"
                style={{ color: Colors.black, fontSize: 16 }}
              />
            </View>
          </Right>
        </ListItem>
      );
    });
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderCollapse() {
    const { data } = this.props;
    const { collapsibleToggleArray } = this.state;

    if (data && Array.isArray(data)) {
      return data.map(({ area_id, area_name, bos }, index) => (
        <Collapse
          key={area_id}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
            >
              <Text style={styles.headerText}>{area_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {this.renderList(bos)}
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
        style={styles.container}
      >
        <Container>
          {this.renderCalendar()}
          {this.renderLoader()}
          <Content>
            {this.renderCollapse()}
          </Content>
        </Container>
      </ParentView>
    );
  }
}
