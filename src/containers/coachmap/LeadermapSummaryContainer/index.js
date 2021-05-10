import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCoachmapSummary } from '../../../actions';
import LeadermapSummaryComponent from '../../../components/coachmap/LeadermapSummaryComponent';

class CoachMapLeadermapSummaryContainer extends React.Component {
    static navigationOptions = {
      title: 'Leadermap Summary',
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
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const data = {
        rep_code,
        company_code,
        sbu_code
      };
      this.props.loadCoachmapSummary(data, user_type);
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const { loading, data } = this.props.coachmapSummary;
      console.log('DATA : ', data);

      return (
        <LeadermapSummaryComponent
          data={data}
          loading={loading}
          user={user}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  coachmapSummary: state.coachmapSummary,
});

export default connect(
  mapStateToProps,
  { loadCoachmapSummary }
)(CoachMapLeadermapSummaryContainer);
