import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import styles from './styles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';

class AbmDayComponent extends Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  shouldUpdate(a, b, paths) {
    for (let i = 0; i < paths.length; i++) {
      const equals = _.isEqual(_.get(a, paths[i]), _.get(b, paths[i]));
      if (!equals) {
        return true;
      }
    }
    return false;
  }

  renderDots(marking) {
    const baseDotStyle = [styles.dot, styles.visibleDot];
    if (marking.dots && Array.isArray(marking.dots) && marking.dots.length > 0) {
      const validDots = marking.dots.filter((d) => (d && d.color));
      return validDots.map((dot, index) => {
        const drStyle = !(dot.value === null && typeof dot.value === 'object') ? styles.drDetail : {};
        return (
          <View
            key={dot.key ? dot.key : index}
            style={[baseDotStyle,
              { backgroundColor: marking.selected && dot.selectedDotColor ? dot.selectedDotColor : dot.color }, drStyle]}
          >
            {!(dot.value === null && typeof dot.value === 'object')
              ? (
                <Text style={{ fontSize: 9, color: dot.color !== '#F9EA19' ? colorsStyles.white : colorsStyles.black, textAlign: 'center' }}>
                  {dot.value}
                </Text>
              )
              : null}
          </View>
        );
      });
    }
    return null;
  }

  render() {
    const containerStyle = [styles.base];
    const textStyle = [styles.text];
    const marking = this.props.marking || {};
    const dot = this.renderDots(marking);
    if (marking.selected) {
      containerStyle.push(styles.selected);
      textStyle.push(styles.selectedText);
      if (marking.selectedColor) {
        containerStyle.push({ backgroundColor: marking.selectedColor });
      }
    } else if (typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled') {
      textStyle.push(styles.disabledText);
    } else if (this.props.state === 'today') {
      containerStyle.push(styles.today);
      textStyle.push(styles.todayText);
    }
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
      >
        <View style={layoutStyles.column}>
          <View style={[layoutStyles.col5]}>{dot}</View>
          <View style={[layoutStyles.col5, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
            <Text allowFontScaling={false} style={textStyle}>{this.props.date.day}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AbmDayComponent;
