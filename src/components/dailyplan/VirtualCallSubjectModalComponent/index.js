import React, { Component } from 'react';
import {
  Dimensions, FlatList, Text, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'native-base';
import styles from './styles';

export default class VirtualCallSubjectModalComponent extends Component {
  renderHeader() {
    const { onClose } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Icon style={styles.headingIcon} name="file" type="FontAwesome" />
          <Text style={styles.headerHeading}>Select Subject</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => (onClose ? onClose() : null)} style={styles.iconButtonStyle}>
            <Icon
              name="times-circle-o"
              type="FontAwesome"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSubjects() {
    const { subjects } = this.props;
    return (
      <View>
        <FlatList
          style={{ height: Dimensions.get('window').height / 2 }}
          data={subjects}
          renderItem={({ item }) => (
            this.renderSubject(item)
          )}
          keyExtractor={(item) => item.doc_code}
        />
      </View>
    );
  }

    renderSubject = (subject) => (
      <TouchableOpacity
        style={styles.doctorRow}
        onPress={() => {
          this.onSubmitAction(subject);
        }}
      >
        <Text style={styles.doctorName}>{subject}</Text>
      </TouchableOpacity>
    );

    onSubmitAction = (subject) => {
      const { onSubmit } = this.props;
      onSubmit(subject);
    };

    render() {
      const { isVisible } = this.props;

      return (

        <Modal isVisible={isVisible}>
          <View style={styles.container}>
            <View style={{ ...styles.content }}>
              {this.renderHeader()}
              {this.renderSubjects()}
            </View>
          </View>
        </Modal>
      );
    }
}
