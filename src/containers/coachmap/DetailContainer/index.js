import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCoachmapDetails } from '../../../actions';
import DetailComponent from '../../../components/coachmap/DetailComponent';
import Adapter from '../../../util/Adapter';

class CoachMapDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Coachmap',
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
      const user = await Adapter.getUser();
      this.setState({ me: user });
    }

    onRefresh = async () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
      const user = await Adapter.getUser();
      this.setState({ me: user });
    }

    loadData() {
      const { user, filed_date, filed_by_rep_code } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        entire_month: '1'
      };
      this.props.loadCoachmapDetails(data, user_type, filed_date, filed_by_rep_code);
    }

    render() {
      const { file } = this.props.navigation.state.params;
      const { loading, data } = this.props.coachmapDetail;
      const { me } = this.state;

      return (
        <DetailComponent
          loading={loading}
          data={data}
          file={file}
          me={me}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  coachmapDetail: state.coachmapDetail,
});

export default connect(
  mapStateToProps,
  { loadCoachmapDetails }
)(CoachMapDetailContainer);
