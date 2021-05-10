import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import {
  loadMyPerformanceRegions,
  loadMyPerformanceSalesTrends,
  loadMyPerformanceSbus,
  loadMyPerformanceZbmAggregatedEfforts,
  loadMyPerformanceZbmSales,
  myPerformanceResetRegions
} from '../../../actions';
import { Role } from '../../../util/Constants';
import { getCurrentMonth, getCurrentYear } from '../../../util/dateTimeUtil';
import ZbmContentComponent from '../../../components/my_performance/ZbmContentComponent';

class MyPerformanceZbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      period: 'mtd',
      showSalesTrend: false,
      isVisibleMonthSelectModal: false,
      isInternetConnected: true
    };
  }

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

    static navigationOptions = {
      title: 'My Performance',
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

    async changeQuery(query) {
      switch (query) {
        case 'mtd':
        case 'qtd':
        case 'ytd':
          await this.setState({
            period: query
          });
          break;
        default:
          await this.setState({
            year: parseInt(query.split('-')[0]),
            month: parseInt(query.split('-')[1]),
          });
      }
      this.loadData();
    }

    loadData() {
      const {
        month, year, period
      } = this.state;
      let { user_type } = this.state;
      const { user } = this.props.navigation.state.params;
      if (!user_type) user_type = user.user_type;

      const data = {
        user_id: user.rep_code,
        group_code: user_type,
        period,
        month,
        year
      };
      this.props.loadMyPerformanceZbmSales(data);
      this.props.loadMyPerformanceZbmAggregatedEfforts(data);
    }

    goToPrimarySales() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceZbmPrimarySales', {
        user, month, year, period, date_range
      });
    }

    goToSecondarySales() {
      const date_range = this.getSecondaryDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceZbmSecondarySales', {
        user, month, year, period, date_range
      });
    }

    goToPcpm() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceZbmPcpm', {
        user, month, year, period, date_range
      });
    }

    getDateRange() {
      return this.props.myPerformanceZbm.sales.primary_sales.date_range;
    }

    getSecondaryDateRange() {
      return this.props.myPerformanceZbm.sales.secondary_sales.date_range;
    }

    loadSalesTrend() {
      this.setState({ showSalesTrend: true });
      const { rep_code } = this.props.navigation.state.params.user;
      const { month, year, period } = this.state;
      const data = {
        user_id: rep_code,
        group_code: Role.ZBM,
        period,
        month,
        year
      };
      this.props.loadMyPerformanceSalesTrends(data);
    }

    hideSalesTrend() {
      this.setState({ showSalesTrend: false });
    }

    loadSbus() {
      this.props.myPerformanceResetRegions();
      this.setState({ showRegionDialog: true, sbu: null, region: null });
      const { rep_code } = this.props.navigation.state.params.user;

      this.props.loadMyPerformanceSbus(rep_code);
    }

    hideSbus() {
      this.setState({ showRegionDialog: false });
    }

    selectSbu(sbu) {
      this.setState({ sbu });
      const { sbu_code, company_code } = sbu;
      this.props.loadMyPerformanceRegions(company_code, sbu_code);
    }

    goToRbmContainer(user) {
      this.setState({ showRegionDialog: false });
      user.user_type = Role.RBM;
      this.props.navigation.navigate('MyPerformanceAbm', { user });
    }

    selectRegion(region) {
      this.setState({ region });
    }

    render() {
      const {
        salesLoading, sales, aggregatedEfforts, aggregatedEffortsLoading
      } = this.props.myPerformanceZbm;
      const loading = salesLoading || aggregatedEffortsLoading;
      const goToPrimarySales = this.goToPrimarySales.bind(this);
      const goToSecondarySales = this.goToSecondarySales.bind(this);
      const goToPcpm = this.goToPcpm.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const loadSalesTrend = this.loadSalesTrend.bind(this);
      const hideSalesTrend = this.hideSalesTrend.bind(this);
      const { showSalesTrend, showRegionDialog } = this.state;
      const salesTrend = this.props.myPerformanceSalesTrend;
      const sbus = this.props.myPerformanceSbus;
      const regions = this.props.myPerformanceRegions;
      const loadSbus = this.loadSbus.bind(this);
      const hideSbus = this.hideSbus.bind(this);
      const selectSbu = this.selectSbu.bind(this);
      const goToRbmContainer = this.goToRbmContainer.bind(this);
      const selectRegion = this.selectRegion.bind(this);
      const {
        region, period, month, year, isVisibleMonthSelectModal
      } = this.state;
      const showMonthSelectModal = this.showMonthSelectModal.bind(this);
      const hideMonthSelectModal = this.hideMonthSelectModal.bind(this);

      return (
        <Container>
          <ZbmContentComponent
            loading={loading}
            sales={sales}
            aggregatedEfforts={aggregatedEfforts}
            goToPrimarySales={goToPrimarySales}
            goToSecondarySales={goToSecondarySales}
            goToPcpm={goToPcpm}
            changeQuery={changeQuery}
            loadSalesTrend={loadSalesTrend}
            showSalesTrend={showSalesTrend}
            hideSalesTrend={hideSalesTrend}
            salesTrend={salesTrend}
            showRegionDialog={showRegionDialog}
            sbus={sbus}
            regions={regions}
            loadSbus={loadSbus}
            hideSbus={hideSbus}
            selectSbu={selectSbu}
            goToRbmContainer={goToRbmContainer}
            region={region}
            selectRegion={selectRegion}
            period={period}
            showMonthSelectModal={showMonthSelectModal}
            hideMonthSelectModal={hideMonthSelectModal}
            month={month}
            year={year}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
            isVisibleMonthSelectModal={isVisibleMonthSelectModal}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceZbm: state.myPerformanceZbm,
  myPerformanceSalesTrend: state.myPerformanceSalesTrend,
  myPerformanceSbus: state.myPerformanceSbus,
  myPerformanceRegions: state.myPerformanceRegions
});

export default connect(
  mapStateToProps,
  {
    loadMyPerformanceZbmSales,
    loadMyPerformanceZbmAggregatedEfforts,
    loadMyPerformanceSalesTrends,
    loadMyPerformanceSbus,
    loadMyPerformanceRegions,
    myPerformanceResetRegions
  }
)(MyPerformanceZbmContainer);
