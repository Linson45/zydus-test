import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmDoctorList, crmSelectDoctor, loadCrmBoDocPastEngagement } from '../../../actions';
import DoctorSelectionComponent from '../../../components/crm/DoctorSelectionComponent';

class CrmDoctorSelectionContainer extends React.Component {
    static navigationOptions = {
      title: 'Add Doctor',
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
      const { bo } = this.props.navigation.state.params;
      const {
        company_code, sbu_code, user_type, rep_code
      } = bo;
      const data = {
        company_code,
        sbu_code,
        rep_code,
        group_code: user_type
      };
      this.props.loadCrmDoctorList(data);
    }

    select(doctor) {
      const { bo, user, abm } = this.props.navigation.state.params;
      const { company_code, sbu_code, rep_code } = bo;
      const data = {
        group_code: user.user_type,
        company_code,
        sbu_code,
        rep_code: user.rep_code,
        bo_rep_code: rep_code,
        dr_code: doctor.doc_code,
        rep_code_abm: abm.rep_code,
        rep_code_rbm: ''
      };
      this.props.crmSelectDoctor(doctor);
      this.props.loadCrmBoDocPastEngagement(data);
      this.props.navigation.goBack();
    }

    render() {
      const { data, loading } = this.props.crmDoctor;
      const select = this.select.bind(this);

      return (
        <DoctorSelectionComponent
          loading={loading}
          data={data}
          select={select}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmDoctor: state.crmDoctor,
});

export default connect(
  mapStateToProps,
  { loadCrmDoctorList, crmSelectDoctor, loadCrmBoDocPastEngagement }
)(CrmDoctorSelectionContainer);
