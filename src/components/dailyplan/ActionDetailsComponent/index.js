import React from 'react';
import {
  ScrollView, TextInput, TouchableOpacity, View
} from 'react-native';
import {
  Body, Card, CardItem, Icon, Text
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';

const statusList = [{
  label: 'Pending',
  value: 'Pending',
}, {
  label: 'Approved',
  value: 'Approved',
}, {
  label: 'In progress',
  value: 'In progress',
}, {
  label: 'Completed',
  value: 'Completed',
}, {
  label: 'Closed',
  value: 'Closed',
}, {
  label: 'Not Required',
  value: 'Not Required',
}];

export default class ActionDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  renderDetails() {
    const {
      actions, comment, status, onChangeText, changeStatus, submitAction
    } = this.props;
    if (actions) {
      const {
        action_plan, problem_description, root_cause, action_status_name, target_date, assigned_by, assigned_on, action_comment
      } = actions;
      const { open } = this.state;
      return (
        <>
          <View style={styles.topRowBorder}>
            <Text style={FontStyle.fontMedium}>
              {action_plan}
            </Text>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View>
              <Text note style={FontStyle.fontMedium}>
                Problem Description:
              </Text>
              <Text note style={LightFontStyle.fontMedium}>
                {problem_description}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View>
              <Text note style={FontStyle.fontMedium}>
                Root Cause
              </Text>
              <Text note style={LightFontStyle.fontMedium}>
                {root_cause}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={FontStyle.fontMedium}>
                Status:
                <Text note>
                  {` ${action_status_name}`}
                </Text>
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <TouchableOpacity onPress={this.toggle.bind(this)} opacity={1}>
                  <Icon
                    name="pencil"
                    type="EvilIcons"
                    style={{ fontSize: 24 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.topRow]}>
            <View>
              <Text note style={FontStyle.fontMedium}>
                Deadline:
                {' '}
                {target_date}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow]}>
            <View style={styles.leftTopRow}>
              <Text note style={styles.rightTopRowText}>
                Assigned By:
                {' '}
                {assigned_by}
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <Text note style={styles.rightTopRowTextBold}>
                  {assigned_on}
                </Text>
              </View>
            </View>
          </View>
          {open
            ? (
              <>
                <View>
                  <Dropdown
                    label="Change Status"
                    value={status}
                    data={statusList}
                    onChangeText={(value) => {
                      changeStatus(value);
                    }}
                  />
                </View>
                <View style={[styles.topRow, styles.summaryHeader]}>
                  <TextInput
                    style={{
                      height: 80,
                      borderColor: ColorStyles.blue_coachmapdetails,
                      borderWidth: 1,
                      width: '100%',
                      padding: 10,
                      borderRadius: 10
                    }}
                    placeholder="Add Comment"
                    onChangeText={(text) => onChangeText(text)}
                    multiline
                    value={comment}
                  />
                </View>
                <View style={[styles.topRow, styles.summaryHeader, { justifyContent: 'center' }]}>
                  <TouchableOpacity
                    opacity={1}
                    onPress={submitAction}
                    style={{
                      width: '90%',
                      backgroundColor: ColorStyles.blue,
                      borderRadius: 30
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#2F3195', '#842760']}
                      style={{
                        padding: 10,
                        width: '100%',
                        borderRadius: 30,
                        alignItems: 'center'
                      }}
                    >
                      <Text style={[styles.currentMonthText, FontStyle.fontLarge]}>SAVE</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          <View style={{ height: 1, backgroundColor: ColorStyles.black, margin: 10 }} />
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Comment
                </Text>
                <Text note style={LightFontStyle.fontMedium}>
                  {action_comment}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </>
      );
    }
    return null;
  }

  render() {
    const { loading, hoverLoading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
      >
        <ScrollView style={styles.mainView}>
          {this.renderDetails()}
        </ScrollView>
      </ParentView>
    );
  }
}
