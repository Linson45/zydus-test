import React from 'react';
import { connect } from 'react-redux';
import {
  addOpenTokData, CLOSE_CHAT_SCREEN,
  openTokToggles,
  RESET_INITIAL_STATE_OPENTOK,
  TOGGLE_CAMERA_POSITION,
  TOGGLE_OPENTOK_SCREEN,
  UPDATE_DETAILING_DATA,
  VIDEO_SOURCE_CAMERA
} from '../../../actions';
import VirtualDetailingVideoComponent from '../../../components/detailing/VirtualDetailingVideoComponent';
import ParticipantComponent from '../../../components/detailing/ParticipantComponent';
import PendingVDetailingContainer from '../PendingVdetailingContainer';
import FloatingButtonComponent from '../../../components/detailing/FloatingButtonComponent';
import ParentView from '../../../components/ParentView';

class VirtualDetailingVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      end: false
    };
  }

  componentDidMount() {
    this.props.openTokToggles(TOGGLE_OPENTOK_SCREEN);
    this.props.openTokToggles(TOGGLE_CAMERA_POSITION);
    this.props.openTokToggles(CLOSE_CHAT_SCREEN);
    this.props.addOpenTokData(UPDATE_DETAILING_DATA, {
      actual_start_time: new Date()
    });
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.props.openTokToggles(VIDEO_SOURCE_CAMERA);
      }
    );
  }

  componentWillUnmount() {
    this.willFocus.remove();
    this.props.openTokToggles(TOGGLE_OPENTOK_SCREEN);
    this.props.openTokToggles(RESET_INITIAL_STATE_OPENTOK);
  }

  render() {
    const {
      openTokScreen,
      shareButtonDisabled,
      disableFirstLoad
    } = this.props;
    const {
      doctor,
      date
    } = this.props.navigation.state.params;
    return (
      <ParentView
        connected
        hoverLoading={shareButtonDisabled || disableFirstLoad}
      >
        <VirtualDetailingVideoComponent
          doctor={doctor}
          date={date}
          navigation={this.props.navigation}
          openTokScreenData={openTokScreen}
        />
        { !(shareButtonDisabled || disableFirstLoad) ? (
          <FloatingButtonComponent
            navigation={this.props.navigation}
            showContentHubButton="true"
            showOffVideoBGImage="true"
            showCameraSwitchButton="true"
          />
        ) : null }
        <ParticipantComponent />
        <PendingVDetailingContainer navigation={this.props.navigation} doctor={doctor} />
      </ParentView>
    );
  }
}

const mapStateToProps = (state) => ({
  openTokScreen: state.openTokScreen,
  shareButtonDisabled: state.openTokScreen.shareButtonDisabled,
  disableFirstLoad: state.openTokScreen.disableFirstLoad
});

export default connect(
  mapStateToProps,
  { openTokToggles, addOpenTokData }
)(VirtualDetailingVideoContainer);
