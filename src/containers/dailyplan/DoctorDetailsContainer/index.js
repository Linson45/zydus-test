import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { loadDailyPlanDoctorDetails, submitComment } from '../../../actions';
import DoctorDetailsDailyPlanComponent from '../../../components/dailyplan/DoctorDetailsDailyPlanComponent';
import { getDetailingHistory } from '../../../local-storage/helper/detailing';

class DailyPlanDoctorDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comment: '',
      hasMet: '',
      isInternetConnected: true,
      history: [],
    };
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  hasMetDoctor(hasMet) {
    this.setState({
      hasMet
    });
  }

  onChangeText(text) {
    this.setState({
      comment: text
    });
  }

    static navigationOptions = {
      title: 'Doctor Details',
    };

    async componentDidMount() {
      const { user, doctor } = this.props.navigation.state.params;
      const { rep_code } = user;
      const { doc_code } = doctor;
      const history = await getDetailingHistory(rep_code, doc_code);
      this.setState({ history });
      this.loadData();
    }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    };

    async loadData() {
      const { user, doctor } = this.props.navigation.state.params;
      const { rep_code, company_code, sbu_code } = user;
      const { doc_code } = doctor;

      const data = {
        rep_code,
        company_code,
        sbu_code,
        doc_code
      };
      this.props.loadDailyPlanDoctorDetails(data);
    }

    goToDoctorDetails(doctor, brands) {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('DailyPlanPriorityBrandsContainer', { user, doctor, brands });
    }

    submitComment() {
      const { date, user, doctor } = this.props.navigation.state.params;
      const { company_code, sbu_code, rep_code } = user;
      const { doc_code } = doctor;
      const { hasMet, comment } = this.state;
      const payload = {
        company_code,
        sbu_code,
        rep_code,
        doc_code,
        status: hasMet ? 'Y' : 'N',
        comment,
        date: new moment(date).format('DD-MMM-YY'),
      };
      this.props.submitComment(payload);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.dailyPlanDoctorDetails.saved) {
        const that = this;
        setTimeout(() => {
          that.props.navigation.goBack(null);
        }, 2000);
      }
    }

    selectDoctor(doctor) {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('RcpaChemistSelection', { user, doctor });
    }

    gotoSelectContent = () => {
      const { date, doctor, user } = this.props.navigation.state.params;
      this.props.navigation.navigate('EDetailingBrandDr', { user, doctor, date });
    };

    gotoHistory = () => {
      const { date, doctor, user } = this.props.navigation.state.params;
      this.props.navigation.navigate('EDetailingBrandDr', {
        user, doctor, date, currentTab: 1
      });
    };

    render() {
      const { data, loading, submitting } = this.props.dailyPlanDoctorDetails;
      const { date, doctor } = this.props.navigation.state.params;
      const {
        comment, showModal, hasMet, history
      } = this.state;
      const openModal = this.openModal.bind(this);
      const closeModal = this.closeModal.bind(this);
      const hasMetDoctor = this.hasMetDoctor.bind(this);
      const onChangeText = this.onChangeText.bind(this);
      const goToDoctorDetails = this.goToDoctorDetails.bind(this);
      const submitComment = this.submitComment.bind(this);
      const selectDoctor = this.selectDoctor.bind(this);

      return (
        <DoctorDetailsDailyPlanComponent
          gotoHistory={this.gotoHistory}
          gotoSelectContent={this.gotoSelectContent}
          selectDoctor={selectDoctor}
          loading={loading}
          hoverLoading={submitting}
          data={data}
          showModal={showModal}
          date={date}
          hasMetDoctor={hasMetDoctor}
          comment={comment}
          doctor={doctor}
          openModal={openModal}
          closeModal={closeModal}
          onChangeText={onChangeText}
          hasMet={hasMet}
          goToDoctorDetails={goToDoctorDetails}
          submitComment={submitComment}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
          history={history}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanDoctorDetails: state.dailyPlanDoctorDetails
});

export default connect(
  mapStateToProps,
  { loadDailyPlanDoctorDetails, submitComment }
)(DailyPlanDoctorDetailsContainer);
