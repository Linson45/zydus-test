import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadDailyPlanRbmBOs, loadDailyPlanRegions, loadDailyPlanSbus, resetDailyPlanRegions
} from '../../../actions';
import HoBoComponent from '../../../components/dailyplan/HoBoComponent';

class DailyPlanHoBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      division: null,
      region: null,
      region_code: null,
      rbm: null,
      date: moment().format('DD-MMM-YYYY'),
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Select BO',
      headerRight: (null)
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
      this.props.resetDailyPlanRegions();
      const { rep_code } = this.props.navigation.state.params.user;
      const data = { rep_code };
      this.props.loadDailyPlanSbus(data);
    }

    selectDivision(division) {
      this.props.resetDailyPlanRegions();
      this.setState({ division, region: null, rbm: null });
      const { company_code, sbu_code } = division;
      this.props.loadDailyPlanRegions({ company_code, sbu_code });
    }

    selectRegion(region) {
      this.props.resetDailyPlanRegions();
      this.setState({ region, rbm: null });
      const { region_id } = region;
      console.log(region_id);
      const { company_code, sbu_code } = this.state.division;
      const { date } = this.state;
      this.props.loadDailyPlanRbmBOs(company_code, date, sbu_code, region_id);
    }

    selectRbm(rbm) {
      this.props.resetDailyPlanRegions();
      this.setState({ rbm });
      const { rep_code } = rbm;
      const { company_code, sbu_code } = this.state.division;
      const { date } = this.state;
      const data = {
        rep_code, company_code, sbu_code, date
      };
      this.props.loadDailyPlanRbmBOs(data);
    }

    goToRbmDetail(user) {
      const bo_name = user.name;
      const { date } = this.state;
      this.props.navigation.navigate('DailyPlanBo', { user, bo_name, date });
    }

    render() {
      const { dailyPlanRegions, dailyPlanRbmBOs, dailyPlanSbus } = this.props;
      const { data, loading } = dailyPlanSbus;
      const selectDivision = this.selectDivision.bind(this);
      const selectRegion = this.selectRegion.bind(this);
      const selectRbm = this.selectRbm.bind(this);
      const hoverLoading = dailyPlanRegions.loading || dailyPlanRbmBOs.loading;
      const regions = dailyPlanRegions.data;
      const bos = dailyPlanRbmBOs.data;
      const { region, rbm, date } = this.state;
      const goToRbmDetail = this.goToRbmDetail.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      return (
        <HoBoComponent
          loading={loading}
          divisions={data}
          selectDivision={selectDivision}
          selectRegion={selectRegion}
          selectRbm={selectRbm}
          hoverLoading={hoverLoading}
          regions={regions}
          region={region}
          rbm={rbm}
          bos={bos}
          date={date}
          changeQuery={changeQuery}
          onPress={goToRbmDetail}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanSbus: state.dailyPlanSbus,
  dailyPlanRegions: state.dailyPlanRegions,
  dailyPlanRbmBOs: state.dailyPlanRbmBOs
});

export default connect(
  mapStateToProps,
  {
    loadDailyPlanSbus, loadDailyPlanRegions, loadDailyPlanRbmBOs, resetDailyPlanRegions
  }
)(DailyPlanHoBoListContainer);
