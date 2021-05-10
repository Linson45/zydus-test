import React, { Component } from 'react';
import Modal from 'react-native-modal';
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import styles from './styles';
import { HIDE_PARTICIPANTS_SCREEN, openTokToggles } from '../../../actions';

class ParticipantComponent extends Component {
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Icon style={styles.headingIcon} name="file" type="FontAwesome" />
          <Text style={styles.headerHeading}>Participants</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.openTokToggles(HIDE_PARTICIPANTS_SCREEN);
            }}
            style={styles.iconButtonStyle}
          >
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

  render() {
    const { isVisible, participants } = this.props;
    return (
      <>
        <Modal
          isVisible={isVisible}
          style={styles.content}
          onRequestClose={() => { this.props.openTokToggles(HIDE_PARTICIPANTS_SCREEN); }}
        >
          <ScrollView contentContainerStyle={styles.container}>
            {this.renderHeader()}
            {
              participants.map((item, index) => (
                <View style={[styles.row]} key={index}>
                  <Text style={styles.rowText}>{item.name}</Text>
                </View>
              ))
          }
          </ScrollView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  openTokScreen: state.openTokScreen,
  isVisible: state.openTokScreen.extra.showParticipantModal,
  participants: state.openTokScreen.extra.participants,
});

export default connect(
  mapStateToProps,
  { openTokToggles }
)(ParticipantComponent);
