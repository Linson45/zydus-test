import React, { Component } from 'react';
import {
  Image, ImageBackground, Text, View
} from 'react-native';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import Colors from '../../../Constants/colorConstants';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';

class TplWinners extends Component {
    renderCard = ({ name, score }, index) => (
      <View style={styles.cardOuter} key={index}>
        <View style={styles.cardImageSection}>
          <Image
            source={Images.Cup}
            style={styles.image}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.scoreLabel}>
            <Text style={{ color: Colors.WhiteColor }}>Score</Text>
            <Text
              style={styles.score}
            >
              {' '}
              {score}
            </Text>
          </View>
        </View>
      </View>
    );

    renderContent = () => (
      <ImageBackground source={Images.WinningBg} style={styles.container}>
        <Image
          source={Images.Trophy}
          style={styles.winningCup}
        />
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Division
              {this.props.data && this.props.data.division}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardInternalContainer}>
            {this.props.data && this.props.data.winners.length > 0 ? this.props.data.winners.map((item, index) => this.renderCard(item, index))
              : (
                <View style={{ alignItems: 'center', margin: 10 }}>
                  <Text style={[layoutStyles.whiteText]}>No Data Available</Text>
                </View>
              )}
          </View>
        </View>

      </ImageBackground>
    );

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
          {data ? this.renderContent() : null}
        </ParentView>
      );
    }
}

export default TplWinners;
