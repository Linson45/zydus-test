import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Button, Card, CardItem, Icon, Right
} from 'native-base';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import { getCurrentMonth, getCurrentYear, getMonthString } from '../../../util/dateTimeUtil';

export default class AddCoachmapConfirmationComponent extends React.Component {
  renderHeader() {
    const { group_code, rep_code, uname } = this.props.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>
              {group_code}
              {' '}
              (
              {rep_code}
              )
            </Text>
            <Text style={styles.leftUserName}>{uname}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.date}>
              {getMonthString(getCurrentMonth())}
              {' '}
              {getCurrentYear()}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderCollapse() {
    const { data } = this.props;
    if (data && Array.isArray(data)) {
      return data.map(({ questions, skill_map_group_id, skill_map_group_title }) => (
        <Collapse key={skill_map_group_id}>
          <CollapseHeader>
            <Card>
              <CardItem style={styles.collapseHeader}>
                <View>
                  <Text>{skill_map_group_title}</Text>
                </View>

                <Right>
                  <Icon name="down" type="AntDesign" />
                </Right>
              </CardItem>
            </Card>
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <ScrollView>
              {Array.isArray(questions) ? questions.map(({ options, skill_map_title, answer }, index) => {
                let skill_map_rating_score = null; let
                  skill_map_rating_title = null;
                options.forEach((option) => {
                  if (option.skill_map_rating_id === answer) {
                    skill_map_rating_score = option.skill_map_rating_score;
                    skill_map_rating_title = option.skill_map_rating_title;
                  }
                });
                return (
                  <Card key={index}>
                    <Text style={styles.question}>
                      {skill_map_title}
                    </Text>
                    <Text
                      style={styles.answer}
                    >
                      {skill_map_rating_score}
                      {' '}
                      -
                      {skill_map_rating_title}
                    </Text>
                  </Card>
                );
              }) : null}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  renderButton() {
    const { submit } = this.props;
    return (
      <View style={{ alignItems: 'center' }}>
        <Button style={styles.button} onPress={() => submit()}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { loading, hoverLoading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
      >
        {this.renderHeader()}
        <View style={styles.collapseParent}>
          {this.renderCollapse()}
        </View>
        {this.renderButton()}
      </ParentView>
    );
  }
}
