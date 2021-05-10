/**
 * Sample React Native MainRouter
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';

import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import store from './store';
import MainRouter from './routers/MainRouter';

console.disableYellowBox = true;
class App extends Component {
  componentDidMount() {
    if (DeviceInfo.isTablet()) {
      Orientation.lockToLandscape();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <MainRouter />
        </MenuProvider>
      </Provider>
    );
  }
}

export default App;
//

// /**
//  * Sample React Native MainRouter
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */
//
// import React from 'react';
// import {Provider} from "react-redux";
// import store from "./store";
// import MainRouter from "./routers/MainRouter";
// import WebView from "react-native-webview";
//
// console.disableYellowBox = true;
//
// const INJECTED_JAVASCRIPT = `(function() {
//     window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
// })();`;
//
// const App = () => {
//     return (
//         <WebView
//             source={{ uri: 'http://www.atainfotech.in/' }}
//             injectedJavaScript={INJECTED_JAVASCRIPT}
//             onMessage={this.onMessage}
//         />
//     );
// };
//
//
// export default App;
