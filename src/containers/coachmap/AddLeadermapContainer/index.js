import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { getCoachMapQuestions } from '../../../local-storage/helper/coachmap';
import AddLeadermapComponent from '../../../components/coachmap/AddLeadermapComponent';

class AddLeadermapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      titleIndex: 0,
      questionIndex: 0,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Add Leadermap'
    };

    async componentDidMount() {
      const { user } = this.props.navigation.state.params;
      const questions = await getCoachMapQuestions(user.group_code);
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.setState({ questions });
            }
          });
        });
    }

    onRefresh = async () => {
      const { user } = this.props.navigation.state.params;
      const questions = await getCoachMapQuestions(user.group_code);
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.setState({ questions });
            }
          });
        });
    }

    onNext() {
      const { questions, titleIndex, questionIndex } = this.state;
      if (!questions[titleIndex].questions[questionIndex].answer) {
        return;
      }

      const newQuestionIndex = questionIndex + 1;
      if (newQuestionIndex === questions[titleIndex].questions.length) {
        const nextTitleIndex = titleIndex + 1;
        if (nextTitleIndex === questions.length) {
          const { user } = this.props.navigation.state.params;
          const { questions } = this.state;
          this.props.navigation.navigate('AddLeadermapConfirmation', { user, questions });
          return;
        }
        this.setState({ questionIndex: 0, titleIndex: nextTitleIndex });
      } else {
        this.setState({ questionIndex: newQuestionIndex });
      }
    }

    onPrevious() {
      const { questions, titleIndex, questionIndex } = this.state;
      const newQuestionIndex = questionIndex - 1;
      if (newQuestionIndex === -1) {
        const nextTitleIndex = titleIndex - 1;
        if (nextTitleIndex === -1) {
          alert('NO MORE QUESTIONS');
          return;
        }
        this.setState({ questionIndex: questions[nextTitleIndex].questions.length - 1, titleIndex: nextTitleIndex });
      } else {
        this.setState({ questionIndex: newQuestionIndex });
      }
    }

    selectAnswer(answer) {
      const { questions, titleIndex, questionIndex } = this.state;
      const question = questions[titleIndex].questions[questionIndex];
      question.answer = answer;
      questions[titleIndex].questions[questionIndex] = question;
      this.setState({ questions });
      this.onNext();
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const { questions, titleIndex, questionIndex } = this.state;
      const onNext = this.onNext.bind(this);
      const onPrevious = this.onPrevious.bind(this);
      const selectAnswer = this.selectAnswer.bind(this);

      return (
        <AddLeadermapComponent
          user={user}
          questions={questions}
          titleIndex={titleIndex}
          questionIndex={questionIndex}
          onNext={onNext}
          onPrevious={onPrevious}
          selectAnswer={selectAnswer}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {}
)(AddLeadermapContainer);
