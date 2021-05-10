import React, { Component } from 'react';
import WebView from 'react-native-webview';
import ActionSheet from 'react-native-actionsheet';
import * as RNFS from 'react-native-fs';
import {
  Alert, Modal, Text, TouchableOpacity, View
} from 'react-native';
import moment from 'moment';
import uuid from 'react-native-uuid';
import { StackActions } from 'react-navigation';
import Pdf from 'react-native-pdf';
import {
  createPendingEDetailing, createPendingEDetailingState, deletePendingEDetailingState,
  getDetailingContentConfig,
  getFeedbackConfig, getLandingPage,
  getSurveyConfig,
  getVAImage
} from '../../../local-storage/helper/detailing';
import styles from './styles';
import Adapter from '../../../util/Adapter';
import FeedbackModalComponent from '../../../components/detailing/FeedbackModalComponent';
import {
  REFRESH_DAILY_PLAN,
  syncEDetailing,
} from '../../../actions';
import SurveyModalComponent from '../../../components/detailing/SurveyModalComponent';
import AddDoctorModalComponent from '../../../components/detailing/AddDoctorModalComponent';
import ParentView from '../../../components/ParentView';
import { unzipFolderPath } from '../../../util/Constants';
import Toaster from '../../../util/Toaster';
import AskDoctorQueryModalComponent from '../../../components/detailing/AskDoctorQueryModalComponent';
import { webViewJs } from './custom';
import {
  createDetailingAdhocDoctorsPlanned
} from '../../../local-storage/helper/dailyplan';

