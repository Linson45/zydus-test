import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Adapter from '../../../util/Adapter';
import { Role } from '../../../util/Constants';
import MyPerformanceBoContainer from '../../my_performance/BoContainer';
import MyPerformanceAbmContainer from '../../my_performance/AbmContainer';
import MyPerformanceZbmContainer from '../../my_performance/ZbmContainer';
import MyPerformanceHoContainer from '../../my_performance/HoContainer';
import Images from '../../../Constants/imageConstants';
import styles from '../styles';
import MyPerformanceRbmContainer from '../../my_performance/RbmContainer';

class PerformanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

    static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Performance',
      headerLeft: (
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            source={Images.ham}
            style={styles.ham}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    });

    async componentDidMount(): void {
      this.props.navigation.setParams({ openDrawer: this.openDrawer });
      await this.setUser().then().catch();
    }

    async setUser() {
      const user = await Adapter.getUser();
      this.props.navigation.setParams({ user });
      await this.setState({
        user
      });
    }

    openDrawer = () => {
      this.drawer.toggle();
    };

    renderScreen() {
      const { user } = this.state;
      if (!user) {
        return null;
      }
      const { user_type } = user;
      let screen = null;
      if (user_type) {
        if (user_type === Role.BO) {
          screen = <MyPerformanceBoContainer navigation={this.props.navigation} />;
        } else if (user_type === Role.ABM) {
          screen = <MyPerformanceAbmContainer navigation={this.props.navigation} />;
        } else if (user_type === Role.RBM) {
          screen = <MyPerformanceRbmContainer navigation={this.props.navigation} />;
        } else if (user_type === Role.ZBM) {
          screen = <MyPerformanceZbmContainer navigation={this.props.navigation} />;
        } else {
          screen = <MyPerformanceHoContainer navigation={this.props.navigation} />;
        }
      }
      return screen;
    }

    render() {
      return (
        this.renderScreen()
      );
    }
}

export default PerformanceContainer;
