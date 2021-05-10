import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmAbmList, crmSelectAbm } from '../../../actions';
import AbmSelectionComponent from '../../../components/crm/AbmSelectionComponent';

class CrmAbmSelectionContainer extends React.Component {
    static navigationOptions = {
      title: 'Add ABM',
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
      const data = {
        company_code,
        user_type,
        rep_code,
        group_code: user_type,
        sbu_code,
        date: moment().format('DD-MMM-YYYY'),
        division_id: division_code
      };
      this.props.loadCrmAbmList(data);
    }

    select(abm) {
      this.props.crmSelectAbm(abm);
      this.props.navigation.goBack();
    }

    render() {
      const { data, loading } = this.props.crmAbm;
      const select = this.select.bind(this);

      return (
        <AbmSelectionComponent
          data={data}
          loading={loading}
          select={select}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmAbm: state.crmAbm,
});

export default connect(
  mapStateToProps,
  { loadCrmAbmList, crmSelectAbm }
)(CrmAbmSelectionContainer);
