import React, { Component } from 'react';
import WebView from 'react-native-webview';
import * as RNFS from 'react-native-fs';
import {
  Alert, Modal, Text, TouchableOpacity
} from 'react-native';
import uuid from 'react-native-uuid';
import Pdf from 'react-native-pdf';
import { connect } from 'react-redux';
import { getDetailingContentConfig, getFeedbackConfig, getVAImage } from '../../../local-storage/helper/detailing';
import styles from './styles';
import Adapter from '../../../util/Adapter';
import { addOpenTokData, openTokToggles, UPDATE_DETAILING_DATA, } from '../../../actions';
import ParentView from '../../../components/ParentView';
import { unzipFolderPath } from '../../../util/Constants';
import { webViewJs } from './custom';
import FloatingButtonComponent from '../../../components/detailing/FloatingButtonComponent';

class VDetailingWebViewContainer extends Component {
  constructor(props) {
    super(props);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.state = {
      renderedOnce: false,
      moveBy: false,
      showcase: [],
      currentShowCase: {},
      filePath: '',
      currentVAPosition: 0,
      currentVASlidePosition: 0,
      currentSlide: 0,
      webViewData: [],
      currentSlideData: {},
      feedback_config: null,
      showFeedbackModal: false,
      showSurveyModal: false,
      loading: false,
      u_id: uuid.v1(),
      surveyResponses: [],
      showAddDoctorModal: false,
      extraDocs: [],
      isBrandDetailing: false,
      endDetailing: false,
      survey_configs: [],
      showQueryModal: false,
      queries: [],
      allVAS: [],
      hasLandingPage: false,
      sharedFiles: [],
      virtualDetailing: false
    };
  }

