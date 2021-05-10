import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadTourPlanRoutes, submitDraft } from '../../../actions';
import BoAddComponent from '../../../components/tourplan/BoAddComponent';
import { multisort } from '../../../util/SortArray';
import Adapter from '../../../util/Adapter';

class TourplanBoAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isRouteModalOpen: false,
      isDoctorListOpen: false,
      selectedRoute: null,
      date: null,
      bo_data: [],
      can_edit: false,
      item: {},
      isInternetConnected: true
    };
  }

  componentDidMount() {
    const { item, can_edit } = this.props.navigation.state.params;
    const { date, bo_data } = item;
    multisort(bo_data, ['doc_name'], ['ASC']);
    const comment = bo_data && bo_data[0] ? bo_data[0].bo_comment : '';
    const selectedRoute = bo_data && bo_data[0] ? bo_data[0] : null;
    this.setState({
      date,
      bo_data,
      can_edit,
      comment,
      selectedRoute,
      item
    });
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this)
    );
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected });
      });
  }

    onRefresh = () => {
      const { item, can_edit } = this.props.navigation.state.params;
      const { date, bo_data } = item;
      multisort(bo_data, ['doc_name'], ['ASC']);
      const comment = bo_data && bo_data[0] ? bo_data[0].bo_comment : '';
      const selectedRoute = bo_data && bo_data[0] ? bo_data[0] : null;
      this.setState({
        date,
        bo_data,
        can_edit,
        comment,
        selectedRoute,
        item
      });
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected });
        });
    }

    async onFocus() {
      const bo_data = await Adapter.get('TP_DR_SELECTED');
      if (Array.isArray(bo_data)) {
        multisort(bo_data, ['doc_name'], ['ASC']);
        this.setState({
          bo_data
        });
      }
      await Adapter.set('TP_DR_SELECTED', null);
    }

    componentWillUnmount() {
      this.willFocus.remove();
    }

    static navigationOptions = {
      title: 'Add Daily Tour Plan',
      headerRight: null
    };

    toggleRouteModal() {
      this.setState({
        isRouteModalOpen: !this.state.isRouteModalOpen
      });
    }

    reset() {
      const {
        can_edit
      } = this.state;
      if (can_edit) {
        this.setState({
          comment: '',
          selectedRoute: null,
          bo_data: []
        });
      } else {
        this.setState({
          comment: '',
          selectedRoute: null,
          bo_data: []
        });
      }
    }

    toggleDoctorListModal() {
      this.setState({
        isDoctorListOpen: !this.state.isDoctorListOpen
      });
    }

    selectRoute(route) {
      this.setState({
        selectedRoute: route
      });
    }

    openRoutes() {
      const {
        can_edit
      } = this.state;
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
          date
        };
        this.props.loadTourPlanRoutes(data);
      }
    }

    onChangeText(text) {
      this.setState({
        comment: text
      });
    }

    gotoSuggestedDoctors() {
      const { user } = this.props.navigation.state.params;
      const { bo_data, date } = this.state;
      this.props.navigation.navigate('TourplanBoSuggestedDoctors', { user, bo_data, date });
    }

    async submitComment() {
      const {
        company_code,
        sbu_code,
        rep_code,
        user_type
      } = this.props.navigation.state.params.user;

      const {
        date,
        comment,
        can_edit,
        selectedRoute
      } = this.state;

      if (!selectedRoute) {
        return;
      }
      const { btp_code } = selectedRoute;
      const month = moment(date, 'DD-MMM-YYYY').format('M');
      const year = moment(date, 'DD-MMM-YYYY').format('YYYY');

      if (btp_code && can_edit) {
        const doc_list = [];
        for (const doc of this.state.bo_data) {
          doc_list.push({
            doc_code: doc.doc_code,
            mcr_no: doc.mcr_no
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
          doc_list
        };
        this.props.submitDraft(data);
      }
    }

    render() {
      const {
        isRouteModalOpen, isDoctorListOpen, selectedRoute, comment, can_edit, bo_data, date, item
      } = this.state;
      const openRoutes = this.openRoutes.bind(this);
      const gotoSuggestedDoctors = this.gotoSuggestedDoctors.bind(this);
      const toggleRouteModal = this.toggleRouteModal.bind(this);
      const toggleDoctorListModal = this.toggleDoctorListModal.bind(this);
      const selectRoute = this.selectRoute.bind(this);
      const onChangeText = this.onChangeText.bind(this);
      const submitComment = this.submitComment.bind(this);
      const reset = this.reset.bind(this);
      const { tourplanRoutes, tourplanDraft } = this.props;
      return (
        <BoAddComponent
          date={date}
          item={item}
          bo_data={bo_data}
          comment={comment}
          reset={reset}
          onChangeText={onChangeText}
          selectedRoute={selectedRoute}
          selectRoute={selectRoute}
          isRouteModalOpen={isRouteModalOpen}
          isDoctorListOpen={isDoctorListOpen}
          tourplanRoutes={tourplanRoutes}
          toggleRouteModal={toggleRouteModal}
          toggleDoctorListModal={toggleDoctorListModal}
          openRoutes={openRoutes}
          submitComment={submitComment}
          gotoSuggestedDoctors={gotoSuggestedDoctors}
          can_edit={can_edit}
          loading={tourplanDraft.loading}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanRoutes: state.tourplanRoutes,
  tourplanDraft: state.tourplanDraft
});

export default connect(
  mapStateToProps,
  { loadTourPlanRoutes, submitDraft }
)(TourplanBoAddContainer);
