import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoLeaderBoardComponent from '../../../components/rx_tracker/BoLeaderBoardComponent';
import { getBoLeaderBoardList } from '../../../actions';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';

class BoLeaderBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      isVisibleMonthSelectModal: false,
      showDetails: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.data;

    this.props.getBoLeaderBoardList(user);
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

  async selectDate(date) {
    await this.setState({
      year: parseInt(date.split('-')[0]),
      month: parseInt(date.split('-')[1]),
    });
    this.loadData();
  }

  render() {
    const {
      showModal, showDetails, month, year, isVisibleMonthSelectModal
    } = this.state;
    const selectDate = this.selectDate.bind(this);
    const monthString = getFullMonthString(this.state.month);
    const showMonthSelectModal = this.showMonthSelectModal.bind(this);
    const hideMonthSelectModal = this.hideMonthSelectModal.bind(this);
    const { data, loading } = this.props.getBoLeaderBoard;
    return (
      <BoLeaderBoardComponent
        data={data}
        loading={loading}
        showModal={showModal}
        showDetails={showDetails}
        selectDate={selectDate}
        monthString={monthString}
        showMonthSelectModal={showMonthSelectModal}
        hideMonthSelectModal={hideMonthSelectModal}
        month={month}
        year={year}
        isVisibleMonthSelectModal={isVisibleMonthSelectModal}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  getBoLeaderBoard: state.getBoLeaderBoard,
});

export default connect(
  mapStateToProps,
  { getBoLeaderBoardList },
)(BoLeaderBoardContainer);
