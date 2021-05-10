import React from 'react';
import WebView from 'react-native-webview';
import FloatingButtonComponent from '../../detailing/FloatingButtonComponent';

export default class ContentHubPreviewComponent extends React.Component {
  render() {
    const { url } = this.props.navigation.state.params;

    return (
      <>
        <FloatingButtonComponent
          navigation={this.props.navigation}
        />
        <WebView
          source={{ url }}
          style={{ flex: 1 }}
        />
      </>
    );
  }
}
