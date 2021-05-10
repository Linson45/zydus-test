import React from 'react';
import {
  Image, ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Card } from 'native-base';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import { Tooltip } from 'react-native-elements';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import ColorStyles from '../../../styles/colorsStyles';

export default class SummaryComponent extends React.Component {
  renderHeader() {
    const { user } = this.props;
    const { user_type, user_name, rep_code } = user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>
              {user_type}
              {' '}
              (
              {rep_code}
              )
            </Text>
            <Text style={styles.leftUserName}>{user_name}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderDate(date) {
    if (!date) {
      return (
        <View style={styles.answerContainer}>
          <Text style={styles.answerDate}> - </Text>
          <View style={styles.answerBox}>
            <Text style={styles.answer}> - </Text>
          </View>
        </View>
      );
    }
    const {
      filed_date, skill_map_rating_score, filed_by_rep_name, skill_map_remark
    } = date;
    return (
      <View style={styles.answerContainer}>
        <Tooltip
          popover={<Text style={{ color: ColorStyles.white }}>{filed_by_rep_name}</Text>}
          overlayColor="transparent"
          backgroundColor={ColorStyles.blue_coachmapdetails}
        >
          <>
            <View style={styles.dateView}>
              <Text style={styles.answerDate}>{filed_date}</Text>
              <Image source={require('../../../../assets/images/ic_info_blue_24dp.png')} style={styles.date_i} />
            </View>
            <View style={styles.answerBox}>
              <Text style={styles.answer}>
                {skill_map_rating_score}
                {' '}
                -
                {' '}
                {skill_map_remark}
              </Text>
            </View>
          </>
        </Tooltip>
      </View>
    );
  }

  renderCollapse() {
    const { data } = this.props;
    if (data && Array.isArray(data)) {
      return data.map(({ questions, skill_map_group_id, skill_map_group_title }) => (
        <Collapse key={skill_map_group_id}>
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{skill_map_group_title}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <ScrollView>
              {Array.isArray(questions) ? questions.map(({
                skill_map_title, dates
              }, index) => (
                <Card key={index}>
                  <Text style={styles.question}>
                    {skill_map_title}
                  </Text>
                  <View style={styles.answers}>
                    {this.renderDate(dates[0])}
                    {this.renderDate(dates[1])}
                    {this.renderDate(dates[2])}
                  </View>
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