class EDetailingWebViewContainer extends Component {
  constructor(props) {
    super(props);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.state = {
      renderedOnce: false,
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
      isPreview: false,
      survey_configs: [],
      showQueryModal: false,
      queries: [],
      allVAS: [],
      hasLandingPage: false,
      sharedFiles: [],
      completed: false
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
      isBrandDetailing,
      preview,
      allVAS,
      date
    } = this.props.navigation.state.params;

    if (doctor) {
      if (feedbackConfig) {
        const { feedback_config } = feedbackConfig;
        await this.setState({ feedback_config });
      }
    }

    if (preview) {
      this.setState({
        isPreview: preview
      });
    }

    if (allVAS && allVAS.length > 0) {
      this.state.allVAS = allVAS;
    }

    this.state.doctor = doctor;
    this.state.date = date;

    let modifiedShowcase = showcase;
    let modifiedPosition = position;
    if (isBrandDetailing) {
      this.setState({
        isBrandDetailing
      });
    } else {
      const localLandingPage = await getLandingPage();
      if (localLandingPage && localLandingPage.length > 0) {
        modifiedPosition++;
        this.state.hasLandingPage = true;
        modifiedShowcase = [localLandingPage[0]].concat(showcase);
      }
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
        isPreview,
        completed
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
      if (!isPreview && !completed) {
        createPendingEDetailingState(this.state).then().catch((error) => console.log('error: ', error));
      }
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
      this.isSurveyPresent().then().catch();
    };

    isSurveyPresent = async () => {
      const { currentShowCase } = this.state;
      Adapter.getUser().then(
        (me) => {
          let brandCode = null;
          let specCode = null;
          if (currentShowCase) {
            brandCode = currentShowCase.brand;
          }
          const {
            doctor,
          } = this.props.navigation.state.params;
          if (doctor) {
            specCode = doctor.spec_code;
          }
          getSurveyConfig(me.sbu_code, brandCode, specCode).then((surveyConfigs) => {
            if (surveyConfigs.length > 0) {
              this.isSurveyActive(true);
            } else {
              this.isSurveyActive(true);
            }
          }).catch();
        }
      );
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

    isSurveyActive(value = true) {
      const data = {};
      data.method = 'isSurveyActive';
      data.args = [value];
      this.passMessageToWebView(data);
    }

    passContentId(contentId) {
      const data = {};
      data.method = 'setContentId';
      data.args = [contentId];
      this.passMessageToWebView(data);
    }

    passMessageToWebView(data) {
      if (this.myWebView) {
        this.myWebView.postMessage(JSON.stringify(data));
      }
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

    onEnd = async () => {
      this.slideEndTime();
      const {
        feedback_config, isBrandDetailing, isPreview, extraDocs, webViewData
      } = this.state;
      if (isPreview) {
        this.props.navigation.goBack();
        return;
      }
      if (!webViewData.length) {
        Alert.alert('', 'No recording yet. Click on next icon');
        return;
      }

      if (isBrandDetailing) {
        await this.setState({ endDetailing: true });
        if (extraDocs && extraDocs.length) {
          this.onAddDoctorSubmit(extraDocs);
          return;
        }
        this.onAddDoctorModalOpen();
        return;
      }
      if (feedback_config) {
        await this.setState({ feedback_config, showFeedbackModal: true });
        return;
      }

      this.setState({ loading: true });
      const body = await this.getBody();
      this.onSubmit(body);
    };

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

    renderEndButton = () => (
      <TouchableOpacity style={styles.endButton} onPress={this.onEnd}>
        <Text style={styles.endButtonText}>End</Text>
      </TouchableOpacity>
    );

    renderFeedbackModal = () => {
      const { showFeedbackModal, feedback_config } = this.state;
      if (feedback_config) {
        return (
          <FeedbackModalComponent
            isVisible={showFeedbackModal}
            config={feedback_config}
            onSubmit={this.onFeedbackSubmit}
            onClose={this.onFeedbackCancel}
          />
        );
      }
      return null;
    };

    onFeedbackSubmit = async (feedbackResponse) => {
      this.setState({ showFeedbackModal: false, loading: true });
      const body = await this.getBody();
      body.feedback = [feedbackResponse];
      this.onSubmit(body);
    };

    onFeedbackCancel = async () => {
      this.setState({ showFeedbackModal: false });
    };

    onSurveyOpen = async () => {
      const { currentShowCase } = this.state;
      const me = await Adapter.getUser();
      let brandCode = null;
      let specCode = null;
      if (currentShowCase) {
        brandCode = currentShowCase.brand;
      }
      const {
        doctor,
      } = this.props.navigation.state.params;
      if (doctor) {
        specCode = doctor.spec_code;
      }
      const surveyConfigs = await getSurveyConfig(me.sbu_code, brandCode, specCode);

      if (surveyConfigs.length > 1) {
        const survey_configs = surveyConfigs.map((config) => config.survey_config);
        await this.setState({ survey_configs });
        this.SurveysActionSheet.show();
      } else if (surveyConfigs.length === 1) {
        await this.setState({ survey_config: surveyConfigs[0].survey_config, showSurveyModal: true });
      } else {
        Toaster.show('No survey found');
      }
    };

    renderSurveyModal = () => {
      const { showSurveyModal, survey_config } = this.state;
      if (survey_config) {
        return (
          <SurveyModalComponent
            isVisible={showSurveyModal}
            config={survey_config}
            onSubmit={this.onSurveySubmit}
            onClose={this.onSurveyCancel}
          />
        );
      }
      return null;
    };

    onSurveySubmit = async (surveyResponse) => {
      const { surveyResponses } = this.state;
      surveyResponses.push(surveyResponse);
      this.setState({ showSurveyModal: false, surveyResponses, survey_config: null });
    };

    onSurveyCancel = async () => {
      this.setState({ showSurveyModal: false, survey_config: null });
    };

    renderAddDoctorModal = () => {
      const { showAddDoctorModal, extraDocs, isBrandDetailing } = this.state;
      if (showAddDoctorModal) {
        return (
          <AddDoctorModalComponent
            isVisible={showAddDoctorModal}
            allowPractice={isBrandDetailing && (!extraDocs || !extraDocs.length)}
            onSubmit={this.onAddDoctorSubmit}
            onClose={this.onAddDoctorCancel}
            selectedDocs={extraDocs}
          />
        );
      }
      return null;
    };

    onAddDoctorModalOpen = async () => {
      await this.setState({ showAddDoctorModal: true });
    };

    onAddDoctorSubmit = async (extraDocs) => {
      await this.setState({ showAddDoctorModal: false, extraDocs });
      const {
        endDetailing,
        isBrandDetailing
      } = this.state;
      if (endDetailing && isBrandDetailing) {
        if (extraDocs === null) {
          await this.setState({
            endDetailing: true
          });
          const popAction = StackActions.pop({
            n: 2,
          });
          this.props.navigation.dispatch(popAction);
          return;
        }
        if (extraDocs.length === 0) {
          Toaster.show('Select doctors');
          return;
        }
        const { feedback_config } = this.state;
        if (feedback_config) {
          await this.setState({ feedback_config, showFeedbackModal: true });
          return;
        }
        this.setState({ loading: true });
        const body = await this.getBody();
        this.onSubmit(body);
      }
    };

    onAddDoctorCancel = async () => {
      this.setState({ showAddDoctorModal: false, endDetailing: false });
    };

    onDoctorQueryOpen = async () => {
      await this.setState({ showQueryModal: true });
    };

    onDoctorQuerySubmit = async (query) => {
      const { currentShowCase } = this.state;
      let brandCode = null;
      if (currentShowCase) {
        brandCode = currentShowCase.brand;
      }
      const {
        doctor,
      } = this.props.navigation.state.params;
      let specCode = null;
      if (doctor) {
        specCode = doctor.spec_code;
      }

      const me = await Adapter.getUser();
      const { rep_code, company_code, sbu_code } = me;

      const body = {
        type: 'doctor',
        speciality_code: specCode,
        company_code,
        brand_code: brandCode,
        sbu_code,
        query,
        rep_code,
      };
      const { queries } = this.state;
      queries.push(body);
      this.setState({ showQueryModal: false, queries });
    };

    onDoctorQueryCancel = async () => {
      this.setState({ showQueryModal: false });
    };

    renderDoctorQueryModal = () => {
      const { showQueryModal } = this.state;
      if (showQueryModal) {
        return (
          <AskDoctorQueryModalComponent
            isVisible={showQueryModal}
            onClose={this.onDoctorQueryCancel}
            onSubmit={this.onDoctorQuerySubmit}
          />
        );
      }
      return null;
    };

    getBody = async () => {
      const {
        doctor,
        date,
      } = this.props.navigation.state.params;
      const {
        webViewData, u_id, extraDocs, surveyResponses, queries
      } = this.state;
      const metricJson = {};
      webViewData.forEach((item) => {
        const {
          content_id, position
        } = item;
        let {
          start_time, end_time
        } = item;
        const key = `${content_id}__${position}`;
        let time = metricJson[key];
        if (!time) {
          time = 0;
        }
        start_time = moment(start_time);
        end_time = moment(end_time);
        let spentTime;
        if (end_time) {
          spentTime = (end_time - start_time) / 1000;
        } else {
          spentTime = 30;
        }
        if (spentTime < 1200) {
          time += spentTime;
          metricJson[key] = time;
        }
      });

      const contents = [];
      Object.keys(metricJson).forEach((key) => {
        const keySplit = key.split('__');
        const content_id = keySplit[0];
        const slide = keySplit[1];
        contents.push({
          content_id,
          slide,
          time: metricJson[key],
        });
      });

      let total_time = 0;
      contents.forEach((content) => {
        total_time += content.time;
      });

      const doc_codes = [];
      if (doctor) {
        doc_codes.push(doctor.doc_code);
      }
      extraDocs.forEach((doc_code) => {
        doc_codes.push(doc_code);
      });

      const me = await Adapter.getUser();
      const {
        rep_code, company_code, sbu_code, region_code, zone_code, area_code, hq_code
      } = me;
      const body = {
        u_id,
        rep_code,
        doc_codes,
        total_time,
        company_code,
        sbu_code,
        region_code,
        zone_code,
        area_code,
        hq_code,
        session_type: 'e-detailing',
        date: date || moment().format('DD-MMM-YYYY'),
        contents,
        query: queries,
        dump: webViewData,
      };
      if (surveyResponses) {
        body.survey = surveyResponses;
      }
      return body;
    };

    onSubmit = async (body) => {
      const {
        isPreview, u_id, extraDocs
      } = this.state;
      if (!isPreview) {
        await this.setState({ completed: true });
        const { date } = this.props.navigation.state.params;

        const me = await Adapter.getUser();
        const { rep_code } = me;
        await createDetailingAdhocDoctorsPlanned(date || moment().format('DD-MMM-YYYY'), rep_code, extraDocs);

        if (this.state.sharedFiles && this.state.sharedFiles.length > 0) {
          body.share = this.state.sharedFiles;
        } else {
          body.share = [];
        }
        let resp = await syncEDetailing(body);
        if (resp) {
          if (typeof (resp) !== 'string') {
            resp = JSON.stringify(resp);
          }
          resp = resp.trim();
        }
        await this.setState({ loading: false });
        Adapter.set(REFRESH_DAILY_PLAN, true);
        await deletePendingEDetailingState(u_id, rep_code);
        if (resp === 'Session Captured') {
          const popAction = StackActions.pop({
            n: 2,
          });
          this.props.navigation.dispatch(popAction);
        } else {
          await createPendingEDetailing(body);
          const popAction = StackActions.pop({
            n: 2,
          });
          this.props.navigation.dispatch(popAction);
        }
      }
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

    renderSurveysActionSheet = () => {
      const { survey_configs } = this.state;

      return (
        <ActionSheet
          ref={(o) => this.SurveysActionSheet = o}
          title="Choose Survey ?"
          options={survey_configs.map((config) => config.title)}
          onPress={(index) => {
            const survey_config = survey_configs[index];
            this.setState({ survey_config, showSurveyModal: true });
          }}
        />
      );
    };

    renderPreview() {
      const {
        isPreview
      } = this.state;
      if (isPreview) {
        return (
          <View style={styles.preViewOverlay}>
            <Text style={styles.previewText}>Preview</Text>
          </View>
        );
      }
      return null;
    }

    render() {
      const {
        renderedOnce,
        currentShowCase,
        filePath,
        loading
      } = this.state;
      return (
        <ParentView style={styles.container} loading={loading} connected>
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
            onLoadEnd={renderedOnce ? () => this.readConfig(currentShowCase) && this.passVAS() : ''}
            cacheEnabled={false}
            allowingReadAccessToURL={currentShowCase && currentShowCase.content_path ? currentShowCase.content_path : unzipFolderPath}
            mediaPlaybackRequiresUserAction={false}
            injectedJavaScript={webViewJs}
          />
          {this.renderPreview()}
          {this.renderPdf()}
          {this.renderEndButton()}
          {this.renderFeedbackModal()}
          {this.renderSurveyModal()}
          {this.renderAddDoctorModal()}
          {this.renderDoctorQueryModal()}
          {this.renderSurveysActionSheet()}
        </ParentView>
      );
    }
}

export default EDetailingWebViewContainer;
