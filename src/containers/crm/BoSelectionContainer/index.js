import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmBoList, crmSelectBo } from '../../../actions';
import BoSelectionComponent from '../../../components/crm/BoSelectionComponent';

class CrmBoSelectionContainer extends React.Component {
    static navigationOptions = {
      title: 'Add BO',
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
      const { user, abm } = this.props.navigation.state.params;
      const {
        company_code, sbu_code, user_type, division_code
      } = user;
      const { rep_code } = abm;
      const data = {
        company_code,
        user_type,
        rep_code,
        group_code: user_type,
        sbu_code,
        date: moment().format('DD-MMM-YYYY'),
        division_id: division_code
      };
      this.props.loadCrmBoList(data);
    }

    select(bo) {
      this.props.crmSelectBo(bo);
      this.props.navigation.goBack();
    }

    render() {
      const { data, loading } = this.props.crmBo;
      const select = this.select.bind(this);

      return (
        <BoSelectionComponent
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
  crmBo: state.crmBo,
});

export default connect(
  mapStateToProps,
  { loadCrmBoList, crmSelectBo }
)(CrmBoSelectionContainer);
