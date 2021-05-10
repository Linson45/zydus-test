import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadBoTourPlan,
  loadBoTourPlanDocList,
  loadBoTourPlanTpQuality,
  loadManagerList,
  submitTourPlan
} from '../../../actions';
import BoComponent from '../../../components/tourplan/BoComponent';

class TourplanBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isTpQualityOpen: false,
      isDrWiseTpOpen: false,
      approver: '',
      isInternetConnected: true
    };
  }

  selectApprover(approver) {
    this.setState({
      approver
    });
  }

  toggleTpQualityModal() {
    this.setState({
      isTpQualityOpen: !this.state.isTpQualityOpen
    });
  }

  toggleDrWiseTpModal() {
    this.setState({
      isDrWiseTpOpen: !this.state.isDrWiseTpOpen
    });
  }

    static navigationOptions = {
      title: 'Daily Tour Plan',
      headerRight: null
    };

    componentDidMount() {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
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
    }

    async changeQuery(date) {
      await this.setState({
        date
      });
      this.loadData();
    }

    loadData() {
      const {
        rep_code, company_code, sbu_code, user_type, user_name
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      let data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date

      };
      this.props.loadBoTourPlan(data);

      data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        user_name
      };

      this.props.loadManagerList(data);
    }

    openDocList() {
      this.setState({
        isDrWiseTpOpen: true
      });
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadBoTourPlanDocList(data);
    }

    openTpQuality() {
      this.setState({
        isTpQualityOpen: true
      });
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadBoTourPlanTpQuality(data);
    }

    gotoEditTourplan(item) {
      const { user } = this.props.navigation.state.params;
      const { can_edit } = this.props.tourplanBo.data;
      console.log({ user, can_edit, item });
      this.props.navigation.navigate('TourplanBoAdd', { user, can_edit, item });
    }

    async submitTourPlan() {
      const {
        date,
        approver
      } = this.state;
      const { data } = this.props.tourplanBo;
      if (approver && data.can_edit) {
        const {
          company_code,
          sbu_code,
          rep_code,
          user_type
        } = this.props.navigation.state.params.user;

        const month = moment(date, 'DD-MMM-YYYY').format('M');
        const year = moment(date, 'DD-MMM-YYYY').format('YYYY');

        const data = {
          company_code,
          sbu_code,
          rep_code,
          month,
          year,
          date,
          user_type,
          approver_id: approver
        };
        this.props.submitTourPlan(data);
      }
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const {
        date, isTpQualityOpen, isDrWiseTpOpen, approver
      } = this.state;
      const { loading, data } = this.props.tourplanBo;
      const {
        tourplanBoTpQuality, tourPlanBoDocs, tourplanBo, tourplanSubmit, tourplanManagerList
      } = this.props;

      const openTpQuality = this.openTpQuality.bind(this);
      const gotoEditTourplan = this.gotoEditTourplan.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const toggleTpQualityModal = this.toggleTpQualityModal.bind(this);
      const toggleDrWiseTpModal = this.toggleDrWiseTpModal.bind(this);
      const openDocList = this.openDocList.bind(this);
      const selectApprover = this.selectApprover.bind(this);
      const submitTourPlan = this.submitTourPlan.bind(this);

      return (

        <BoComponent
          loading={loading || tourplanSubmit.loading || tourplanManagerList.loading}
          connected={this.state.isInternetConnected}
          data={data}
          date={date}
          user={user}
          submitTourPlan={submitTourPlan}
          approver={approver}
          gotoEditTourplan={gotoEditTourplan}
          tourplanBo={tourplanBo}
          tourPlanBoDocs={tourPlanBoDocs}
          tourplanBoTpQuality={tourplanBoTpQuality}
          isDrWiseTpOpen={isDrWiseTpOpen}
          isTpQualityOpen={isTpQualityOpen}
          toggleDrWiseTpModal={toggleDrWiseTpModal}
          toggleTpQualityModal={toggleTpQualityModal}
          openTpQuality={openTpQuality}
          openDocList={openDocList}
          changeQuery={changeQuery}
          selectApprover={selectApprover}
          managers={tourplanManagerList.data}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanBo: state.tourplanBo,
  tourPlanBoDocs: state.tourPlanBoDocs,
  tourplanBoTpQuality: state.tourplanBoTpQuality,
  tourplanSubmit: state.tourplanSubmit,
  tourplanManagerList: state.tourplanManagerList
});

export default connect(
  mapStateToProps,
  {
    loadBoTourPlan, loadBoTourPlanDocList, loadBoTourPlanTpQuality, submitTourPlan, loadManagerList
  }
)(TourplanBoContainer);
