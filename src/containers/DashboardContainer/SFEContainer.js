import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import 'react-native-get-random-values';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ColorStyles from '../../styles/colorsStyles';
import Colors from '../../Constants/colorConstants';
import { getSFEData } from '../../actions';

class SFEContainer extends Component {
  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    const { rep_code } = user;
    const data = { rep_code };
    this.props.getSFEData(data);
  }

  ActivityIndicatorLoadingView() {
    // making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        size="large"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#bebfc0',
        }}
        color={ColorStyles.gray}
      />
    );
  }

  // eslint-disable-next-line no-empty-pattern
  static navigationOptions = ({ }) => ({
    title: 'SFE Dashboard',
    headerStyle: {
      backgroundColor: ColorStyles.dashboardHeader,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerBackground: null,
    headerRight: (
      <>
        <TouchableOpacity
          opaque={1}
          style={{
            backgroundColor: 'transparent',
            padding: 10,
            color: Colors.white,
          }} // call that function in onPress using getParam which we already set in componentDidMount
          color="#fff"
        >
          <Icon
            name="refresh"
            type="SimpleLineIcons"
            style={{ color: ColorStyles.white, fontSize: 20 }}
          />
        </TouchableOpacity>
      </>
    ),
  });

  render() {
    const { token, loading } = this.props.SFEDataReducer;
    console.log(JSON.stringify(token));

    if (loading) {
      return <Spinner visible={loading} />;
    }
    if (token !== null && token !== undefined) {
      return (
        <WebView
          source={{ uri: token.replace(/['"]+/g, '') }}
          javaScriptEnabled
            // For the Cache
          domStorageEnabled
            // View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
            // Want to show the view or not
          startInLoadingState
          cacheEnabled
        />
      );
    }
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>SFE NOT REGISTERED</Text>
      </View>
    );

    //
  }
}
const mapStateToProps = (state) => ({
  SFEDataReducer: state.SFEDataReducer,
});

export default connect(
  mapStateToProps,
  {
    getSFEData,
  },
)(SFEContainer);
