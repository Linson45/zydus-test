import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadTourPlanRoutes, submitDraft } from '../../../actions';
import Adapter from '../../../util/Adapter';
import AbmAddComponent from '../../../components/tourplan/AbmAddComponent';

class TourplanAbmAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isRouteModalOpen: false,
      isRbmCommentOpen: false,
      selectedRoute: null,
      date: null,
      can_edit: false,
      item: null,
      bo_names: [],
      bo_codes: [],
      isInternetConnected: true,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.firstLoad();
        }
      });
    });
  }

  onRefresh = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.firstLoad();
        }
      });
    });
  };

  async firstLoad() {
    const { item, can_edit } = this.props.navigation.state.params;
    const {
      date, route, btp_code, bo_names, bo_codes, abm_comment
    } = item;
    await this.setState({
      date,
      comment: abm_comment || '',
      selectedRoute: {
        route,
        btp_code,
      },
      item,
      bo_names,
      bo_codes,
      can_edit,
    });
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this),
    );
  }

  async onFocus() {
    const items = await Adapter.get('TP_BO_SELECTED');
    try {
      if (Array.isArray(items)) {
        const bo_codes = [];
        const bo_names = [];
        for (const bo of items) {
          bo_codes.push(bo.rep_code);
          bo_names.push(bo.name);
        }
        this.setState({
          bo_names,
          bo_codes,
        });
      }
    } catch (e) {
      console.log(e);
    }
    await Adapter.set('TP_BO_SELECTED', null);
  }

  componentWillUnmount() {
    this.willFocus.remove();
  }

  checkRbmComment() {
    this.setState({
      isRbmCommentOpen: !this.state.isRbmCommentOpen,
    });
  }

  toggleRouteModal() {
    this.setState({
      isRouteModalOpen: !this.state.isRouteModalOpen,
    });
  }

  reset() {
    const { can_edit } = this.state;
    if (can_edit) {
      this.setState({
        comment: '',
      });
    } else {
      this.setState({
        comment: '',
        selectedRoute: null,
        bo_names: [],
        bo_codes: [],
      });
    }
  }

  toggleDoctorListModal() {
    this.setState({
      isDoctorListOpen: !this.state.isDoctorListOpen,
    });
  }

  selectRoute(route) {
    this.setState({
      selectedRoute: route,
    });
  }

  onChangeText(text) {
    this.setState({
      comment: text,
    });
  }

  static navigationOptions = {
    title: 'Add Tour Plan',
    headerRight: null,
  };

  // Open a popup and show loading inside it (Like Sales Trend my performance)
  openRoutes() {
    const { can_edit } = this.state;
    if (can_edit) {
      this.toggleRouteModal();
      const { user, item } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const { date } = item;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date,
      };
      this.props.loadTourPlanRoutes(data);
    }
  }

  gotoAddBo() {
    const { user } = this.props.navigation.state.params;
    const { bo_codes, date } = this.state.item;
    this.props.navigation.navigate('TourplanSelectBo', { user, bo_codes, date });
  }

  async submitComment() {
    const {
      company_code,
      sbu_code,
      rep_code,
      user_type,
    } = this.props.navigation.state.params.user;

    const { btp_code } = this.state.selectedRoute;

    const { date, comment, can_edit } = this.state;

    const month = moment(date, 'DD-MMM-YYYY').format('M');
    const year = moment(date, 'DD-MMM-YYYY').format('YYYY');

    if (this.state.bo_codes === undefined && btp_code && can_edit) {
      const data = {
        company_code,
        sbu_code,
        rep_code,
        btp_code,
        visit_date: date,
        month,
        year,
        user_type,
        remark: comment || null,
      };
      this.props.submitDraft(data);
    } else if (btp_code && can_edit) {
      const jfw_list = [];
      for (const bo_code of this.state.bo_codes) {
        jfw_list.push({
          bo_code,
        });
      }

      const data = {
        company_code,
        sbu_code,
        rep_code,
        btp_code,
        visit_date: date,
        month,
        year,
        user_type,
        remark: comment || null,
        jfw_list,
      };
      this.props.submitDraft(data);
    }
  }

  render() {
    const {
      isRouteModalOpen,
      isDoctorListOpen,
      selectedRoute,
      comment,
      can_edit,
      date,
      item,
      isRbmCommentOpen,
      bo_names,
    } = this.state;
    const openRoutes = this.openRoutes.bind(this);
    const gotoAddBo = this.gotoAddBo.bind(this);
    const toggleRouteModal = this.toggleRouteModal.bind(this);
    const toggleDoctorListModal = this.toggleDoctorListModal.bind(this);
    const selectRoute = this.selectRoute.bind(this);
    const onChangeText = this.onChangeText.bind(this);
    const checkRbmComment = this.checkRbmComment.bind(this);
    const submitComment = this.submitComment.bind(this);
    const reset = this.reset.bind(this);
    const { tourplanRoutes, tourplanDraft } = this.props;
    return (
      <AbmAddComponent
        data={item}
        item={item}
        bo_names={bo_names}
        loading={tourplanDraft.loading}
        checkRbmComment={checkRbmComment}
        isRbmCommentOpen={isRbmCommentOpen}
        tourplanRoutes={tourplanRoutes}
        isRouteModalOpen={isRouteModalOpen}
        isDoctorListOpen={isDoctorListOpen}
        selectedRoute={selectedRoute}
        can_edit={can_edit}
        date={date}
        comment={comment}
        openRoutes={openRoutes}
        gotoAddBo={gotoAddBo}
        toggleRouteModal={toggleRouteModal}
        toggleDoctorListModal={toggleDoctorListModal}
        selectRoute={selectRoute}
        onChangeText={onChangeText}
        submitComment={submitComment}
        reset={reset}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tourplanRoutes: state.tourplanRoutes,
  tourplanDraft: state.tourplanDraft,
});

export default connect(
  mapStateToProps,
  { loadTourPlanRoutes, submitDraft },
)(TourplanAbmAddContainer);
