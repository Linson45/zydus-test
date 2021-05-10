import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCoachmapBo } from '../../../actions';
import { Role } from '../../../util/Constants';
import BoComponent from '../../../components/coachmap/BoComponent';

class CoachMapBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'View Coachmap',
    };

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
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        status: 'Y',
        desig_group_code: Role.BO
      };
      this.props.loadCoachmapBo(data);
    }

    gotoSummary() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CoachMapSummary', { user });
    }

    gotoDetails(file) {
      const { user } = this.props.navigation.state.params;
      const { filed_date, filed_by_rep_code } = file;
      this.props.navigation.navigate('CoachMapDetail', {
        user, filed_date, filed_by_rep_code, file
      });
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const gotoDetails = this.gotoDetails.bind(this);
      const gotoSummary = this.gotoSummary.bind(this);
      const { loading, data } = this.props.coachmapBo;

      return (
        <BoComponent
          gotoDetails={gotoDetails}
          gotoSummary={gotoSummary}
          loading={loading}
          data={data}
          user={user}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  coachmapBo: state.coachmapBo,
});

export default connect(
  mapStateToProps,
  { loadCoachmapBo }
)(CoachMapBoContainer);
