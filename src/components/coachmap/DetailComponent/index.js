import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Card, CardItem, Icon, Right
} from 'native-base';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import moment from 'moment';
import ParentView from '../../ParentView';
import styles from './styles';
import { Role } from '../../../util/Constants';

export default class DetailComponent extends React.Component {
  renderHeader() {
    const { me, file } = this.props;
    const {
      filed_by_user_type, filed_by_rep_code, filed_by_rep_name, filed_date, filed_for_rep_name, filed_for_user_type,
      filed_for_rep_code
    } = file;

    if (me && me.user_type !== Role.BO) {
      return (
        <View style={styles.headerContainer}>
          <View style={styles.bannerImage}>
            <View style={styles.headerLeft}>
              <Text style={styles.leftUserType}>
                {filed_for_user_type}
                {' '}
                (
                {filed_for_rep_code}
                )
              </Text>
              <Text style={styles.leftUserName}>{filed_for_rep_name}</Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.month}>Date</Text>
              <Text style={styles.date}>{moment(filed_date).format('DD MMM YYYY')}</Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>
              {filed_by_user_type}
              {' '}
              (
              {filed_by_rep_code}
              )
            </Text>
            <Text style={styles.leftUserName}>{filed_by_rep_name}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.month}>Date</Text>
            <Text style={styles.date}>{moment(filed_date).format('DD MMM YYYY')}</Text>
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
              {Array.isArray(questions) ? questions.map(({ skill_map_rating_title, skill_map_rating_score, skill_map_title }, index) => (
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
              )) : null}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
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
          {this.renderHeader()}
          <View style={styles.collapseParent}>
            {this.renderCollapse()}
          </View>
        </ScrollView>
      </ParentView>
    );
  }
}
