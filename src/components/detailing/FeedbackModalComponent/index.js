import React, { Component } from 'react';
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import RadioForm from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import Colors from '../../../styles/colorsStyles';
import styles from './styles';

export default class FeedbackModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.config,
      answers: {},
    };
  }

    renderQuestions = () => {
      const { data } = this.state;
      const { questions } = data;
      return questions.map((question, index) => this.renderQuestion(index));
    };

    renderQuestion = (currentQuestion) => {
      const { data } = this.state;
      const { questions } = data;
      const questionJson = questions[currentQuestion];
      const { question } = questionJson;

      return (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          {this.renderOptions(currentQuestion)}
        </View>
      );
    };

    renderOptions(currentQuestion) {
      const { data, answers } = this.state;
      const { questions } = data;
      const questionJson = questions[currentQuestion];
      const { type, options } = questionJson;
      let answer = answers[currentQuestion];
      if (!answer && answer !== 0 && answer !== '0') {
        answer = '';
      }

      if (type === 'subjective') {
        return (
          <View style={styles.optionsContainer}>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.subjective}
              value={answer}
              onChangeText={(text) => this.setAnswer(currentQuestion, text)}
            />
          </View>
        );
      }

      if (type === 'star') {
        if (!answer) {
          answer = 0;
        }
        return (
          <StarRating
            containerStyle={styles.star}
            maxStars={5}
            rating={answer}
            selectedStar={(rating) => this.setAnswer(currentQuestion, rating)}
            fullStarColor={Colors.starColor}
            starSize={30}
          />
        );
      }

      if (type === 'single-choice') {
        const radioOptions = options.map((option) => ({ label: option.option, value: +option.option_id }));
        let initial = null;
        radioOptions.forEach((option, index) => {
          if (option.value === answer) {
            initial = index;
          }
        });
        return (
          <RadioForm
            style={styles.radioGroup}
            formHorizontal
            labelStyle={styles.radioLabel}
            buttonColor={Colors.contentBlue}
            animation={false}
            radio_props={radioOptions}
            initial={initial}
            onPress={(value) => {
              this.setAnswer(currentQuestion, value);
            }}
          />
        );
      }

      if (type === 'multiple-choice') {
        return options.map((optionJson) => {
          const { option_id, option } = optionJson;
          const selectedAnswers = answer.split(',');
          return (
            <CheckBox
              key={option_id}
              style={{ padding: 10 }}
              rightTextStyle={{ color: '#000' }}
              onClick={() => {
                const isChecked = selectedAnswers.indexOf(option_id) === -1;
                if (isChecked) {
                  selectedAnswers.push(option_id);
                } else {
                  selectedAnswers.splice(selectedAnswers.indexOf(option_id), 1);
                }
                this.setAnswer(currentQuestion, selectedAnswers.join(','));
              }}
              isChecked={selectedAnswers.indexOf(option_id) !== -1}
              rightText={option}
            />
          );
        });
      }
      return null;
    }

    setAnswer = (currentQuestion, answer) => {
      let { answers } = this.state;
      answers = { ...answers };
      answers[currentQuestion] = answer;
      this.setState({ answers });
    };

    renderBottom() {
      const { onClose } = this.props;
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={onClose}>
            <Text style={styles.submitButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              this.onSubmitAction();
            }}
          >
            <Text style={styles.nextButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }

    onSubmitAction = () => {
      const { onSubmit } = this.props;
      const { data, answers } = this.state;
      const { survey_id, questions } = data;
      const body = {
        feedback_id: survey_id,
        response: questions.map((question, index) => {
          const { question_id } = question;
          let answer = answers[index];
          if (!answer) {
            answer = '';
          }
          answer = answer.toString();
          const answerList = answer.split(',');
          const answerValues = [];
          answerList.forEach((a) => {
            if (a) {
              answerValues.push(a);
            }
          });
          return {
            question_id,
            answers: answerValues,
          };
        })
      };
      if (onSubmit) {
        onSubmit(body);
      }
    };

    render() {
      const { isVisible } = this.props;

      return (

        <Modal isVisible={isVisible} backdropColor="#0D0D23" backdropOpacity={1}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={{ ...styles.content }}>
              {this.renderQuestions()}
              {this.renderBottom()}
            </View>
          </ScrollView>
        </Modal>
      );
    }
}
