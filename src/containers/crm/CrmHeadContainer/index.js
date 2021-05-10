import React from 'react';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import {
  loadCrmDashboard, loadCrmDashboardTop50, loadCrmDivisions, loadCrmDoctorDetail, loadCrmRedFlags
} from '../../../actions';
import ParentView from '../../../components/ParentView';
import SimpleDisplay from '../../../components/SimpleDisplay';

class CrmCrmHeadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      division: null
    };
  }

    static navigationOptions = {
      title: 'Marketing Efforts (SBU)',
    };

    async componentDidMount() {
      this.loadData();
    }

    // eslint-disable-next-line no-unused-vars
    componentWillReceiveProps(nextProps, nextContext) {
      if (!this.props.crmDivision.data && nextProps.crmDivision.data) {
        this.selectDivision(nextProps.crmDivision.data[0]);
      }
    }

    loadData() {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, user_type
      } = user;
      const data = {
        user_id: rep_code,
        group_code: user_type,
      };
      this.props.loadCrmDivisions(data);
    }

    selectDivision(division) {
      this.setState({ division });
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, sbu_code, user_type
      } = user;
      const { company_code } = division;
      let data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        division_id: division.sbu_code
      };
      this.props.loadCrmDashboard(data);

      data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        selected_division: division.sbu_code
      };
      this.props.loadCrmDashboardTop50(data);
    }

    showDoctorDetail(doctor) {
      const { division } = this.state;
      const { user } = this.props.navigation.state.params;
      const { rep_code, sbu_code, user_type } = user;
      const { doc_code, bo_code } = doctor;

      const data = {
        rep_code,
        group_code: user_type,
        company_code: division.company_code,
        sbu_code,
        dr_code: doc_code,
        bo_rep_code: bo_code
      };
      this.props.loadCrmDoctorDetail(data);
    }

    showRedFlags() {
      const { division } = this.state;
      const { user } = this.props.navigation.state.params;
      const { rep_code, sbu_code, user_type } = user;
      const data = {
        rep_code,
        group_code: user_type,
        company_code: division.company_code,
        sbu_code,
        selected_division: division.sbu_code
      };
      this.props.loadCrmRedFlags(data);
    }

    goToRome() {
      const { company_code, sbu_code } = this.state.division;
      const { user } = this.props.navigation.state.params;
      user.company_code = company_code;
      user.division_code = sbu_code;
      this.props.navigation.navigate('CrmRome', { user });
    }

    goToRedFlag() {
      const { company_code, sbu_code } = this.state.division;
      const { user } = this.props.navigation.state.params;
      user.company_code = company_code;
      user.division_code = sbu_code;
      this.props.navigation.navigate('CrmRedFlag', { user });
    }

    goToCoverage() {
      const { company_code, sbu_code } = this.state.division;
      const { user } = this.props.navigation.state.params;
      user.company_code = company_code;
      user.division_code = sbu_code;
      this.props.navigation.navigate('CrmCoverage', { user });
    }

    goToPendingApproval() {
      const { company_code, sbu_code } = this.state.division;
      const { user } = this.props.navigation.state.params;
      user.company_code = company_code;
      user.division_code = sbu_code;
      this.props.navigation.navigate('CrmPendingApproval', { user });
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
      const selectDivision = this.selectDivision.bind(this);

      return (
        <ParentView loading={loading}>
          <SimpleDisplay
            data={divisions}
          />
          <SimpleDisplay
            data={dashboard_tile}
          />

          <SimpleDisplay
            data={dashboard_top50}
          />

          <SimpleDisplay
            data={crmDoctorDetail.data}
          />

          <SimpleDisplay
            data={crmRedFlags.data}
          />

          <Button onPress={() => showDoctorDetail(dashboard_top50[0])}>
            <Text>Get Doctor Details</Text>
          </Button>

          <Button onPress={() => showRedFlags()}>
            <Text>Get Red Flags</Text>
          </Button>

          <Button onPress={() => goToRome()}>
            <Text>Goto Rome</Text>
          </Button>

          <Button onPress={() => goToRedFlag()}>
            <Text>Goto Red Flag</Text>
          </Button>

          <Button onPress={() => goToCoverage()}>
            <Text>Goto Coverage</Text>
          </Button>

          <Button onPress={() => goToPendingApproval()}>
            <Text>Goto Pending Approval</Text>
          </Button>

          <Button onPress={() => selectDivision(divisions[1])}>
            <Text>Next Division</Text>
          </Button>

        </ParentView>
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
)(CrmCrmHeadContainer);
