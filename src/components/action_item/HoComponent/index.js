import React, { Component } from 'react';
import {
  Body, Card, Fab, Icon, ListItem
} from 'native-base';
import {
  ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';
import Colors from '../../../styles/colorsStyles';

class HoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  getCardBgColor(index) {
    const { selectedIndex } = this.state;
    if (selectedIndex === index) return Colors.light_blue;
    return Colors.white;
  }

  getCardNumberColor(index) {
    const { selectedIndex } = this.state;
    if (selectedIndex === index) return Colors.white;
    return Colors.gray_light_1;
  }

  getCardTextColor(index) {
    const { selectedIndex } = this.state;
    if (selectedIndex === index) return Colors.white;
    return Colors.gray;
  }

  renderHeader() {
    const { data } = this.props;
    if (data) {
      let {
        myOpenActions, teamOpenActions, actionsForClosure, closedActions, invalidActions, completedActions
      } = data;
      if (!myOpenActions) myOpenActions = [];
      if (!teamOpenActions) teamOpenActions = [];
      if (!actionsForClosure) actionsForClosure = [];
      if (!closedActions) closedActions = [];
      if (!invalidActions) invalidActions = [];
      if (!completedActions) completedActions = [];

      return (
        <View style={styles.headerImg}>
          <View style={styles.cardTopContainer}>
            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(0) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 0 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(0)
                }}
                >
                  {myOpenActions.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(0) }}>
                  My Open
                  Actions
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(1) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 1 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(1)
                }}
                >
                  {teamOpenActions.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(1) }}>
                  Team Open
                  Actions
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(2) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 2 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(2)
                }}
                >
                  {actionsForClosure.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(2) }}>
                  Actions For
                  Closure
                </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={styles.cardBottomContainer}>
            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(3) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 3 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(3)
                }}
                >
                  {closedActions.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(3) }}>
                  Closed
                  Actions
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(4) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 4 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(4)
                }}
                >
                  {invalidActions.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(4) }}>
                  Invalid
                  Actions
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, backgroundColor: this.getCardBgColor(5) }}>
              <TouchableOpacity onPress={() => this.setState({ selectedIndex: 5 })}>
                <Text style={{
                  ...styles.number,
                  color: this.getCardNumberColor(5)
                }}
                >
                  {completedActions.length}
                </Text>
                <Text style={{ ...styles.numberText, color: this.getCardTextColor(5) }}>
                  Completed
                  Actions
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      );
    }
    return null;
  }

  renderList() {
    const { data } = this.props;

    if (data) {
      const { selectedIndex } = this.state;
      const {
        myOpenActions, teamOpenActions, actionsForClosure, closedActions, invalidActions, completedActions
      } = data;
      let items = [];
      if (selectedIndex === 0) items = myOpenActions;
      else if (selectedIndex === 1) items = teamOpenActions;
      else if (selectedIndex === 2) items = actionsForClosure;
      else if (selectedIndex === 3) items = closedActions;
      else if (selectedIndex === 4) items = invalidActions;
      else if (selectedIndex === 5) items = completedActions;

      if (items && items.length && Array.isArray(items)) {
        return (
          <ScrollView style={styles.listParent}>

            {
                            items.map((item) => this.renderItem(item))
                        }
          </ScrollView>

        );
      }
      return (
        <Text style={styles.noData}>No Data Available</Text>

      );
    }
    return null;
  }

  getStatusColor(status) {
    if (!status) status = '';
    status = status.toLowerCase();
    if (status === 'approved') return Colors.sky_blue;
    if (status === 'in progress') return Colors.sky_blue;
    if (status === 'delayed') return Colors.red;
    if (status === 'submitted') return Colors.colorPrimary;
    if (status === 'completed') return Colors.green;
    if (status === 'on track') return Colors.sky_blue;
    if (status === 'new') return Colors.sky_blue;
    return Colors.text_dark_gray;
  }

  renderItem(item) {
    const { gotoDetails } = this.props;
    const {
      summary, problemDesc, assignedBy, targetClosureDate, actionStatus
    } = item;
    return (
      <ListItem onPress={() => gotoDetails(item)}>
        <Body>
          <Text style={styles.rowHeading}>{summary}</Text>
          <Text style={styles.problemHeading}>Problem Description:</Text>
          <Text style={styles.problem}>{problemDesc}</Text>
          <Text style={styles.problemHeading}>Created By:</Text>
          <Text style={styles.problem}>{assignedBy.user}</Text>
          <Text style={styles.deadline}>
            Deadline:
            {targetClosureDate}
          </Text>
          <View style={styles.lastRow}>
            <Text style={{ ...styles.status, color: this.getStatusColor(actionStatus) }}>{actionStatus}</Text>
            <Icon name="rightcircle" type="AntDesign" style={styles.arrow} />
          </View>
        </Body>
      </ListItem>
    );
  }

  renderFab() {
    const { gotoAdd } = this.props;
    return (
      <Fab
        direction="up"
        style={{ backgroundColor: Colors.colorPrimary }}
        position="bottomRight"
        onPress={() => gotoAdd({})}
      >
        <Icon name="add" />
      </Fab>
    );
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
        <ImageBackground source={Images.ic_bg_main_1} style={styles.headerImg} resizeMode="stretch">
          {this.renderHeader()}

        </ImageBackground>
        <Text style={styles.heading}>Action Summary</Text>
        {this.renderList()}
        {this.renderFab()}
      </ParentView>
    );
  }
}

export default HoComponent;
