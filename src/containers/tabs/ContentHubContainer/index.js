import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import ContentHubContainer from '../../content_hub/ContentHubContainer';
import Images from '../../../Constants/imageConstants';
import styles from '../styles';

class ContentTabHubContainer extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      let onSearch = null;
      if (params) {
        onSearch = params.onSearch;
      }
      if (navigation.dangerouslyGetParent().state.routeName === 'DailyPlan') {
        return {
          header: null
        };
      }
      const headerLeft = (
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            source={Images.ham}
            style={styles.ham}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
      const headerRight = (
        <TouchableOpacity onPress={() => {
          if (onSearch) {
            onSearch();
          }
        }}
        >
          <Image
            source={Images.icon_search}
            style={styles.search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );

      return {
        headerTitle: 'Content Hub',
        headerLeft,
        headerRight,
      };
    };

    async componentDidMount() {
      this.props.navigation.setParams({ openDrawer: this.openDrawer });
    }

    openDrawer = () => {
      this.drawer.toggle();
    };

    render() {
      return (
        <>
          <ContentHubContainer navigation={this.props.navigation} />
        </>
      );
    }
}

export default ContentTabHubContainer;
