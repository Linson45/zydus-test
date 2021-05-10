import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Adapter from '../../../util/Adapter';
import AddCoachmapConfirmationComponent from '../../../components/coachmap/AddCoachmapConfirmationComponent';
import { submitCoachmap } from '../../../actions';

class AddCoachmapConfirmationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      isInternetConnected: true,
    };
  }

  async componentDidMount() {
    const me = await Adapter.getUser();
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.setState({ me });
        }
      });
    });
  }

  onRefresh = async () => {
    const me = await Adapter.getUser();
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.setState({ me });
        }
      });
    });
  };

  static navigationOptions = {
    title: 'Coachmap',
  };

  submit() {
    const { me } = this.state;
    const { user, questions } = this.props.navigation.state.params;
    const skill_map_data = questions.map((title) => {
      const { skill_map_group_id, questions } = title;
      const skill_map_rating_filed = questions.map((question) => {
        const { skill_map_id, answer, options } = question;
        let skill_map_rating_score = null;
        let skill_map_rating_title = null;
        options.forEach((option) => {
          // eslint-disable-next-line eqeqeq
          if (option.skill_map_rating_id == answer) {
            skill_map_rating_score = option.skill_map_rating_score;
            skill_map_rating_title = option.skill_map_rating_title;
          }
        });
        return {
          skill_map_id,
          skill_map_rating_id: answer,
          skill_map_comments: '',
          rating_text: skill_map_rating_title,
          skill_map_rating_score,
        };
      });
      return {
        skill_map_group_id,
        skill_map_rating_filed,
      };
    });

    const body = {
      skill_map_type_id: '1',
      filedByUserId: me.rep_code,
      RepCode: user.rep_code,
      Status: 'Y',
      CompanyCode: user.company_code,
      SbuCode: user.sbu_code,
      EntryDateTime: new moment().format('YYYY-MM-DD hh:mm:ss'),
      skill_map_data,
    };

    this.props.submitCoachmap(body).then((data) => {
      console.log(data);
      Alert.alert(
        'Coachmap Submitted',
        'Coachmap has been saved',
        [
          {
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 2,
              });
              this.props.navigation.state.params.onGoBack();
              this.props.navigation.dispatch(popAction);
            },
          },
        ],
        { cancelable: false },
      );
    });
  }

  render() {
    const { user, questions } = this.props.navigation.state.params;
    const submit = this.submit.bind(this);
    const hoverLoading = this.props.postCoachmap.loading;

    return (
      <AddCoachmapConfirmationComponent
        hoverLoading={hoverLoading}
        user={user}
        data={questions}
        submit={submit}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  postCoachmap: state.postCoachmap,
});

export default connect(
  mapStateToProps,
  { submitCoachmap },
)(AddCoachmapConfirmationContainer);
