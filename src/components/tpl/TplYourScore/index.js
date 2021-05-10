import React from 'react';
import {
  ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import Images from '../../../Constants/imageConstants';
import ParentView from '../../ParentView';
import styles from './styles';
import { getFullMonthString } from '../../../util/dateTimeUtil';

export default class TplYourScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Month'
    };
  }

  renderButton({ active, orientation, label }) {
    return (
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => {
          this.setState({ selected: label });
        }}
      >
        {active ? (
          <ImageBackground source={Images[orientation]} style={styles.button}>
            <Text style={styles.whiteText}>{label}</Text>
          </ImageBackground>
        ) : (
          <View
            style={[styles.inActiveButton, orientation === 'LeftButton' ? styles.LeftDynamic : styles.RightDynamic]}
          >
            <Text style={styles.blackText}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  renderRow({
    kpi, score, total, bonus_penality
  }, index) {
    return (
      <View style={styles.RowContainer} key={index}>
        <View style={styles.FirstInternal}>
          <Text style={styles.boldText}>{kpi}</Text>
          <Text style={styles.boldText}>
            {score}
            /
            {total}
          </Text>
        </View>
        <View style={styles.SecondInternal}>
          <Text style={styles.miniText}>Bonus Penalty</Text>
          <Text style={styles.miniText}>{bonus_penality}</Text>
        </View>
      </View>
    );
  }

  renderData() {
    const { month } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <ImageBackground source={Images.bg_scorelist} style={styles.bannerImage}>
            <View style={styles.textMainContainer}>
              <View style={styles.textInnerContainer}>
                <Text style={styles.title}>Your Score for</Text>
                <Text style={styles.subTitle}>{getFullMonthString(month)}</Text>
                <View style={styles.Text}>
                  <Text
                    style={styles.yourScoreText}
                  >
                    {this.props.data ? this.state.selected === 'Month' ? this.props.data.monthly.score : this.props.data.quarterly.score : '----'}
                  </Text>
                  <Text
                    style={styles.TotalScoreText}
                  >
                    /
                    {this.props.data ? this.state.selected === 'Month' ? this.props.data.monthly.total : this.props.data.quarterly.total : '----'}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.buttonContainer}>
          {this.renderButton({
            active: this.state.selected === 'Month',
            orientation: 'LeftButton',
            label: 'Month'
          })}
          {this.renderButton({
            active: this.state.selected === 'Quarterly',
            orientation: 'RightButton',
            label: 'Quarterly'
          })}
        </View>
        <View style={styles.dataContainer}>
          {this.props.data.monthly && this.state.selected === 'Month' ? this.props.data.monthly.norms.map((item, index) => this.renderRow(item, index)) : null}
          {this.props.data.quarterly && this.state.selected === 'Quarterly' ? this.props.data.quarterly.norms.map((item, index) => this.renderRow(item, index)) : null}

        </View>
      </View>
    );
  }

  render() {
    const { loading, data } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        data={data}
        style={styles.container}
      >
        {data ? this.renderData() : null}
      </ParentView>
    );
  }
}
