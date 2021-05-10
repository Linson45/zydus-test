import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, NativeModules } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { loadTplData } from '../../../actions';
import Firebase from '../../../util/Firebase';
import TplComponent from '../../../components/tpl/TplComponent';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';

const { UIManager } = NativeModules;

// eslint-disable-next-line no-unused-expressions
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

class TplContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      showDetails: false,
      showModal: false,
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
      title: 'Premier League',
    };

    _onPress = () => {
      // Animate the update
      LayoutAnimation.spring();
    };

    componentDidMount() {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              Firebase.pushEvent('tpl_non_ho_user_view');
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
              Firebase.pushEvent('tpl_non_ho_user_view');
              this.loadData();
            }
          });
        });
    }

    loadData() {
      const {
        company_code, sbu_code, rep_code, user_type
      } = this.props.navigation.state.params.user;
      const { month, year } = this.state;
      const data = {
        company_code, sbu_code, rep_code, user_type
      };
      data.month = month;
      data.year = year;
      this.props.loadTplData(data);
    }

    openTplWinners() {
      const { user } = this.props.navigation.state.params;
      const { month, year } = this.state;
      this.props.navigation.navigate('TplWinners', { user, month, year });
    }

    openYourScore() {
      const { user } = this.props.navigation.state.params;
      const { month, year } = this.state;
      this.props.navigation.navigate('TplYourScore', { user, month, year });
    }

    openRankingDetail(rank_type) {
      const { user } = this.props.navigation.state.params;
      const { month, year } = this.state;
      this.props.navigation.navigate('TplRankingDetail', {
        user, month, year, rank_type
      });
    }

    showYourScoreDetails = () => {
      this.setState({
        showDetails: !this.state.showDetails
      });
    };

    async selectDate(date) {
      await this.setState({
        year: parseInt(date.split('-')[0]),
        month: parseInt(date.split('-')[1]),
      });
      this.loadData();
    }

    render() {
      const openRankingDetail = this.openRankingDetail.bind(this);
      const showYourScoreDetails = this.showYourScoreDetails.bind(this);
      const openTplWinners = this.openTplWinners.bind(this);
      const openYourScore = this.openYourScore.bind(this);
      const { loading, data } = this.props.tpl;
      const {
        showModal, showDetails, month, year, isVisibleMonthSelectModal
      } = this.state;
      const selectDate = this.selectDate.bind(this);
      const monthString = getFullMonthString(this.state.month);
      const showMonthSelectModal = this.showMonthSelectModal.bind(this);
      const hideMonthSelectModal = this.hideMonthSelectModal.bind(this);
      const { user } = this.props.navigation.state.params;

      return (
        <TplComponent
          data={data}
          loading={loading}
          showModal={showModal}
          showDetails={showDetails}
          showYourScoreDetails={showYourScoreDetails}
          openRankingDetail={openRankingDetail}
          openTplWinners={openTplWinners}
          openYourScore={openYourScore}
          selectDate={selectDate}
          monthString={monthString}
          showMonthSelectModal={showMonthSelectModal}
          hideMonthSelectModal={hideMonthSelectModal}
          month={month}
          year={year}
          user={user}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
          isVisibleMonthSelectModal={isVisibleMonthSelectModal}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tpl: state.tpl
});

export default connect(
  mapStateToProps,
  { loadTplData }
)(TplContainer);
