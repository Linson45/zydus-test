import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmPendingApproval } from '../../../actions';
import PendingApprovalComponent from '../../../components/crm/PendingApprovalComponent';

class CrmPendingApprovalContainer extends React.Component {
    static navigationOptions = {
      title: 'Pending Approval',
    };

    constructor(props) {
      super(props);
      this.state = {
        isInternetConnected: true
      };
    }

    async componentDidMount() {
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
    };

    loadData() {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type, division_code
      } = user;
      const data = {
        company_code,
        rep_code,
        group_code: user_type,
        sbu_code,
        selected_division: division_code
      };
      this.props.loadCrmPendingApproval(data);
    }

    goToReview(doctor) {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmReviewApplication', { user, doctor });
    }

    render() {
      const { loading, data } = this.props.crmPendingApproval;
      const goToReview = this.goToReview.bind(this);

      return (
        <PendingApprovalComponent
          loading={loading}
          doctors={data}
          goToReview={goToReview}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmPendingApproval: state.crmPendingApproval,
});

export default connect(
  mapStateToProps,
  { loadCrmPendingApproval }
)(CrmPendingApprovalContainer);
