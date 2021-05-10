import React, { Component } from 'react';
import WebView from 'react-native-webview';
import * as RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import { unzipFolderPath } from '../../../util/Constants';
import { getTrainingContentConfig, getVAImage } from '../../../local-storage/helper/detailing';

class TrainingWebViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedOnce: false,
      showcase: [],
      currentShowCase: {},
      filePath: '',
      currentVAPosition: 0,
      currentVASlidePosition: 0,
      currentSlide: 0,
      loading: false,
      isZip: true,
      u_id: uuid.v1(),
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const { showcase } = params;
    return {
      headerTitle: showcase && showcase.length ? showcase[0].title : '',
    };
  };

  async componentDidMount() {
    const {
      showcase,
      position,
      doctor,
      allVAS,
      date
    } = this.props.navigation.state.params;

    if (allVAS && allVAS.length > 0) {
      this.state.allVAS = allVAS;
    }

    this.state.doctor = doctor;
    this.state.date = date;

    const modifiedShowcase = showcase;
    if (position) {
      this.changeVA(position, modifiedShowcase);
    } else {
      const currentVAPosition = 0;
      this.changeVA(currentVAPosition, modifiedShowcase);
    }
  }

  changeVA(currentVAPosition, showcase = []) {
    if (showcase.length === 0) {
      showcase = this.state.showcase;
    }
    this.state.currentVASlidePosition = 0;
    this.state.showcase = showcase;
    const currentShowCase = showcase[currentVAPosition];
    const {
      config
    } = currentShowCase;
    let filePath;
    if (!config || !config.length) {
      filePath = currentShowCase.content_location;
    } else {
      filePath = this.getCurrentShowCaseFilePath(currentShowCase);
    }
    this.setState({
      renderedOnce: true,
      currentShowCase,
      filePath,
      currentVAPosition
    });
  }

  getCurrentShowCaseFilePath(currentShowCase) {
    const folder = currentShowCase && currentShowCase.content_location ? currentShowCase.content_location : undefined;
    if (typeof folder === 'string') {
      return [
        'file:/',
        folder,
        'index.html'
      ].join('/');
    }
    return '';
  }

  async readConfig(currentShowCase, passConfig = true) {
    let currentSlide = this.state.currentVASlidePosition;
    const {
      doc_code,
      content_id,
      content_location
    } = currentShowCase;
    let VA = {};
    try {
      VA = await getTrainingContentConfig(doc_code, content_id);
    } catch (e) {
      // console.log(e);
    }
    let { config } = VA;
    if (!config || config.length < 1) {
      const filePath = [
        content_location,
        'config.json'
      ].join('/');
      if (await RNFS.exists(filePath)) {
        config = await RNFS
          .readFile(filePath)
          .then((res) => JSON.parse(res))
          .catch((err) => {
            console.log(err.message, err.code);
          });
      }
    }
    if (currentSlide) {
      currentSlide--;
    }
    if (passConfig) {
      this.passContentId(content_id);
      this.passConfig({ config, currentSlide });
      this.passThumbs();
    }
    return config;
  }

  async passThumbs(showcase = []) {
    const data = {};
    data.method = 'setThumbs';
    const vas = showcase && showcase.length > 0 ? showcase : this.state.showcase;
    const thumbs = [];
    for (const va of vas) {
      const slides = await this.readConfig(va, false);
      if (slides) {
        for (const slide of slides) {
          if (slide && slide.thumbnail && slide.has_to_be_shown) {
            thumbs.push({
              content_id: va.content_id,
              thumbnail: await getVAImage(va.content_id, slide.position.toString()),
              position: slide.position,
            });
          }
        }
      }
    }
    data.args = [thumbs];
    this.passMessageToWebView(data);
  }

  passConfig(config) {
    const data = {};
    data.method = 'setConfig';
    data.args = [config];
    this.passMessageToWebView(data);
  }

  passContentId(contentId) {
    const data = {};
    data.method = 'setContentId';
    data.args = [contentId];
    this.passMessageToWebView(data);
  }

  passMessageToWebView(data) {
    this.myWebView.postMessage(JSON.stringify(data));
  }

  render() {
    const {
      renderedOnce,
      currentShowCase,
      filePath
    } = this.state;
    return (
      <>
        <WebView
          ref={(webview) => {
            this.myWebView = webview;
          }}
          allowsInlineMediaPlayback
          style={{ flex: 1 }}
          originWhitelist={['*']}
          allowFileAccess
          source={renderedOnce && filePath ? { uri: filePath } : undefined}
          allowUniversalAccessFromFileURLs
          javaScriptEnabled
          domStorageEnabled
          onLoadEnd={renderedOnce ? () => this.readConfig(currentShowCase) : ''}
          cacheEnabled={false}
          allowingReadAccessToURL={currentShowCase && currentShowCase.content_path ? currentShowCase.content_path : unzipFolderPath}
          mediaPlaybackRequiresUserAction={false}
        />
      </>
    );
  }
}

export default TrainingWebViewContainer;
