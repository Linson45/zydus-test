import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadEmployees, loadFilterDivisions, myPerformanceResetEmployees } from '../../../actions';
import Adapter from '../../../util/Adapter';
import TplUserSelectionComponent from '../../../components/tpl/UserSelectionContainer';
import { Role } from '../../../util/Constants';

class TplUserSelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      div: null,
      role: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Premier League Selection',
    };

    async componentDidMount() {
      const {
        company_code, sbu_code, user_type, rep_code, zone_code, region_code
      } = await Adapter.getUser();
      const data = {
        company_code, sbu_code, user_type, rep_code, zone_code, region_code
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
        company_code, sbu_code, user_type, rep_code, zone_code, region_code
      } = await Adapter.getUser();
      const data = {
        company_code, sbu_code, user_type, rep_code, zone_code, region_code
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
      this.setState({ div });
      this.props.myPerformanceResetEmployees();
      this.loadEmployees();
    }

    async selectRole(role) {
      this.setState({ role });
      this.props.myPerformanceResetEmployees();
      this.loadEmployees();
    }

    async loadEmployees() {
      const { div, role } = this.state;
      if (div && role) {
        const query = {
          sbu_code: div.div_id,
          user_type: role
        };
        this.props.loadEmployees(query);
      }
    }

    goToTpl(user) {
      // const user = this.props.employees.data[0];
      // this.props.navigation.navigate('Tpl', {user});
      this.props.navigation.navigate('Tpl', { user });
    }

    render() {
      const { loading, data } = this.props.divisions;
      const employees = this.props.employees.data;
      const selectDivision = this.selectDivision.bind(this);
      const selectRole = this.selectRole.bind(this);
      const roles = [Role.BO, Role.ABM, Role.RBM, Role.ZBM];
      const goToTpl = this.goToTpl.bind(this);

      return (
        <Container>
          <TplUserSelectionComponent
            loading={loading}
            divisions={data}
            employees={employees}
            selectDivision={selectDivision}
            selectRole={selectRole}
            roles={roles}
            goToTpl={goToTpl}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  divisions: state.filterDivisions,
  employees: state.employees
});

export default connect(
  mapStateToProps,
  { loadFilterDivisions, loadEmployees, myPerformanceResetEmployees }
)(TplUserSelectionContainer);
