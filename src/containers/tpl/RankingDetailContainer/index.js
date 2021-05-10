import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadDivisions, loadSbus, loadTplRankingDetail } from '../../../actions';
import TplYourAllIndiaRank from '../../../components/tpl/TplYourAllIndiaRank';
import { getCurrentMonth, getCurrentYear } from '../../../util/dateTimeUtil';

class RankingDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      rank_type: null,
      sbu_code: null,
      sbu_grp_code: null,
      user_type: null,
      month: getCurrentMonth(),
      year: getCurrentYear(),
      isInternetConnected: true
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { rank_type } = navigation.state.params;
      if (rank_type === 'DIV') return { title: 'Your Division Rank' };
      if (rank_type === 'SBU') return { title: 'Your Cluster Rank' };
      if (rank_type === 'IND') return { title: 'Your All India Rank' };
      return { title: '' };
    };

    changeTime(data) {
      const { month, year } = data;
      this.setState({
        month,
        year
      });
    }

    changeSbuGroupCode(sbu_grp_code) {
      this.setState({
        sbu_grp_code
      });
    }

    changeDivision(data) {
      const { code } = data;
      this.setState({
        sbu_code: code
      });
    }

    changeUserType(user_type) {
      this.setState({
        user_type
      });
    }

    async componentDidMount() {
      await this.reloadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    onRefresh = async () => {
      await this.reloadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    async reloadData() {
      const {
        user, rank_type, month, year
      } = this.props.navigation.state.params;
      const {
        sbu_code, user_type, rep_code, company_code
      } = user;
      await this.setState({
        rank_type,
        sbu_code,
        user_type,
        month,
        year,
        rep_code,
        company_code,
        sbu_grp_code: null
      });
    }

    async loadData() {
      const {
        rank_type, sbu_code, user_type, month, year, company_code, rep_code
      } = this.state;
      const data = {
        rank_type, sbu_code, user_type, month, year, rep_code, company_code
      };
      const divData = { sbu_code, rep_code };
      if (rank_type === 'IND') data.sbu_code = '';

      this.props.loadTplRankingDetail(data);
      this.props.loadDivisions(divData);
      this.props.loadSbus(divData);
    }

    getRankSubTitle() {
      const { rank_type } = this.props.navigation.state.params;
      if (rank_type === 'DIV') return 'Division Rank';
      if (rank_type === 'SBU') return 'Cluster Rank';
      if (rank_type === 'IND') return 'All India Rank';
      return '';
    }

    openModal() {
      this.setState({
        isVisible: true
      });
    }

    closeModal() {
      this.setState({
        isVisible: false
      });
    }

    render() {
      const rankSubTitle = this.getRankSubTitle();
      const { loading, data } = this.props.tplRankingList;
      const {
        month, year, sbu_code, user_type, rank_type, sbu_grp_code
      } = this.state;
      const divisions = this.props.divisions.data;
      const sbus = this.props.sbus.data;
      const openModal = this.openModal.bind(this);
      const closeModal = this.closeModal.bind(this);
      const changeTime = this.changeTime.bind(this);
      const changeDivision = this.changeDivision.bind(this);
      const loadData = this.loadData.bind(this);
      const reloadData = this.reloadData.bind(this);
      const changeSbuGroupCode = this.changeSbuGroupCode.bind(this);
      const changeUserType = this.changeUserType.bind(this);

      return (
        <TplYourAllIndiaRank
          data={data}
          sbus={sbus}
          rank_type={rank_type}
          loading={loading}
          showModal={this.state.isVisible}
          rankSubTitle={rankSubTitle}
          openModal={openModal}
          reloadData={reloadData}
          sbu_grp_code={sbu_grp_code}
          loadData={loadData}
          changeSbuGroupCode={changeSbuGroupCode}
          month={month}
          year={year}
          sbu_code={sbu_code}
          user_type={user_type}
          divisions={divisions}
          closeModal={closeModal}
          changeTime={changeTime}
          changeDivision={changeDivision}
          changeUserType={changeUserType}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tplRankingList: state.tplRankingList,
  divisions: state.divisions,
  sbus: state.sbus
});

export default connect(
  mapStateToProps,
  { loadTplRankingDetail, loadDivisions, loadSbus }
)(RankingDetailContainer);
