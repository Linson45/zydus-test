import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Adapter from '../../../util/Adapter';
import {
  loadFilterDivisionsData,
  loadFilterEmployeeData,
} from '../../../actions';
import HOUserSelectionComponent from '../../../components/action_item/HoUseSelectionComponent';
import { Role } from '../../../util/Constants';

class ActionItemUserSelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      div: null,
      designation: null,
      employees: null,
      isInternetConnected: true
    };
  }

  static navigationOptions = {
    title: 'Action Item',
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
            this.props.loadFilterDivisionsData(data);
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
            this.props.loadFilterDivisionsData(data);
          }
        });
      });
  }

  async selectDivision(div) {
    this.setState({ div });
  }

  async selectDesignation(designation) {
    const { div } = this.state;
    if (div && designation) {
      const { div_id } = div;

      const body = {
        user_type: designation.value,
        sbu_code: div_id,
      };
      this.setState({ designation });
      this.props.loadFilterEmployeeData(body);
    }
  }

  async resetDropdown() {
    this.setState({
      div: null,
      designation: null,
      employees: null,
    });
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
    this.props.loadFilterDivisionsData(data);
  }

  async submitData() {
    if (this.state.div != null) {
      if (this.state.designation != null) {
        if (this.state.employees != null) {
          const { employees } = this.state;

          const { user_type } = employees;
          console.log(user_type);

          if (user_type === Role.BO) {
            this.props.navigation.navigate('ActionItemBo', { employees });
          } else if (user_type === Role.ABM) {
            this.props.navigation.navigate('ActionItemAbm', { employees });
          } else if (user_type === Role.RBM) {
            this.props.navigation.navigate('ActionItemRbm', { employees });
          } else if (user_type === Role.ZBM) {
            this.props.navigation.navigate('ActionItemZbm', { employees });
          } else {
            employees.user_type = Role.HO;
            this.props.navigation.navigate('ActionItemHo', { employees });
          }
        } else {
          Alert.alert('Alert', 'please select Employee');
        }
      } else {
        Alert.alert('Alert', 'please select Designation');
      }
    } else {
      Alert.alert('Alert', 'please select division');
    }
  }

  async openActionItems(employees) {
    this.setState({ employees });
  }

  render() {
    const { loading, data } = this.props.divisions;
    const { employee } = this.props;

    const selectDivision = this.selectDivision.bind(this);
    const selectDesignation = this.selectDesignation.bind(this);
    const openActionItems = this.openActionItems.bind(this);
    const resetDropdown = this.resetDropdown.bind(this);
    const submitData = this.submitData.bind(this);

    const hoverLoading = employee.loading;

    return (
      <HOUserSelectionComponent
        loading={loading}
        hoverLoading={hoverLoading}
        divisions={data}
        selectDivision={selectDivision}
        selectDesignation={selectDesignation}
        employee={employee.data}
        openActionItems={openActionItems}
        resetDropdown={resetDropdown}
        submitData={submitData}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  divisions: state.actionItemUserSelectionDiv,
  employee: state.actionItemUserSelectionEmployee,
});

export default connect(
  mapStateToProps,
  {
    loadFilterDivisionsData,
    loadFilterEmployeeData,
  },
)(ActionItemUserSelectionContainer);
