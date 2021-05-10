import React from 'react';
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Card } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import colorsStyles from '../../../styles/colorsStyles';
import { Role } from '../../../util/Constants';
import ParentView from '../../ParentView';
import styles from './styles';
import Images from '../../../Constants/imageConstants';

class AddComponent extends React.Component {
  renderDetails() {
    const {
      loadEmployees, selectEmployee, submit, onChangeText, problemDesc, rootCause,
      actionPlan, user, selectDivision, selected_type, selected_employee, selected_division, changeDate, targetClosureDate
    } = this.props;
    let { types, employees, divisions } = this.props;
    if (!types.length) {
      return null;
    }
    types = types.map((type, index) => ({ label: type, value: type, key: index }));
    if (!employees) employees = [];
    employees = employees.map((employee, index) => ({ value: employee.rep_code, label: employee.name, key: index }));
    if (!divisions) divisions = [];

    divisions = divisions.map((division, index) => ({ label: division.div_name, value: division.div_id, key: index }));

    return (
      <View>
        <Card style={styles.topCard}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#2F3195', '#842760']}
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            {
                            Role.isHOUser(user.user_type)
                              ? (
                                <Dropdown
                                  value={selected_division}
                                  label="Division"
                                  containerStyle={{
                                    backgroundColor: colorsStyles.transparent,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    color: colorsStyles.white
                                  }}
                                  itemColor={colorsStyles.gray}
                                  selectedItemColor={colorsStyles.gray}
                                  textColor={colorsStyles.white}
                                  baseColor={colorsStyles.white}
                                  dropdownOffset={{
                                    top: 10,
                                    left: 0
                                  }}
                                  fontSize={16}
                                  data={divisions}
                                  onChangeText={(value) => {
                                    selectDivision(value);
                                  }}
                                />
                              )
                              : null
                        }

            <Dropdown
              value={selected_type}
              label="Hierarchy"
              containerStyle={{
                backgroundColor: colorsStyles.transparent,
                paddingHorizontal: 15,
                borderRadius: 5,
                color: colorsStyles.white
              }}
              itemColor={colorsStyles.gray}
              selectedItemColor={colorsStyles.gray}
              textColor={colorsStyles.white}
              baseColor={colorsStyles.white}
              dropdownOffset={{
                top: 10,
                left: 0,
              }}
              fontSize={16}
              data={types}
              onChangeText={(value) => {
                loadEmployees(value);
              }}
            />

            <Dropdown
              value={selected_employee}
              label="Select Employee"
              containerStyle={{
                backgroundColor: colorsStyles.transparent,
                paddingHorizontal: 15,
                borderRadius: 5,
                color: colorsStyles.white
              }}
              itemColor={colorsStyles.gray}
              selectedItemColor={colorsStyles.gray}
              textColor={colorsStyles.white}
              baseColor={colorsStyles.white}
              dropdownOffset={{
                top: 10,
                left: 0
              }}
              fontSize={16}
              data={employees}
              onChangeText={(value) => {
                selectEmployee(value);
              }}
            />
          </LinearGradient>
        </Card>

        <View style={styles.form}>
          <Text style={styles.label}>Problem Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText('problemDesc', text)}
            multiline
            value={problemDesc}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Root Cause</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText('rootCause', text)}
            multiline
            value={rootCause}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Action Plan</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText('actionPlan', text)}
            multiline
            value={actionPlan}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Target Date</Text>
          <DatePicker
            style={{
              paddingTop: 2, paddingBottom: 2, margin: 5, width: '100%'
            }}
            iconSource={Images.calendarGrayIcon}
            mode="time"
            format="DD MMM YYYY"
            minDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            date={targetClosureDate}
            customStyles={{
              dateIcon: {
                width: 25,
                height: 25,
              },
              dateTouchBody: {
                flexDirection: 'row',
                height: 22,
                alignItems: 'center',
                justifyContent: 'center'
              },
              dateInput: {
                flex: 1,
                height: 40,
                borderWidth: 0,
                borderColor: '#aaa',
                borderBottomWidth: 1,
                alignItems: 'flex-start',
                paddingLeft: 10,
                justifyContent: 'center'
              }
            }}
            onDateChange={(date) => changeDate(date)}
          />

        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity opaque={1} style={styles.button} onPress={() => submit()}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#2F3195', '#842760']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
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
        <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          {this.renderDetails()}
          <View style={{ height: 20 }} />
        </ScrollView>
      </ParentView>
    );
  }
}

export default AddComponent;
