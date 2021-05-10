import React, { Component } from 'react';
import {
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'native-base';
import StarRating from 'react-native-star-rating';
import RadioForm from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';
import Colors from '../../../styles/colorsStyles';
import styles from './styles';

export default class SurveyModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.config,
      currentQuestion: 0,
      answers: {},
    };
  }

  renderHeader() {
    const { onClose } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Icon style={styles.headingIcon} name="file" type="FontAwesome" />
          <Text style={styles.headerHeading}>Survey</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => (onClose ? onClose() : null)} style={styles.iconButtonStyle}>
            <Icon
              name="times-circle-o"
              type="FontAwesome"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

    renderQuestion = () => {
      const { data, currentQuestion } = this.state;
      const { questions } = data;
      const questionJson = questions[currentQuestion];
      const { question } = questionJson;

      return (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          {this.renderOptions()}
        </View>
      );
    };

    renderOptions() {
      const { data, currentQuestion, answers } = this.state;
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
              onChangeText={(text) => this.setAnswer(text)}
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
            selectedStar={(rating) => this.setAnswer(rating)}
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
            labelStyle={styles.radioLabel}
            buttonColor={Colors.contentBlue}
            animation={false}
            radio_props={radioOptions}
            initial={initial}
            onPress={(value) => {
              this.setAnswer(value);
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
                this.setAnswer(selectedAnswers.join(','));
              }}
              isChecked={selectedAnswers.indexOf(option_id) !== -1}
              rightText={option}
            />
          );
        });
      }
      return null;
    }

    setAnswer = (answer) => {
      const { currentQuestion } = this.state;
      let { answers } = this.state;
      answers = { ...answers };
      answers[currentQuestion] = answer;
      this.setState({ answers });
    };

    renderBottom() {
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={this.onSubmitAction}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={this.onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }

    onSubmitAction = async () => {
      const { onSubmit } = this.props;
      const { data, answers } = this.state;
      const { survey_id, questions } = data;
      const body = {
        survey_id,
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

    onNext = async () => {
      const { currentQuestion, data } = this.state;
      if (currentQuestion >= data.questions.length - 1) {
        return;
      }
      await this.setState({
        currentQuestion: currentQuestion + 1,
      });
    };

    render() {
      const { isVisible } = this.props;

      return (

        <Modal isVisible={isVisible}>
          <View style={styles.container}>
            <View style={{ ...styles.content }}>
              {this.renderHeader()}
              {this.renderQuestion()}
              {this.renderBottom()}
            </View>
          </View>
        </Modal>
      );
    }
}
