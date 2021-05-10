import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCrmQuestions, crmUpdateActionPlan, crmUpdateAnswer } from '../../../actions';
import AddQuestionComponent from '../../../components/crm/AddQuestionComponent';

class CrmAddQuestionsContainer extends React.Component {
    static navigationOptions = {
      title: 'Reason of Engagement',
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
      const {
        abm_visit_que, bo_visit_que, gsp_que, rbm_visit_que, rcpa_que
      } = this.props.crmAddData.doc_matrics;
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const data = {
        rep_code,
        group_code: user_type,
        company_code,
        sbu_code,
        abm_visit_que,
        bo_visit_que,
        gsp_que,
        rbm_visit_que,
        rcpa_que
      };
      this.props.loadCrmQuestions(data);
    }

    updateAnswer(id, type, answer) {
      this.props.crmUpdateAnswer(id, type, answer);
    }

    updateActionPlan(answer) {
      this.props.crmUpdateActionPlan(answer);
    }

    next() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAddEngagementDetail', { user });
    }

    render() {
      const { questions, loading, action_plan } = this.props.crmAddData;
      const updateAnswer = this.updateAnswer.bind(this);
      const updateActionPlan = this.updateActionPlan.bind(this);
      const next = this.next.bind(this);

      return (
        <AddQuestionComponent
          loading={loading}
          questions={questions}
          action_plan={action_plan}
          updateAnswer={updateAnswer}
          updateActionPlan={updateActionPlan}
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
  { loadCrmQuestions, crmUpdateActionPlan, crmUpdateAnswer }
)(CrmAddQuestionsContainer);
