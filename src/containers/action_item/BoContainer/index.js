import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadActionItems, resetSubmit } from '../../../actions';
import BoComponent from '../../../components/action_item/BoComponent';

class ActionItemBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
    this.props.navigation.addListener('willFocus', () => {
      if (this.props.actionItemSubmit.data) {
        this.props.resetSubmit();
        this.loadData();
      }
    });
  }

    static navigationOptions = {
      title: 'Action Items',
    };

    async componentDidMount() {
      // this.loadData();
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
      } = this.props.navigation.state.params.employees;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
      };
      this.props.loadActionItems(data);
    }

    gotoDetails(action_item) {
      const userData = this.props.navigation.state.params.employees;
      this.props.navigation.navigate('ActionItemDetail', { userData, action_item });
    }

    render() {
      const gotoDetails = this.gotoDetails.bind(this);
      const { data, loading } = this.props.actionItems;

      return (
        <BoComponent
          data={data}
          loading={loading}
          gotoDetails={gotoDetails}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  actionItems: state.actionItems,
  actionItemSubmit: state.actionItemSubmit
});

export default connect(
  mapStateToProps,
  { loadActionItems, resetSubmit }
)(ActionItemBoContainer);
