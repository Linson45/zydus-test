import React, { Component } from 'react';
import {
  ScrollView, Text, TouchableOpacity, View, Alert
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Icon } from 'native-base';
import styles from './styles';
import Adapter from '../../util/Adapter';
import {
  openCoachmap,
  openFaq,
  openHelp,
  openLogout,
  openTpl,
  openTraining,
  openUploadDocId,
  openSFE,
  openRxTracker,
} from './actions';
import { getPendingEDetailingCount } from '../../local-storage/helper/detailing';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isBiologics: false,
      user_type: '',
      eDetailingCount: 0,
    };
  }

  async componentDidMount() {
    const pendingCount = await getPendingEDetailingCount();
    if (pendingCount !== 0) {
      console.log(pendingCount);
      this.setState({ eDetailingCount: pendingCount });
    }
    const user = await Adapter.getUser();
    const isBiologics = await Adapter.isBiologics();
    this.setState({ user, isBiologics });
    this.setState({ user_type: user.user_type, sbu_code: user.sbu_code });
  }

  renderTopBar() {
    const { user } = this.state;
    if (user) {
      const {
        user_name, rep_code, user_type, area_name
      } = user;
      return (
        <View style={styles.topBar}>
          {/* <Image source={Images.profile_pic} style={styles.profilePic}/> */}
          <View style={styles.topBarRight}>
            <Text style={styles.name}>{user_name}</Text>
            <Text style={styles.desc}>
              {rep_code}
              {' '}
              {user_type}
              ,
              {' '}
              {area_name}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  closerDrawer = () => {
    const { drawer } = this.props;
    if (drawer) {
      drawer.close();
    }
  };

  renderList1() {
    const { navigation } = this.props;
    const { user } = this.state;
    const {
      sbu_code,user_type
    } = user;
    return (
      <View style={styles.list1}>
        {sbu_code === '04'&&(user_type === 'BO'||user_type === 'ABM' )? (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              openRxTracker(navigation);
              this.closerDrawer();
            }}
          >
            <Text style={styles.rowTitle}>RX Tracker</Text>
            <Icon
              style={styles.rowIcon}
              name="chevron-right"
              type="FontAwesome"
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            openTraining(navigation);
            this.closerDrawer();
          }}
        >
          <Text style={styles.rowTitle}>Training</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            openCoachmap(navigation);
            this.closerDrawer();
          }}
        >
          <Text style={styles.rowTitle}>Coach Map</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            openSFE(navigation);
            this.closerDrawer();
          }}
        >
          <Text style={styles.rowTitle}>SFE Dashboard</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>

      </View>
    );
  }

  async checkEDetailingAndLogout(navigation) {
    const pendingCount = await getPendingEDetailingCount();
    if (pendingCount !== 0) {
      Alert.alert(
        'Unsynced E-Detailing data',
        'You have unsynced E-Detailing data. Please sync the data before you log out',
        [
          {
            text: 'Cancel',
            style: 'destructive',
            onPress: () => {
              this.closerDrawer();
            },
          },
        ],
      );
    } else {
      openLogout(navigation);
      this.closerDrawer();
    }
  }

  renderList2() {
    const { navigation } = this.props;
    const { isBiologics } = this.state;
    return (
      <View style={styles.list2}>
        <Text style={styles.list2Header}>Other Information</Text>
        {this.state.user_type !== 'HO' ? (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              openUploadDocId(navigation);
              this.closerDrawer();
            }}
          >
            <Text style={styles.rowTitle}>Upload Doc ID</Text>
            <Icon
              style={styles.rowIcon}
              name="chevron-right"
              type="FontAwesome"
            />
          </TouchableOpacity>
        ) : null}

        {isBiologics ? null : (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              openTpl(navigation);
              this.closerDrawer();
            }}
          >
            <Text style={styles.rowTitle}>Premier League</Text>
            <Icon
              style={styles.rowIcon}
              name="chevron-right"
              type="FontAwesome"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowTitle}>Settings</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => openFaq(navigation)}
        >
          <Text style={styles.rowTitle}>FAQ</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => openHelp(navigation)}
        >
          <Text style={styles.rowTitle}>Help & Support</Text>
          <Icon
            style={styles.rowIcon}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            this.checkEDetailingAndLogout(navigation);
          }}
        >
          <Text style={styles.rowTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderBuildNumber() {
    return (
      <View style={styles.list2}>
        <View style={styles.row}>
          <Text style={styles.versionCode}>
            Version:
            {DeviceInfo.getVersion()}
            {' '}
            - #
            {DeviceInfo.getBuildNumber()}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderTopBar()}
        {this.renderList1()}
        {this.renderList2()}
        {this.renderBuildNumber()}
      </ScrollView>
    );
  }
}
