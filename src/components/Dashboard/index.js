import {
  Image, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import React from 'react';
import styles from './styles';
import Images from '../../Constants/imageConstants';
import layoutStyles from '../../styles/layoutStyles';
import { TopSwiper } from './TopSwiper';

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 400,
      height: 200
    };
  }

    renderMenuItem = (props) => (
      <TouchableOpacity onPress={props.onPress} opaque={1} style={[styles.menuItem]}>
        <Image source={props.image} style={styles.menuItemImage} />
        <Text style={styles.menuItemLabel}>{props.label}</Text>
      </TouchableOpacity>
    );

    renderHeader() {
      const { userDetails } = this.props;
      return (
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{userDetails.user_name}</Text>
          <Text style={styles.posLocText}>
            {userDetails.user_type}
            ,
            {' '}
            {userDetails.area_name}
          </Text>
        </View>
      );
    }

    renderBottomButtons() {
      const {
        openMyPerformance, openRcpa, openTourplan, openActionItems, openTraining, gotoBrandDetailing
      } = this.props;
      return (
        <>
          <View style={styles.menuItemContainer}>
            {this.renderMenuItem({
              image: Images.TourPlan,
              label: 'Tour Plan',
              onPress: openTourplan
            })}
            {this.renderMenuItem({
              image: Images.MyPerformance,
              label: 'My Performance',
              onPress: openMyPerformance
            })}
            {this.renderMenuItem({
              image: Images.Training,
              label: 'Training',
              onPress: openTraining
            })}
          </View>
          <View style={styles.menuItemContainer}>
            {this.renderMenuItem({
              image: Images.RCPA,
              label: 'RCPA',
              onPress: openRcpa
            })}
            {this.renderMenuItem({
              image: Images.ActionItem,
              label: 'Reporting',
              onPress: openActionItems
            })}
            {this.renderMenuItem({
              image: Images.BrandDetailing,
              label: 'Brand Detailing',
              onPress: gotoBrandDetailing
            })}
          </View>
        </>
      );
    }

    render() {
      const {
        openTpl, dashboardScore, dashboardSales
      } = this.props;

      return (
        <>
          <View style={[layoutStyles.column]}>
            <ImageBackground source={Images.DashboardBg} style={[styles.performanceSlider]}>
              {this.renderHeader()}
              <TopSwiper
                dashboardSales={dashboardSales}
                dashboardScore={dashboardScore}
                openTpl={openTpl}
              />
            </ImageBackground>
            <View style={styles.menuSlider}>
              {this.renderBottomButtons()}
            </View>
          </View>
        </>
      );
    }
}

export default DashboardComponent;
