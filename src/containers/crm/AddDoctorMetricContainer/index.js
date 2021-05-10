import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmDocMetric, crmUpdateParam } from '../../../actions';
import AddDoctorMetricComponent from '../../../components/crm/AddDoctorMetricComponent';

class CrmAddDoctorMetricContainer extends React.Component {
    static navigationOptions = {
      title: 'Doctor Metrics',
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
        rep_code, company_code, sbu_code, user_type
      } = user;
      const { abm, bo, doctor } = this.props.crmAddData;
      const data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        bo_rep_code: bo.rep_code,
        dr_code: doctor.doc_code,
        rep_code_abm: abm.rep_code,
        rep_code_rbm: ''
      };
      this.props.loadCrmDocMetric(data);
    }

    updateProposedExpense(text) {
      this.props.crmUpdateParam({ proposed_exp: text });
    }

    updateExpectedExpense(text) {
      this.props.crmUpdateParam({ expected_supp: text });
    }

    next() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAddQuestions', { user });
    }

    render() {
      const {
        doc_matrics, loading, proposed_exp, expected_supp
      } = this.props.crmAddData;
      const updateProposedExpense = this.updateProposedExpense.bind(this);
      const next = this.next.bind(this);
      const updateExpectedExpense = this.updateExpectedExpense.bind(this);

      return (
        <AddDoctorMetricComponent
          doc_matrics={doc_matrics}
          loading={loading}
          proposed_exp={proposed_exp}
          expected_supp={expected_supp}
          updateProposedExpense={updateProposedExpense}
          updateExpectedExpense={updateExpectedExpense}
          next={next}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmAddData: state.crmAddData,
});

export default connect(
  mapStateToProps,
  { loadCrmDocMetric, crmUpdateParam }
)(CrmAddDoctorMetricContainer);
