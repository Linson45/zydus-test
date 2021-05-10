import React from 'react';
import { View } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabStyles from '../../../styles/contentTabStyles';
import Colors from '../../../styles/colorsStyles';
import ContactDoctorInsightsComponent from '../ContactDoctorInsightsComponent';
import ContactDoctorProfileComponent from '../ContactDoctorProfileComponent';

class ContactDoctorDetailComponent extends React.Component {
    static navigationOptions = () => ({
      headerTitle: 'Contact',
    });

    render() {
      const { doctor } = this.props;
      return (
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={Colors.secondaryText}
          tabBarActiveTextColor={Colors.contentBlue}
          tabBarTextStyle={TabStyles.textStyle}
          initialPage={1}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View tabLabel="Insights" style={{ flex: 1 }}>
            <ContactDoctorInsightsComponent
              doctor={doctor}
            />
          </View>
          <View tabLabel="Profile" style={{ flex: 1 }}>
            <ContactDoctorProfileComponent
              doctor={doctor}
            />
          </View>
        </ScrollableTabView>
      );
    }
}

export default ContactDoctorDetailComponent;