  async componentDidMount() {
    const me = await Adapter.getUser();
    const feedbackConfig = await getFeedbackConfig(me.sbu_code);
    if (feedbackConfig) {
      const { feedback_config } = feedbackConfig;
      await this.setState({ feedback_config });
    }

    const {
      showcase,
      position,
      doctor,
      allVAS,
      date,
      virtualDetailing
    } = this.props.navigation.state.params;

    if (virtualDetailing) {
      this.setState({
        virtualDetailing
      });
    }

    if (allVAS && allVAS.length > 0) {
      this.state.allVAS = allVAS;
    }

    this.state.doctor = doctor;
    this.state.date = date;

    const modifiedShowcase = showcase;
    const modifiedPosition = position;
    const {
      detailing_data
    } = this.props.openTokScreen;
    if (detailing_data && detailing_data.webViewData && detailing_data.webViewData.length > 0) {
      this.state.webViewData = detailing_data.webViewData;
    }

    if (position) {
      this.changeVA(modifiedPosition, modifiedShowcase);
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
    const filePath = this.getCurrentShowCaseFilePath(currentShowCase);
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

  openVA(data) {
    const { content_id } = data.data;
    const slidePosition = data.data.position;
    if (slidePosition === 0) {
      for (const position in this.state.allVAS) {
        const currentSlide = this.state.allVAS[position];
        if (+content_id === +currentSlide.content_id) {
          this.slideEndTime();
          this.state.showcase = [currentSlide];
          const showcase = currentSlide;
          this.changeVA(slidePosition);
          this.state.currentVASlidePosition = slidePosition;
          this.readConfig(showcase, true);
        }
      }
    } else {
      for (const position in this.state.showcase) {
        const currentSlide = this.state.showcase[position];
        if (+content_id === +currentSlide.content_id) {
          this.slideEndTime();
          const showcase = this.state.showcase[position];
          this.changeVA(position);
          this.state.currentVASlidePosition = slidePosition;
          this.readConfig(showcase, true);
        }
      }
    }
  }

    slideStartTime = (data) => {
      const date = new Date();
      const currentSlideData = {};
      const {
        currentShowCase,
      } = this.state;
      const {
        doc_code,
        content_id
      } = currentShowCase;
      currentSlideData.doc_code = doc_code;
      currentSlideData.content_id = content_id;
      currentSlideData.position = data.data.position;
      currentSlideData.start_time = date.toISOString();
      this.state.currentSlideData = currentSlideData;
      this.props.addOpenTokData(UPDATE_DETAILING_DATA, this.state);
    };

    slideEndTime = () => {
      const { currentSlideData } = this.state;
      const date = new Date();
      currentSlideData.end_time = date.toISOString();
      const webViewData = this.state.webViewData.splice(0);
      webViewData.push(
        currentSlideData
      );
      this.state.webViewData = webViewData;
    };

    onWebViewMessage(event) {
      let msgData;
      try {
        msgData = JSON.parse(event.nativeEvent.data);
      } catch (err) {
        return;
      }
      try {
        this[msgData.targetFunc].apply(this, [msgData]);
      } catch (e) {
        console.log(e);
      }
    }

    async prevVA() {
      let { currentVAPosition } = this.state;
      currentVAPosition--;
      this.slideEndTime();
      if (currentVAPosition >= 0) {
        const showcase = this.state.showcase[currentVAPosition];
        this.changeVA(currentVAPosition);
        const configs = await this.readConfig(showcase, false);
        let maxPosition = 0;
        if (configs) {
          for (const config of configs) {
            if (maxPosition < config.position) {
              maxPosition = config.position;
            }
          }
        }
        this.state.currentVASlidePosition = maxPosition;
        this.readConfig(showcase);
      }
    }

    nextVA() {
      let { currentVAPosition } = this.state;
      currentVAPosition++;
      this.slideEndTime();
      if (currentVAPosition < this.state.showcase.length) {
        const showcase = this.state.showcase[currentVAPosition];
        this.changeVA(currentVAPosition);
        this.readConfig(showcase);
      }
    }

    async passVAS() {
      const data = {};
      data.method = 'setVAS';
      const {
        allVAS,
        showcase
      } = this.state;
      const vas = allVAS && allVAS.length > 0 ? allVAS : showcase;
      const showcases = [];
      for (const va of vas) {
        if (va.thumbnail) {
          showcases.push({
            content_id: va.content_id,
            thumbnail: await getVAImage(va.content_id, 'main'),
          });
        }
      }
      data.args = [showcases];
      this.passMessageToWebView(data);
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

    isSurveyActive() {
      const data = {};
      data.method = 'isSurveyActive';
      data.args = [true];
      this.passMessageToWebView(data);
    }

    isVirtualDetailing() {
      const data = {};
      data.method = 'isVirtualDetailing';
      data.args = [true];
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

    async readConfig(currentShowCase, passConfig = true) {
      let currentSlide = this.state.currentVASlidePosition;
      const {
        doc_code,
        content_id,
        content_location
      } = currentShowCase;
      let VA = {};
      try {
        VA = await getDetailingContentConfig(doc_code, content_id);
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
          if (this.state.hasLandingPage) {
            const {
              doc_name
            } = this.state.doctor;
            config = config.map((item) => {
              item.doctor_name = doc_name;
              return item;
            });
          }
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

    closePdf() {
      this.setState({
        openPdf: false
      });
    }

    renderPDFEndButton = () => {
      this.closePdf = this.closePdf.bind(this);
      return (
        <TouchableOpacity style={styles.endButton} onPress={this.closePdf}>
          <Text style={styles.endButtonText}>Close</Text>
        </TouchableOpacity>
      );
    };

    shareContent(data) {
      const {
        currentShowCase,
      } = this.state;
      const {
        content_id,
      } = currentShowCase;
      if (content_id) {
        const folder = currentShowCase && currentShowCase.content_location ? currentShowCase.content_location : undefined;
        const source = [
          'file:/',
          folder,
          data.data.path
        ].join('/');
        RNFS.exists(source).then((response) => {
          if (response) {
            this.state.sharedFiles.push({
              content_id,
              additional_file_path: data.data.path
            });
          } else {
            Alert.alert(
              'Alert',
              'Unable to share the embedded PDF.',
              [{
                text: 'OK',
              }],
            );
          }
        }).catch((e) => {
          Alert.alert(
            'Alert',
            'Unable to share the embedded PDF.',
            [{
              text: 'OK',
            }],
          );
          console.log(e);
        });
      }
    }

    moveUp(data) {
      this.setState({
        moveBy: data.data.up,
      });
    }

    openPdf(data) {
      this.setState({
        pdfPath: data.data.path,
        openPdf: true,
      });
    }

    renderPdf() {
      const {
        pdfPath,
        openPdf,
        currentShowCase
      } = this.state;
      if (openPdf) {
        const folder = currentShowCase && currentShowCase.content_location ? currentShowCase.content_location : undefined;
        const source = [
          'file:/',
          folder,
          pdfPath
        ].join('/');
        return (
          <>
            <Modal isVisible={openPdf}>
              <Pdf
                source={{ uri: source }}
                style={{ flex: 1 }}
              />
              {this.renderPDFEndButton()}
            </Modal>
          </>
        );
      }
      return null;
    }

    render() {
      const {
        renderedOnce,
        currentShowCase,
        filePath,
        moveBy
      } = this.state;
      const {
        shareButtonDisabled
      } = this.props;
      return (
        <ParentView
          style={styles.container}
          loading={shareButtonDisabled}
          connected
        >
          <WebView
            ref={(webview) => {
              this.myWebView = webview;
            }}
            allowsInlineMediaPlayback
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            allowFileAccess
            source={renderedOnce && filePath ? { uri: filePath } : undefined}
            allowUniversalAccessFromFileURLs
            javaScriptEnabled
            domStorageEnabled
            onMessage={this.onWebViewMessage}
            onLoadEnd={renderedOnce ? () => this.readConfig(currentShowCase) && this.passVAS() && this.isVirtualDetailing() : ''}
            cacheEnabled={false}
            allowingReadAccessToURL={currentShowCase && currentShowCase.content_path ? currentShowCase.content_path : unzipFolderPath}
            mediaPlaybackRequiresUserAction={false}
            injectedJavaScript={webViewJs}
          />
          <FloatingButtonComponent
            navigation={this.props.navigation}
            showContentHubButton="true"
            moveBy={moveBy}
          />
          {this.renderPdf()}
        </ParentView>
      );
    }
}

const mapStateToProps = (state) => ({
  openTokScreen: state.openTokScreen,
  shareButtonDisabled: state.openTokScreen.shareButtonDisabled
});

export default connect(
  mapStateToProps,
  { openTokToggles, addOpenTokData }
)(VDetailingWebViewContainer);
