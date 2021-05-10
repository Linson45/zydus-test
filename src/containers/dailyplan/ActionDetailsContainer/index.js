import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { StackActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import ActionDetailsComponent from '../../../components/dailyplan/ActionDetailsComponent';
import { submitStatus } from '../../../actions';
import api from '../../../api';
import Urls from '../../../api/urls';
import { addPendingActionSummary } from '../../../local-storage/helper/dailyplan';

class ActionDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      status: '',
      isSubmitting: false,
      isInternetConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected });
      });
  }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected });
        });
    };

    changeStatus(status) {
      this.setState({
        status
      });
    }

    onChangeText(comment) {
      this.setState({
        comment
      });
    }

    static navigationOptions = {
      title: 'Action Item Details',
    };

    async submitAction() {
      const { comment, status } = this.state;
      const { actions } = this.props.navigation.state.params;

      if (status) {
        const payload = {
          action_status_name: status,
          action_summary_code: actions.action_summary_code,
          action_comment: comment
        };
        this.setState({ isSubmitting: true });
        const { statusCode } = await api({
          method: 'POST',
          url: Urls.POST_STATUS,
          data: payload
        });
        this.setState({ isSubmitting: false });
        if (statusCode === 200) {
          Alert.alert(
            'Status update',
            'Status has been updated successfully!',
            [{
              text: 'OK',
              onPress: () => {
                const popAction = StackActions.pop({
                  n: 2,
                });
                this.props.navigation.dispatch(popAction);
              }
            }],
            { cancelable: false }
          );
        } else {
          const { actions } = this.props.navigation.state.params;
          const { assigned_on, action_summary_code } = actions;
          actions.action_comment = comment;
          actions.action_status_name = status;
          addPendingActionSummary(assigned_on, action_summary_code, actions);
          const popAction = StackActions.pop({
            n: 2,
          });
          this.props.navigation.dispatch(popAction);
        }
      }
    }

    render() {
      const { actions } = this.props.navigation.state.params;
      const { comment, status, isSubmitting } = this.state;
      const changeStatus = this.changeStatus.bind(this);
      const onChangeText = this.onChangeText.bind(this);
      const submitAction = this.submitAction.bind(this);
      return (
        <ActionDetailsComponent
          hoverLoading={isSubmitting}
          submitAction={submitAction}
          actions={actions}
          comment={comment}
          onChangeText={onChangeText}
          changeStatus={changeStatus}
          status={status}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanDoctorDetails: state.dailyPlanDoctorDetails
});

export default connect(mapStateToProps, { submitStatus })(ActionDetailsContainer);
