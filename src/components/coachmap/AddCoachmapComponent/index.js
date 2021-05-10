import React from 'react';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';
import { RadioButton } from 'react-native-btr';
import ParentView from '../../ParentView';
import styles from './styles';
import Colors from '../../../styles/colorsStyles';

import Images from '../../../Constants/imageConstants';
import { dynamicSort } from '../../../util/ArrayUtil';

export default class AddCoachmapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  renderHeader() {
    const { user } = this.props;
    const { uname, rep_code, group_code } = user;

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
            <Text style={styles.month}>Date</Text>
            <Text style={styles.date}>{moment().format('DD MMM YYYY')}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderQuestions() {
    const { questions } = this.props;
    if (questions && questions.length) {
      return (
        <ImageBackground source={Images.ic_bg_add_map} style={styles.imageBg}>
          <ScrollView>
            {this.renderQuestion()}
          </ScrollView>
        </ImageBackground>
      );
    }
    return null;
  }

  renderTopIndicator() {
    const { titleIndex } = this.props;
    const icons = [Images.ic_indicator_rect_white, Images.ic_indicator_rect_transparent, Images.ic_indicator_rect_transparent, Images.ic_indicator_rect_transparent];
    for (let i = 1; i <= titleIndex; i++) {
      icons[i] = Images.ic_indicator_rect_white;
    }
    return (
      <View style={styles.indicatorView}>
        {
                    icons.map((icon) => (
                      <Image style={styles.indicator} source={icon} />
                    ))
                }

      </View>
    );
  }

  renderBottomIndicator() {
    const { titleIndex, questionIndex, questions } = this.props;
    const icons = [];
    questions[titleIndex].questions.forEach(() => {
      icons.push(Images.ic_indicator_transparent_circle);
    });

    icons[questionIndex] = Images.ic_indicator_white_circle;
    return (
      <View style={styles.bottomIndicatorView}>
        {
                    icons.map((icon, index) => (
                      <Image key={index} style={styles.bottomIndicator} source={icon} />
                    ))
                }
      </View>
    );
  }

  renderTitleImage() {
    const images = [Images.ic_thought, Images.ic_planning, Images.ic_meeting, Images.ic_hired];
    const { titleIndex } = this.props;
    return (
      <View style={styles.titleImageView}>
        <Image source={images[titleIndex]} style={styles.titleImage} />
      </View>
    );
  }

  renderQuestion() {
    const { questions, titleIndex, questionIndex } = this.props;
    const title = questions[titleIndex];
    const question = title.questions[questionIndex];
    const { options } = question;

    return (
      <View style={styles.questionView}>
        <Text style={styles.questionTitle}>{title.skill_map_group_title}</Text>
        {this.renderTopIndicator()}
        <ImageBackground source={Images.ic_card_background_bo_data} style={styles.questionImageBg}>
          <View>
            {this.renderTitleImage()}
            <Text>{question.skill_map_title}</Text>
            {this.renderOptions(options, question.answer)}
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderOptions(options, answer) {
    const { selectAnswer } = this.props;
    options = options.sort(dynamicSort('-skill_map_rating_score'));
    return (
      <View style={styles.options}>
        {
                    Array.isArray(options) ? options.map(({ skill_map_rating_id, skill_map_rating_title, skill_map_rating_score }) => (
                      <View style={styles.option}>
                        <RadioButton
                          checked={skill_map_rating_id === answer}
                          color={Colors.gray_light_1}
                          onPress={() => selectAnswer(skill_map_rating_id)}
                        />
                        <Text
                          style={styles.optionText}
                        >
                          {skill_map_rating_score}
                          {' '}
                          -
                          {skill_map_rating_title}
                        </Text>
                      </View>
                    )) : null
                }
      </View>
    );
  }

  renderBottomButtons() {
    const { questions } = this.props;
    if (questions && questions.length) {
      const { onNext, onPrevious } = this.props;
      return (
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.button} onPress={() => onPrevious()}>
            <Icon name="arrow-dropleft" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          {this.renderBottomIndicator()}
          <TouchableOpacity style={styles.button} onPress={() => onNext()}>
            <Text style={styles.buttonText}>Next</Text>
            <Icon name="arrow-dropright" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      );
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
        style={styles.containerMain}
      >
        {this.renderHeader()}
        {this.renderQuestions()}
        {this.renderBottomButtons()}
      </ParentView>
    );
  }
}
