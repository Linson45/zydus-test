import React from 'react';
import { View } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabStyles from '../../../styles/contentTabStyles';
import Colors from '../../../styles/colorsStyles';
import ContactDoctorContainer from '../ContactDoctorContainer';
import ContactChemistContainer from '../ContactChemistContainer';

class ContactContainer extends React.Component {
    static navigationOptions = () => ({
      headerTitle: 'Contact',
    });

    render() {
      return (
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={Colors.secondaryText}
          tabBarActiveTextColor={Colors.contentBlue}
          tabBarTextStyle={TabStyles.textStyle}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View tabLabel="Doctors" style={{ flex: 1 }}>
            <ContactDoctorContainer
              navigation={this.props.navigation}
            />
          </View>
          <View tabLabel="Chemist" style={{ flex: 1 }}>
            <ContactChemistContainer
              navigation={this.props.navigation}
            />
          </View>
        </ScrollableTabView>
      );
    }
}

export default ContactContainer;
