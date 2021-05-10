import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmHeader, loadCrmDoctorEfforts, loadCrmDoctorDetail } from '../../../actions';
import RomeComponent from '../../../components/crm/RomeComponent';
import { numberTransformer } from '../../../util/NumberTrasformer';

class CrmRomeContainer extends React.Component {
    static navigationOptions = {
      title: 'ROME',
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
        company_code,
        rep_code,
        group_code: user_type,
        sbu_code,
        division_id: division_code
      };
      this.props.loadCrmHeader(data);

      data = {
        company_code,
        rep_code,
        group_code: user_type,
        sbu_code,
        selected_division: division_code,
        type: 'ROME'
      };
      this.props.loadCrmDoctorEfforts(data);
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

    getHeaderInfo() {
      const { crmDoctorEffort } = this.props;
      const doctorEffort = crmDoctorEffort.data;
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
      const { crmHeader, crmDoctorEffort, crmDoctorDetail } = this.props;
      const loading = crmHeader.loading || crmDoctorEffort.loading;
      const header = crmHeader.data;
      const doctors = crmDoctorEffort.data;
      const showDoctorDetail = this.showDoctorDetail.bind(this);
      const getHeaderInfo = this.getHeaderInfo.bind(this);

      return (
        <RomeComponent
          loading={loading}
          header={header}
          doctors={doctors}
          showDoctorDetail={showDoctorDetail}
          crmDoctorDetail={crmDoctorDetail}
          getHeaderInfo={getHeaderInfo}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmHeader: state.crmHeader,
  crmDoctorEffort: state.crmDoctorEffort,
  crmDoctorDetail: state.crmDoctorDetail
});

export default connect(
  mapStateToProps,
  { loadCrmHeader, loadCrmDoctorEfforts, loadCrmDoctorDetail }
)(CrmRomeContainer);
