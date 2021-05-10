import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  loadCrmDashboard, loadCrmDashboardTop50, loadCrmDivisions, loadCrmDoctorDetail, loadCrmRedFlags
} from '../../../actions';
import DivisionHeadComponent from '../../../components/crm/DivisionHeadComponent';

class CrmDivisionHeadContainer extends React.Component {
    static navigationOptions = {
      title: 'Marketing Efforts',
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
      let data = {
        user_id: rep_code,
        group_code: user_type,
      };
      this.props.loadCrmDivisions(data);

      data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        division_id: division_code
      };
      this.props.loadCrmDashboard(data);

      data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        selected_division: division_code
      };
      this.props.loadCrmDashboardTop50(data);
    }

    showDoctorDetail(doctor) {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const { doc_code, bo_code } = doctor;
      const data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        dr_code: doc_code,
        bo_rep_code: bo_code
      };
      this.props.loadCrmDoctorDetail(data);
    }

    showRedFlags() {
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
      this.props.loadCrmRedFlags(data);
    }

    goToRome() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmRome', { user });
    }

    goToRedFlag() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmRedFlag', { user });
    }

    goToCoverage() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmCoverage', { user });
    }

    goToPendingApproval() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmPendingApproval', { user });
    }

    goToAddRequest() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAddSelectDetail', { user });
    }

    render() {
      const {
        crmDivision, crmDashboard, crmDashboardTop50, crmDoctorDetail, crmRedFlags
      } = this.props;
      const loading = crmDivision.loading || crmDashboard.loading || crmDashboardTop50.loading;

      const divisions = crmDivision.data;
      const dashboard_tile = crmDashboard.data;
      const dashboard_top50 = crmDashboardTop50.data;

      const showDoctorDetail = this.showDoctorDetail.bind(this);
      const goToRome = this.goToRome.bind(this);
      const goToRedFlag = this.goToRedFlag.bind(this);
      const goToCoverage = this.goToCoverage.bind(this);
      const goToPendingApproval = this.goToPendingApproval.bind(this);
      const showRedFlags = this.showRedFlags.bind(this);
      const goToAddRequest = this.goToAddRequest.bind(this);

      return (
        <DivisionHeadComponent
          loading={loading}
          divisions={divisions}
          dashboard_tile={dashboard_tile}
          dashboard_top50={dashboard_top50}
          showDoctorDetail={showDoctorDetail}
          crmDoctorDetail={crmDoctorDetail}
          crmRedFlags={crmRedFlags}
          goToRome={goToRome}
          goToRedFlag={goToRedFlag}
          goToCoverage={goToCoverage}
          goToPendingApproval={goToPendingApproval}
          showRedFlags={showRedFlags}
          goToAddRequest={goToAddRequest}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmDivision: state.crmDivision,
  crmDashboard: state.crmDashboard,
  crmDashboardTop50: state.crmDashboardTop50,
  crmDoctorDetail: state.crmDoctorDetail,
  crmRedFlags: state.crmRedFlags
});

export default connect(
  mapStateToProps,
  {
    loadCrmDashboard, loadCrmDashboardTop50, loadCrmDivisions, loadCrmDoctorDetail, loadCrmRedFlags
  }
)(CrmDivisionHeadContainer);
