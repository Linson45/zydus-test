import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  loadMyPerformanceBoEfforts,
  loadMyPerformanceBoSales,
  loadMyPerformanceDetailing,
  loadMyPerformanceSalesTrends
} from '../../../actions';
import { Role } from '../../../util/Constants';
import {
  getCurrentMonth, getCurrentYear, getMonthRange, getPeriodDateRange
} from '../../../util/dateTimeUtil';
import BoContentComponent from '../../../components/my_performance/BoContentComponent';
import { getSpecialities } from '../../../local-storage/helper/detailing';
import Adapter from '../../../util/Adapter';

class MyPerformanceBoContainer extends React.Component {
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
      filterType: 'period',
      isBiologics: false,
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

    async componentDidMount() {
      this.loadData();
      const isBiologics = await Adapter.isBiologics();
      const specialities = await getSpecialities();
      this.setState({ specialities, isBiologics });
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
        month, year, period, selectedSpeciality, filterType
      } = this.state;
      let { start_date, end_date } = getPeriodDateRange(period);
      if (filterType === 'range') {
        const monthRange = getMonthRange(month, year);
        start_date = monthRange.start_date;
        end_date = monthRange.end_date;
      }
      const data = {
        user_id: rep_code,
        group_code: Role.BO,
        period,
        month,
        year,
        start_date,
        end_date,
      };
      if (selectedSpeciality) {
        data.spec_code = selectedSpeciality.spec_code;
      }

      this.props.loadMyPerformanceBoEfforts(data);
      this.props.loadMyPerformanceBoSales(data);
      this.props.loadMyPerformanceDetailing({ ...data, metrics_type: 'individual' });
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
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceMcrCoverage', {
        user, month, year, period
      });
    }

    goToGspCompliance() {
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceGspCompliance', {
        user, month, year, period
      });
    }

    goToRcpa() {
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceRcpa', {
        user, month, year, period
      });
    }

    goToPrimarySales() {
      const date_range = this.getDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceBrandWisePrimarySales', {
        user, month, year, period, date_range
      });
    }

    goToSecondarySales() {
      const date_range = this.getSecondaryDateRange();
      const { user } = this.props.navigation.state.params;
      const { month, year, period } = this.state;
      this.props.navigation.navigate('MyPerformanceBrandWiseSecondarySales', {
        user, month, year, period, date_range
      });
    }

    getDateRange() {
      return this.props.myPerformanceBO.sales.primary_sales.date_range;
    }

    getSecondaryDateRange() {
      return this.props.myPerformanceBO.sales.secondary_sales.date_range;
    }

    loadSalesTrend() {
      this.setState({ showSalesTrend: true });
      const { rep_code } = this.props.navigation.state.params.user;
      const { month, year, period } = this.state;
      const data = {
        user_id: rep_code,
        group_code: Role.BO,
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

    render() {
      const {
        showSalesTrend, period, month, year, isVisibleMonthSelectModal, specialities,
        selectedSpeciality, isBiologics
      } = this.state;
      const {
        effortsLoading, efforts, salesLoading, sales
      } = this.props.myPerformanceBO;
      const salesTrend = this.props.myPerformanceSalesTrend;
      const { myPerformanceClm } = this.props;
      const loading = effortsLoading || salesLoading || myPerformanceClm.loading;
      const goToMcrCoverage = this.goToMcrCoverage.bind(this);
      const goToGspCompliance = this.goToGspCompliance.bind(this);
      const goToRcpa = this.goToRcpa.bind(this);
      const goToPrimarySales = this.goToPrimarySales.bind(this);
      const goToSecondarySales = this.goToSecondarySales.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const loadSalesTrend = this.loadSalesTrend.bind(this);
      const hideSalesTrend = this.hideSalesTrend.bind(this);
      const showMonthSelectModal = this.showMonthSelectModal.bind(this);
      const hideMonthSelectModal = this.hideMonthSelectModal.bind(this);

      return (
        <BoContentComponent
          loading={loading}
          period={period}
          changeQuery={changeQuery}
          showMonthSelectModal={showMonthSelectModal}
          hideMonthSelectModal={hideMonthSelectModal}
          month={month}
          year={year}
          isVisibleMonthSelectModal={isVisibleMonthSelectModal}
          sales={sales}
          efforts={efforts}
          goToPrimarySales={goToPrimarySales}
          goToSecondarySales={goToSecondarySales}
          goToGspCompliance={goToGspCompliance}
          goToRcpa={goToRcpa}
          goToMcrCoverage={goToMcrCoverage}
          specialities={specialities}
          selectedSpeciality={selectedSpeciality}
          setSpeciality={this.setSpeciality}
          showSalesTrend={showSalesTrend}
          hideSalesTrend={hideSalesTrend}
          loadSalesTrend={loadSalesTrend}
          salesTrend={salesTrend}
          myEffort={myPerformanceClm.myEffort}
          myBrandEffort={myPerformanceClm.myBrandEffort}
          effortSummary={myPerformanceClm.effortSummary}
          isBiologics={isBiologics}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceBO: state.myPerformanceBO,
  myPerformanceSalesTrend: state.myPerformanceSalesTrend,
  myPerformanceClm: state.myPerformanceClm,
});

export default connect(
  mapStateToProps,
  {
    loadMyPerformanceBoEfforts, loadMyPerformanceBoSales, loadMyPerformanceSalesTrends, loadMyPerformanceDetailing
  }
)(MyPerformanceBoContainer);
