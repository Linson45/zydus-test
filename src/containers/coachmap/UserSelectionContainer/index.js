import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {
  loadFilterDivisions,
  loadFilterRbms,
  loadFilterRegions,
  myPerformanceResetEmployees,
} from '../../../actions';
import Adapter from '../../../util/Adapter';
import { Role } from '../../../util/Constants';
import UserSelectionComponent from '../../../components/coachmap/UserSelectionComponent';

class CoachmapUserSelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      div: null,
      region: null,
      rep_code_data: null,
      isInternetConnected: true
    };
  }

  static navigationOptions = {
    title: 'ZRAH Selection',
  };

  async componentDidMount() {
    const {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
    } = await Adapter.getUser();
    const data = {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
    };

    data.request_type = 'DIV';
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected }, () => {
          if (isConnected) {
            this.props.loadFilterDivisions(data);
            this.props.myPerformanceResetEmployees();
          }
        });
      });
  }

  onRefresh = async () => {
    const {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
    } = await Adapter.getUser();
    const data = {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
    };

    data.request_type = 'DIV';
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected }, () => {
          if (isConnected) {
            this.props.loadFilterDivisions(data);
            this.props.myPerformanceResetEmployees();
          }
        });
      });
  }

  async selectDivision(div) {
    const {
      user_type,
      rep_code,
      zone_code,
      region_code,
    } = await Adapter.getUser();
    const { company_code, div_id } = div;
    const body = {
      user_type,
      rep_code,
      sbu_code: div_id,
      company_code,
      zone_code,
      region_code,
      request_type: 'RGN',
    };
    this.setState({ div });
    this.props.myPerformanceResetEmployees();
    this.props.loadFilterRegions(body);
  }

  async selectRegion(region) {
    this.setState({ region });
    this.loadEmployees(region);
  }

  async loadEmployees(region) {
    const { div } = this.state;
    if (div && region) {
      const {
        user_type, zone_code, user_name
      } = await Adapter.getUser();
      const { company_code } = div;

      const body = {
        user_type,
        rep_code: this.state.rep_code_data,
        sbu_code: region.sbu_code,
        company_code,
        zone_code,
        region_code: region.reg_id,
        request_type: 'USR',

      };
      axios({
        method: 'POST',
        url: 'https://mobility.zydusfrontline.com/api/filterdata',
        data: body,
      }).then((resultAxios) => {
        console.log(body);
        console.log('axios', resultAxios.data);
        const user = {
          rbm_id: resultAxios.data.data[0].rbm_id,
          company_code,
          region_code: region.reg_id,
          sbu_code: region.sbu_code,
          zone_code: resultAxios.data.data[0].zone_code,
          user_type,
          user_name,
        };

        this.goToCoachmap(user);
      });
      //    this.props.loadFilterRbms(body);
    }
  }

  async goToCoachmap(data) {
    const {
      company_code,
      region_code,
      sbu_code,
      rbm_id,
      zone_code,
      user_name,
      user_type
    } = data;
    const user = {
      rep_code: rbm_id,
      user_name,
      company_code,
      region_code,
      sbu_code,
      zone_code,
      user_type: Role.RBM,
      user_title: user_type
    };
    this.props.navigation.navigate('CoachMapRbmCoachmap', { user });
  }

  render() {
    const { loading, data } = this.props.divisions;
    const { regions } = this.props;
    const employees = this.props.employees.data;

    const selectDivision = this.selectDivision.bind(this);
    const selectRegion = this.selectRegion.bind(this);
    const roles = [Role.BO, Role.ABM, Role.RBM, Role.ZBM];
    const goToCoachmap = this.goToCoachmap.bind(this);
    const hoverLoading = regions.loading;
    const { region } = this.state;

    return (
      <UserSelectionComponent
        hoverLoading={hoverLoading}
        loading={loading}
        divisions={data}
        employees={employees}
        selectDivision={selectDivision}
        selectRegion={selectRegion}
        roles={roles}
        goToCoachmap={goToCoachmap}
        regions={regions.data}
        region={region}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  divisions: state.filterDivisions,
  employees: state.filterRbms,
  regions: state.filterRegions,
});

export default connect(
  mapStateToProps,
  {
    loadFilterDivisions,
    loadFilterRbms,
    myPerformanceResetEmployees,
    loadFilterRegions,
  },
)(CoachmapUserSelectionContainer);
