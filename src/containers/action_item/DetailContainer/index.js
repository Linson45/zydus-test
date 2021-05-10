import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { StackActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import { loadActionItemDetails, updateActionItem } from '../../../actions';
import DetailComponent from '../../../components/action_item/DetailComponent';
import { Role } from '../../../util/Constants';
import DetailNonBoComponent from '../../../components/action_item/DetailNonBoComponent';

class ActionItemDetailContainer extends React.Component {
    static navigationOptions = {
      title: 'Action Item Details',
    };

    constructor(props) {
      super(props);
      this.state = {
        isInternetConnected: true
      };
    }

    async componentDidMount() {
      // this.loadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    loadData() {
      const { action_item, userData } = this.props.navigation.state.params;
      const { rep_code } = userData;
      const data = {
        rep_code,
        action_item_id: action_item.id
      };
      this.props.loadActionItemDetails(data);
    }

    submit(status, comment) {
      const data = {
        action_status_id: status,
        action_summary_code: this.props.actionItemDetail.data.id,
        action_comment: comment
      };
      if (!status || !comment) return;
      this.props.updateActionItem(data).then(() => {
        const { error } = this.props.actionItemSubmit;
        if (error) {
          alert('Error Updating Action Item');
          return;
        }
        Alert.alert(
          'Action Item Update',
          'Action Item has been updated',
          [{
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 1,
              });
              this.props.navigation.dispatch(popAction);
            }
          }],
          { cancelable: false }
        );
      });
    }

    render() {
      const { action_item, userData } = this.props.navigation.state.params;
      const { data, loading } = this.props.actionItemDetail;
      const submit = this.submit.bind(this);
      const hoverLoading = this.props.actionItemSubmit.loading;

      if (userData.user_type === Role.BO) {
        return (
          <DetailComponent
            data={data}
            hoverLoading={hoverLoading}
            loading={loading}
            action_item={action_item}
            user={userData}
            submit={submit}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        );
      }
      return (
        <DetailNonBoComponent
          data={data}
          hoverLoading={hoverLoading}
          loading={loading}
          action_item={action_item}
          user={userData}
          submit={submit}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  actionItemDetail: state.actionItemDetail,
  actionItemSubmit: state.actionItemSubmit
});

export default connect(
  mapStateToProps,
  { loadActionItemDetails, updateActionItem }
)(ActionItemDetailContainer);
