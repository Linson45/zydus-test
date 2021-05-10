import React from 'react';
import RxAbmSubmitApprovelsComponents from '../../../components/rx_tracker/RxAbmSubmitApprovelsComponents';
import { connect } from 'react-redux';
import { postABMApprovedList } from '../../../actions';
import api from '../../../api';
import Urls from '../../../api/urls';
import { Alert } from 'react-native';
import { StackActions } from 'react-navigation';
import {
  getCurrentMonth,
  getCurrentYear,
  getFullMonthString,
} from '../../../util/dateTimeUtil';
class RxAbmSubmitApprovelsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: {
        isInternetConnected: true,
      },
      list: [],
      searchQuery: null,
      isSubmitProgress: false,
    };
  }

  static navigationOptions = {
    title: 'Rx',
  };

  render() {
    const user = this.props.navigation.state.params.docData;
    const reasons = this.props.navigation.state.params.redirection;
    const userDetails = this.props.navigation.state.params.userDetails;
    const boNameData = this.props.navigation.state.params.boNameData;
    // console.log('Apsel BO',boNameData)
    return (
      <RxAbmSubmitApprovelsComponents
        user={user}
        userDetails={userDetails}
        reasons={reasons}
        boNameData={boNameData}
      />
    );
  }
}

const mapStateToProps = state => ({
  LoadABMApproved: state.LoadABMApproved,
});

export default connect(
  mapStateToProps,
  { postABMApprovedList },
)(RxAbmSubmitApprovelsContainer);
