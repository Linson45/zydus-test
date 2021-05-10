import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmRbmHeader, loadCrmRbmDoctorEfforts, loadCrmDoctorDetail } from '../../../actions';
import RbmComponent from '../../../components/crm/RbmComponent';
import { numberTransformer } from '../../../util/NumberTrasformer';

class CrmRbmContainer extends React.Component {
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
    }

    loadData() {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type, division_code
      } = user;
      let data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        division_id: division_code
      };
      this.props.loadCrmRbmHeader(data);

      data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        selected_division: division_code
      };
      this.props.loadCrmRbmDoctorEfforts(data);
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

    goToPendingRequest() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmRbmPendingRequest', { user });
    }

    goToAddRequest() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAddSelectDetail', { user });
    }

    getHeaderInfo() {
      const { crmRbmDoctorEffort } = this.props;
      const doctorEffort = crmRbmDoctorEffort.data;
      let marketingEfforts = 0;
      let docCoverage = 0;
      let rome = 0;

      if (doctorEffort) {
        doctorEffort.forEach((hq) => {
          let regionRome = 0;
          hq.doctors.forEach((doctor) => {
            marketingEfforts += +doctor.marketing_efforts;
            docCoverage += 1;
            regionRome += +doctor.rome;
          });
          rome += regionRome / hq.doctors.length;
        });
      }
      rome = rome.toFixed(1);
      return {
        marketing_efforts: numberTransformer(marketingEfforts),
        doc_coverage: docCoverage,
        rome
      };
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const { crmRbmHeader, crmRbmDoctorEffort, crmDoctorDetail } = this.props;
      const loading = crmRbmHeader.loading || crmRbmDoctorEffort.loading;
      const header = crmRbmHeader.data;
      const doctorEffort = crmRbmDoctorEffort.data;
      const showDoctorDetail = this.showDoctorDetail.bind(this);
      const goToPendingRequest = this.goToPendingRequest.bind(this);
      const goToAddRequest = this.goToAddRequest.bind(this);
      const getHeaderInfo = this.getHeaderInfo.bind(this);

      return (
        <RbmComponent
          user={user}
          loading={loading}
          header={header}
          doctorEffort={doctorEffort}
          getHeaderInfo={getHeaderInfo}
          showDoctorDetail={showDoctorDetail}
          goToPendingRequest={goToPendingRequest}
          goToAddRequest={goToAddRequest}
          crmDoctorDetail={crmDoctorDetail}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmRbmHeader: state.crmRbmHeader,
  crmRbmDoctorEffort: state.crmRbmDoctorEffort,
  crmDoctorDetail: state.crmDoctorDetail
});

export default connect(
  mapStateToProps,
  { loadCrmRbmHeader, loadCrmRbmDoctorEfforts, loadCrmDoctorDetail }
)(CrmRbmContainer);
