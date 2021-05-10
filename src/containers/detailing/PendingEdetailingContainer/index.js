import React, { Component } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { StackActions } from 'react-navigation';
import ActionSheet from 'react-native-actionsheet';
import {
  createPendingEDetailing,
  deletePendingEDetailingState,
  getFirstPendingEDetailingState, getSurveyConfig
} from '../../../local-storage/helper/detailing';
import ParentView from '../../../components/ParentView';
import Adapter from '../../../util/Adapter';
import styles from './styles';
import FeedbackModalComponent from '../../../components/detailing/FeedbackModalComponent';
import { REFRESH_DAILY_PLAN, syncEDetailing } from '../../../actions';
import SurveyModalComponent from '../../../components/detailing/SurveyModalComponent';
import AddDoctorModalComponentHide from '../../../components/detailing/AddDoctorModalComponentHide';
import Toaster from '../../../util/Toaster';
import AskDoctorQueryModalComponent from '../../../components/detailing/AskDoctorQueryModalComponent';
import { createDetailingAdhocDoctorsPlanned } from '../../../local-storage/helper/dailyplan';

class PendingEDetailingContainer extends Component {
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
      webViewData: [],
      currentSlideData: {},
      feedback_config: null,
      showFeedbackModal: false,
      showSurveyModal: false,
      loading: false,
      u_id: '',
      surveyResponses: [],
      showAddDoctorModal: false,
      extraDocs: [],
      isBrandDetailing: false,
      endDetailing: false,
      isPreview: false,
      survey_configs: [],
      showQueryModal: false,
      queries: [],
      allVAS: []
    };
  }

  componentDidMount() {
    this.restoreState().then().catch((e) => console.log('error: ', e));
  }

  async restoreState() {
    const state = await getFirstPendingEDetailingState();
    if (state && state.state) {
      const parsedState = JSON.parse(state.state);
      await this.setState({
        ...parsedState,
        u_id: state.u_id,
        rep_code: state.rep_code
      });
      this.setState({
        loading: false
      });
      this.end();
    } else {
      this.props.navigation.goBack();
    }
  }

  async end() {
    const {
      feedback_config, isBrandDetailing, isPreview, extraDocs, webViewData, u_id, rep_code
    } = this.state;
    if (isPreview) {
      this.props.navigation.goBack();
      return;
    }
    if (!webViewData.length) {
      //await deletePendingEDetailingState(u_id, rep_code);
       //console.log('sonali e detailing webViewData')
      // this.props.navigation.goBack();
      // return;
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
  }

    onSubmit = async (body) => {
      const me = await Adapter.getUser();
      const { rep_code } = me;

      const {
        isPreview,
        u_id,
        date,
        extraDocs
      } = this.state;
      if (!isPreview) {
        if (this.state.sharedFiles && this.state.sharedFiles.length > 0) {
          body.share = this.state.sharedFiles;
        } else {
          body.share = [];
        }
        await createDetailingAdhocDoctorsPlanned(date || moment().format('DD-MMM-YYYY'), rep_code, extraDocs);
        let resp = await syncEDetailing(body);
        if (resp) {
          if (typeof (resp) !== 'string') {
            resp = JSON.stringify(resp);
          }
          resp = resp.trim();
        }
        this.setState({ loading: false });
        Adapter.set(REFRESH_DAILY_PLAN, true);
        await deletePendingEDetailingState(u_id, rep_code);
        if (resp !== 'Session Captured') {
          await createPendingEDetailing(body);
        }
        const popAction = StackActions.pop({
          n: 1,
        });
        this.props.navigation.dispatch(popAction);
      }
    };

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
      } = this.state;
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
    const {showAddDoctorModal, extraDocs, isBrandDetailing} = this.state;
    if (showAddDoctorModal) {
      return (
        <AddDoctorModalComponentHide
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
          const { u_id, rep_code } = this.state;
          await deletePendingEDetailingState(u_id, rep_code);
          await this.setState({
            endDetailing: true
          });
          const popAction = StackActions.pop({
            n: 1,
          });
          this.props.navigation.dispatch(popAction);
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
      this.props.navigation.goBack();
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
      } = this.state;
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
      } = this.state;
      const {
        webViewData, u_id, extraDocs, surveyResponses, queries
      } = this.state;
      const metricJson = {};
      webViewData.forEach((item) => {
        const { content_id, position } = item;
        let { start_time, end_time } = item;
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
        time += spentTime;
        metricJson[key] = time;
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
      };
      if (surveyResponses) {
        body.survey = surveyResponses;
      }
      return body;
    };

    render() {
      const {
        loading
      } = this.state;
      return (
        <ParentView style={styles.container} loading={loading} connected>
          <View style={styles.content}>
            {this.renderFeedbackModal()}
            {this.renderSurveyModal()}
            {this.renderAddDoctorModal()}
            {this.renderDoctorQueryModal()}
            {this.renderSurveysActionSheet()}
          </View>
        </ParentView>
      );
    }
}

export default PendingEDetailingContainer;
