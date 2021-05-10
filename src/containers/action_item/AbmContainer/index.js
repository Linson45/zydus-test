import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadActionItems, resetSubmit } from '../../../actions';
import AbmComponent from '../../../components/action_item/AbmComponent';

class ActionItemAbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
    this.props.navigation.addListener('willFocus', () => {
      if (this.props.actionItemSubmit.data || this.props.actionItemAdd.data) {
        this.props.resetSubmit();
        this.loadData();
      }
    });
  }

  componentDidMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected }, () => {
          if (isConnected) {
            this.props.resetSubmit();
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
              if (this.props.actionItemSubmit.data || this.props.actionItemAdd.data) {
                this.props.resetSubmit();
                this.loadData();
              }
            }
          });
        });
    };

    static navigationOptions = {
      title: 'Action Items',
    };

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

    gotoAdd() {
      const userData = this.props.navigation.state.params.employees;
      this.props.navigation.navigate('ActionItemAdd', { userData });
    }

    render() {
      const { data, loading } = this.props.actionItems;
      const gotoDetails = this.gotoDetails.bind(this);
      const gotoAdd = this.gotoAdd.bind(this);

      return (
        <AbmComponent
          data={data}
          loading={loading}
          gotoDetails={gotoDetails}
          gotoAdd={gotoAdd}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  actionItems: state.actionItems,
  actionItemSubmit: state.actionItemSubmit,
  actionItemAdd: state.actionItemAdd
});

export default connect(
  mapStateToProps,
  { loadActionItems, resetSubmit }
)(ActionItemAbmContainer);
