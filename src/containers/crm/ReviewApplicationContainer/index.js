import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmReviewApplication } from '../../../actions';
import ReviewApplicationComponent from '../../../components/crm/ReviewApplicationComponent';

class CrmReviewApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Review Application',
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
    };

    setComment(comment) {
      this.setState({ comment });
    }

    loadData() {
      const { user, doctor } = this.props.navigation.state.params;
      const { doctor_metric_id, doc_code } = doctor;
      const {
        rep_code, company_code, sbu_code, user_type, division_code
      } = user;
      const data = {
        company_code,
        rep_code,
        group_code: user_type,
        sbu_code,
        division_id: division_code,
        dr_code: doc_code,
        doctor_matric_id: doctor_metric_id
      };
      this.props.loadCrmReviewApplication(data);
    }

    render() {
      const { comment } = this.state;
      const { data, loading } = this.props.crmReviewApplication;
      const setComment = this.setComment.bind(this);

      return (
        <ReviewApplicationComponent
          data={data}
          loading={loading}
          comment={comment}
          setComment={setComment}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmReviewApplication: state.crmReviewApplication,
});

export default connect(
  mapStateToProps,
  { loadCrmReviewApplication }
)(CrmReviewApplicationContainer);
