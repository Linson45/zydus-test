import React from 'react';
import {
  Text, Card, Input, Label, Item
} from 'native-base';
import {
  ScrollView, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';

export default class AddQuestionComponent extends React.Component {
  renderQuestions() {
    const { questions } = this.props;
    if (questions) {
      return questions.map((question, index) => this.renderQuestion(question, index));
    }
    return [];
  }

  renderQuestion(question, index) {
    const { updateAnswer } = this.props;
    return (
      <View style={styles.question} key={index}>
        <Text style={styles.title}>{question.red_flag}</Text>

        <Card>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>{question.reason}</Label>
            <Input
              onChangeText={(text) => updateAnswer(question.flag_id, 'reason', text)}
              style={styles.textInput}
              value={question.reason_answer}
            />
          </Item>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>{question.action}</Label>
            <Input
              onChangeText={(text) => updateAnswer(question.flag_id, 'action', text)}
              style={styles.textInput}
              value={question.action_answer}
            />
          </Item>
        </Card>
      </View>
    );
  }

  renderActionPlan() {
    const { updateActionPlan, action_plan } = this.props;
    return (
      <View style={styles.question}>
        <Text style={styles.title}>Action Plan</Text>

        <Card>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Action Plan</Label>
            <Input
              onChangeText={(text) => updateActionPlan(text)}
              style={styles.textInput}
              value={action_plan}
            />
          </Item>
        </Card>
      </View>
    );
  }

  renderFooter() {
    const { next } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={() => next()}>
        <Text style={styles.bottomButtonText}>Save & Next</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          {this.renderQuestions()}
          {this.renderActionPlan()}
          {this.renderFooter()}
        </ScrollView>
      </ParentView>
    );
  }
}
