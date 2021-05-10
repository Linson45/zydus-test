import React from 'react';
import { connect } from 'react-redux';
import { loadCrmRbmPendingApprovalList, loadCrmRbmPendingActionList } from '../../../actions';
import ParentView from '../../../components/ParentView';
import RbmPendingRequestComponent from '../../../components/crm/RbmPendingRequestComponent';

class CrmRbmPendingRequestContainer extends React.Component {
    static navigationOptions = {
      title: 'Pending Requests',
    };

    async componentDidMount() {
      this.loadData();
    }

    loadData() {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type, division_code
      } = user;
      const data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        selected_division: division_code
      };
      this.props.loadCrmRbmPendingApprovalList(data);
      this.props.loadCrmRbmPendingActionList(data);
    }

    render() {
      const { crmRbmPendingApproval, crmRbmPendingAction } = this.props;
      const loading = crmRbmPendingApproval.loading || crmRbmPendingAction.loading;
      const pendingApproval = crmRbmPendingApproval.data;
      const pendingAction = crmRbmPendingAction.data;

      return (
        <ParentView loading={loading}>
          <RbmPendingRequestComponent
            loading={loading}
            pendingApproval={pendingApproval}
            pendingAction={pendingAction}
          />
        </ParentView>
      );
    }
}

const mapStateToProps = (state) => ({
  crmRbmPendingApproval: state.crmRbmPendingApproval,
  crmRbmPendingAction: state.crmRbmPendingAction,
});

export default connect(
  mapStateToProps,
  { loadCrmRbmPendingApprovalList, loadCrmRbmPendingActionList }
)(CrmRbmPendingRequestContainer);
