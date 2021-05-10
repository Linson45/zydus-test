import React from 'react';
import WebView from 'react-native-webview';

export default class FAQComponent extends React.Component {
  render() {
    const uri = 'https://www.google.com';

    return (
      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
      />
    );
  }
}
