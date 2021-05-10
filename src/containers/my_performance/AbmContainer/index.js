import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  loadMyPerformanceAbmAggregatedEfforts,
  loadMyPerformanceAbmEfforts,
  loadMyPerformanceAbmSales, loadMyPerformanceAbmDetailing,
  loadMyPerformanceSalesTrends
} from '../../../actions';
import { Role } from '../../../util/Constants';
import {
  getCurrentMonth, getCurrentYear, getMonthRange, getPeriodDateRange
} from '../../../util/dateTimeUtil';
import AbmContentComponent from '../../../components/my_performance/AbmContentComponent';
import { getSpecialities } from '../../../local-storage/helper/detailing';
import { getAllBo } from '../../../local-storage/helper/all';
import Adapter from '../../../util/Adapter';

class MyPerformanceAbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      period: 'mtd',
      showSalesTrend: false,
      isVisibleMonthSelectModal: false,
      isInternetConnected: true,
      specialities: [],
      selectedSpeciality: null,
      boSelectedSpeciality: null,
      selectedBo: null,
      bos: [],
      filterType: 'period',
      isBiologics: false,
    };
  }

    static navigationOptions = {
      title: 'My Performance',
    };

    showMonthSelectModal = () => {
      this.setState({
        isVisibleMonthSelectModal: true
      });
    };

    hideMonthSelectModal = () => {
      this.setState({
        isVisibleMonthSelectModal: false
      });
    };

    async componentDidMount() {
      const isBiologics = await Adapter.isBiologics();
      this.loadData();
      const specialities = await getSpecialities();
      const bos = await getAllBo();
      this.setState({ specialities, bos, isBiologics });
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

    loadData() {
      const { rep_code } = this.props.navigation.state.params.user;
      const {
        month, year, period, selectedSpeciality, filterType, boSelectedSpeciality, selectedBo
      } = this.state;
      let { start_date, end_date } = getPeriodDateRange(period);
      if (filterType === 'range') {
        const monthRange = getMonthRange(month, year);
        start_date = monthRange.start_date;
        end_date = monthRange.end_date;
      }
      const data = {
        user_id: rep_code,
        group_code: Role.ABM,
        period,
        month,
        year,
        start_date,
        end_date,
      };
      if (selectedSpeciality) {
        data.spec_code = selectedSpeciality.spec_code;
      }

      const aggregatedFilter = {
        user_id: rep_code,
        group_code: Role.ABM,
        period,
        month,
        year,
        start_date,
        end_date,
      };
      if (boSelectedSpeciality) {
        aggregatedFilter.spec_code = boSelectedSpeciality.spec_code;
      }
      if (selectedBo) {
        aggregatedFilter.selected_bo_code = selectedBo.rep_code;
      }

      this.props.loadMyPerformanceAbmSales(data);
      this.props.loadMyPerformanceAbmEfforts(data);
      this.props.loadMyPerformanceAbmAggregatedEfforts(data);
      this.props.loadMyPerformanceAbmDetailing({
        filter: data,
        aggregatedFilter
      });
    }

    async changeQuery(query) {
      switch (query) {
        case 'mtd':
        case 'qtd':
        case 'ytd':
          await this.setState({
            period: query,
            filterType: 'period',
          });
          break;
        default:
          await this.setState({
            year: parseInt(query.split('-')[0]),
            month: parseInt(query.split('-')[1]),
            filterType: 'range',
          });
      }
      this.loadData();
    }

    goToMcrCoverage() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceMcrCoverage', {
        user, month, year, period, date_range
      });
    }

    goToJccCompliance() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceJccCompliance', {
        user, month, year, period, date_range
      });
    }

    goToJfwBoList() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceJfwBoList', {
        user, month, year, period, date_range
      });
    }

    goToMcrCoverageBOList() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceMcrBoList', {
        user, month, year, period, date_range
      });
    }

    goToGspBOList() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceGspComplianceBoList', {
        user, month, year, period, date_range
      });
    }

    goToRcpaBOList() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceRcpaBoList', {
        user, month, year, period, date_range
      });
    }

    goToCallAvgBOList() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceCallAvgBoList', {
        user, month, year, period, date_range
      });
    }

    goToPrimarySales() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      const { user_type } = user;
      if (user_type === Role.ABM) {
        this.props.navigation.navigate('MyPerformanceAbmPrimarySales', {
          user, month, year, period, date_range
        });
      } else if (user_type === Role.RBM) {
        this.props.navigation.navigate('MyPerformanceRbmPrimarySales', {
          user, month, year, period, date_range
        });
      }
    }

    goToSecondarySales() {
      const date_range = this.getSecondaryDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      const { user_type } = user;
      if (user_type === Role.ABM) {
        this.props.navigation.navigate('MyPerformanceAbmSecondarySales', {
          user, month, year, period, date_range
        });
      } else if (user_type === Role.RBM) {
        this.props.navigation.navigate('MyPerformanceRbmSecondarySales', {
          user, month, year, period, date_range
        });
      }
    }

    getDateRange() {
      return this.props.myPerformanceAbm.sales.primary_sales.date_range;
    }

    getSecondaryDateRange() {
      return this.props.myPerformanceAbm.sales.secondary_sales.date_range;
    }

    goToPcpm() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      const { user_type } = user;

      if (user_type === Role.ABM) {
        this.props.navigation.navigate('MyPerformanceAbmPcpm', {
          user, month, year, period, date_range
        });
      } else if (user_type === Role.RBM) {
        this.props.navigation.navigate('MyPerformanceRbmPcpm', {
          user, month, year, period, date_range
        });
      }
    }

    loadSalesTrend() {
      this.setState({ showSalesTrend: true });
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { month, year, period } = this.state;
      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year
      };
      this.props.loadMyPerformanceSalesTrends(data);
    }

    hideSalesTrend() {
      this.setState({ showSalesTrend: false });
    }

    setSpeciality = async (selectedSpeciality) => {
      this.setState({ selectedSpeciality });
      this.loadData();
    };

    setBoSpeciality = async (boSelectedSpeciality) => {
      this.setState({ boSelectedSpeciality });
      this.loadData();
    };

    setSelectedBo = async (selectedBo) => {
      this.setState({ selectedBo });
      this.loadData();
    };

    render() {
      const {
        effortsLoading, efforts, salesLoading, sales, aggregatedEfforts, aggregatedEffortsLoading
      } = this.props.myPerformanceAbm;
      const { myPerformanceClm } = this.props;
      const loading = effortsLoading || salesLoading || aggregatedEffortsLoading || myPerformanceClm.loading;
      const goToMcrCoverage = this.goToMcrCoverage.bind(this);
      const goToJccCompliance = this.goToJccCompliance.bind(this);
      const goToJfwBoList = this.goToJfwBoList.bind(this);
      const goToMcrCoverageBOList = this.goToMcrCoverageBOList.bind(this);
      const goToGspBOList = this.goToGspBOList.bind(this);
      const goToRcpaBOList = this.goToRcpaBOList.bind(this);
      const goToCallAvgBOList = this.goToCallAvgBOList.bind(this);
      const goToPrimarySales = this.goToPrimarySales.bind(this);
      const goToSecondarySales = this.goToSecondarySales.bind(this);
      const getDateRange = this.getDateRange.bind(this);
      const getSecondaryDateRange = this.getSecondaryDateRange.bind(this);
      const goToPcpm = this.goToPcpm.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const loadSalesTrend = this.loadSalesTrend.bind(this);
      const hideSalesTrend = this.hideSalesTrend.bind(this);
      const {
        showSalesTrend, period, month, year, isVisibleMonthSelectModal, specialities, selectedSpeciality,
        boSelectedSpeciality, selectedBo, bos, isBiologics
      } = this.state;
      const salesTrend = this.props.myPerformanceSalesTrend;
      const showMonthSelectModal = this.showMonthSelectModal.bind(this);
      const hideMonthSelectModal = this.hideMonthSelectModal.bind(this);

      return (
        <AbmContentComponent
          loading={loading}
          efforts={efforts}
          sales={sales}
          aggregatedEfforts={aggregatedEfforts}
          goToMcrCoverage={goToMcrCoverage}
          goToJccCompliance={goToJccCompliance}
          goToJfwBoList={goToJfwBoList}
          goToMcrCoverageBOList={goToMcrCoverageBOList}
          goToGspBOList={goToGspBOList}
          goToRcpaBOList={goToRcpaBOList}
          goToCallAvgBOList={goToCallAvgBOList}
          goToPrimarySales={goToPrimarySales}
          goToSecondarySales={goToSecondarySales}
          getDateRange={getDateRange}
          getSecondaryDateRange={getSecondaryDateRange}
          goToPcpm={goToPcpm}
          changeQuery={changeQuery}
          loadSalesTrend={loadSalesTrend}
          showSalesTrend={showSalesTrend}
          hideSalesTrend={hideSalesTrend}
          salesTrend={salesTrend}
          period={period}
          showMonthSelectModal={showMonthSelectModal}
          hideMonthSelectModal={hideMonthSelectModal}
          month={month}
          year={year}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
          isVisibleMonthSelectModal={isVisibleMonthSelectModal}
          specialities={specialities}
          selectedSpeciality={selectedSpeciality}
          boSelectedSpeciality={boSelectedSpeciality}
          setSpeciality={this.setSpeciality}
          setBoSpeciality={this.setBoSpeciality}
          bos={bos}
          selectedBo={selectedBo}
          setSelectedBo={this.setSelectedBo}
          myEffort={myPerformanceClm.myEffort}
          myBrandEffort={myPerformanceClm.myBrandEffort}
          detailingAggregatedEffort={myPerformanceClm.aggregatedEffort}
          detailingAggregatedBrandEffort={myPerformanceClm.aggregatedBrandEffort}
          effortSummary={myPerformanceClm.effortSummary}
          isBiologics={isBiologics}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceAbm: state.myPerformanceAbm,
  myPerformanceSalesTrend: state.myPerformanceSalesTrend,
  myPerformanceClm: state.myPerformanceClm,
});

export default connect(
  mapStateToProps,
  {
    loadMyPerformanceAbmSales,
    loadMyPerformanceAbmEfforts,
    loadMyPerformanceAbmAggregatedEfforts,
    loadMyPerformanceSalesTrends,
    loadMyPerformanceAbmDetailing
  }
)(MyPerformanceAbmContainer);
