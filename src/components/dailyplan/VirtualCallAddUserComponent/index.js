import React from 'react';
import {
  ScrollView, View, Text, TextInput, TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';
import ParentView from '../../ParentView';
import styles from './styles';

import Colors from '../../../styles/colorsStyles';

export default class VirtualCallAddUserComponent extends React.Component {
  renderSearch() {
    const { searchText, searchQuery } = this.props;
    return (
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => searchText(text)}
        value={searchQuery}
      />
    );
  }

  renderDoctors() {
    const {
      data, onChange, selected, doneDoctors, doctor
    } = this.props;
    const selectedDoctor = doctor.doc_code;
    if (data && Array.isArray(data)) {
      return data.filter((doctor) => doctor.doc_code !== selectedDoctor).map((doctor, index) => {
        const {
          doc_name,
          doc_code,
          mobile_no,
          email
        } = doctor;

        if (doneDoctors.indexOf(doc_code) !== -1) {
          return null;
        }
        return (
          <View style={styles.listRow} key={index}>
            <View style={styles.left}>
              <CheckBox
                onClick={() => onChange(doc_code, doctor)}
                isChecked={Boolean(selected && selected[doc_code])}
                checkBoxColor={Colors.content}
              />
              <Text style={styles.doctorName}>{doc_name}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.email}>{email || '-'}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.email}>{mobile_no || '-'}</Text>
            </View>
          </View>
        );
      });
    }
    return null;
  }

  renderTeam() {
    const {
      team, onTeamChange, selectedTeam
    } = this.props;

    if (team && Array.isArray(team)) {
      return team.map((user) => {
        const {
          name, rep_code, mobile, email
        } = user;
        return (
          <View style={styles.listRow} key={rep_code}>
            <View style={styles.left}>
              <CheckBox
                onClick={() => onTeamChange(rep_code, user)}
                isChecked={Boolean(selectedTeam && selectedTeam[rep_code])}
                checkBoxColor={Colors.content}
              />
              <Text style={styles.doctorName}>{name}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.email}>{email || '-'}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.email}>{mobile || '-'}</Text>
            </View>
          </View>
        );
      });
    }
    return null;
  }

  renderButton() {
    const { save } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            save();
          }}
        >
          <Text style={styles.buttonText}>Confirm Participants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderHeading(text) {
    return (
      <Text style={styles.heading}>{text}</Text>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <ParentView
        loading={loading}
        connected
      >
        {this.renderSearch()}
        <ScrollView style={styles.container}>
          {this.renderHeading('My Team')}
          {this.renderTeam()}
          <View style={styles.divider} />
          {this.renderHeading('My Doctor List')}
          {this.renderDoctors()}
        </ScrollView>
        {this.renderButton()}
      </ParentView>
    );
  }
}
