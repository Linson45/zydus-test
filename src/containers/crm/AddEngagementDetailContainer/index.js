import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmEngagementMaster, crmUpdateEngagementDetail } from '../../../actions';
import AddEngagementDetailComponent from '../../../components/crm/AddEngagementDetailComponent';

class CrmAddEngagementDetailContainer extends React.Component {
    static navigationOptions = {
      title: 'Engagement Detail',
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
      const data = {
        company_code,
        rep_code,
        group_code: user_type,
        sbu_code,
      };
      this.props.loadCrmEngagementMaster(data);
    }

    updateActivityName(activity_name) {
      this.props.crmUpdateEngagementDetail({
        activity_name
      });
    }

    updateRecommendedBy(recommended_by) {
      this.props.crmUpdateEngagementDetail({
        recommended_by
      });
    }

    next() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAddReview', { user });
    }

    render() {
      const updateRecommendedBy = this.updateRecommendedBy.bind(this);
      const updateActivityName = this.updateActivityName.bind(this);
      const { data, loading } = this.props.crmEngagementMaster;
      const { engagement_details } = this.props.crmAddData;
      const next = this.next.bind(this);
      console.log(data, engagement_details);

      return (
        <AddEngagementDetailComponent
          engagementMaster={data}
          loading={loading}
          engagement_detail={engagement_details}
          updateActivityName={updateActivityName}
          updateRecommendedBy={updateRecommendedBy}
          next={next}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmAddData: state.crmAddData,
  crmEngagementMaster: state.crmEngagementMaster
});

export default connect(
  mapStateToProps,
  { loadCrmEngagementMaster, crmUpdateEngagementDetail }
)(CrmAddEngagementDetailContainer);
