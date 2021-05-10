import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Alert } from 'react-native';
import { StackActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import {
  loadActionItemEmployees,
  loadFilterDivisions,
  addActionItem,
} from '../../../actions';
import { Role } from '../../../util/Constants';
import Adapter from '../../../util/Adapter';
import AddComponent from '../../../components/action_item/AddComponent';

class ActionItemAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      selected_type: '',
      selected_employee: '',
      problemDesc: '',
      rootCause: '',
      actionPlan: '',
      selected_division: '',
      targetClosureDate: moment().format('DD MMM YYYY'),
      isInternetConnected: true
    };
  }

  static navigationOptions = {
    title: 'Add New Action',
  };

  async componentDidMount() {
    // this.loadData();
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected }, () => {
          if (isConnected) {
            this.loadData();
          }
        });
      });
    const { userData } = this.props.navigation.state.params;
    const { user_type } = userData;

    if (user_type === Role.ABM) {
      this.setState({ types: [Role.BO] });
    } else if (user_type === Role.RBM) {
      this.setState({ types: [Role.BO, Role.ABM] });
    } else if (user_type === Role.ZBM) {
      this.setState({ types: [Role.BO, Role.ABM, Role.RBM] });
    } else {
      this.setState({ types: [Role.BO, Role.ABM, Role.RBM, Role.ZBM] });
    }
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
    const { userData } = this.props.navigation.state.params;
    const { user_type } = userData;

    if (user_type === Role.ABM) {
      this.setState({ types: [Role.BO] });
    } else if (user_type === Role.RBM) {
      this.setState({ types: [Role.BO, Role.ABM] });
    } else if (user_type === Role.ZBM) {
      this.setState({ types: [Role.BO, Role.ABM, Role.RBM] });
    } else {
      this.setState({ types: [Role.BO, Role.ABM, Role.RBM, Role.ZBM] });
    }
  }

  loadData() {
    const {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
    } = this.props.navigation.state.params.userData;
    const data = {
      company_code,
      sbu_code,
      user_type,
      rep_code,
      zone_code,
      region_code,
      request_type: 'DIV',
    };
    this.props.loadFilterDivisions(data);
  }

  selectDivision(div_id) {
    if (div_id) {
      this.props.divisions.data.forEach((division) => {
        if (div_id === division.div_id) this.setState({ selected_division: division });
      });
    }
  }

  changeDate(date) {
    this.setState({
      targetClosureDate: date,
    });
  }

  loadEmployees(selected_type) {
    if (selected_type) {
      this.setState({ selected_type });
      const {
        rep_code,
        sbu_code,
        user_type,
      } = this.props.navigation.state.params.userData;
      const data = {
        rep_code,
        sbu_code,
        group_code: user_type,
        user_type: selected_type,
      };
      const { selected_division } = this.state;
      if (Role.isHOUser(user_type) && selected_division) {
        data.div_id = selected_division.div_id;
      }
      this.props.loadActionItemEmployees(data);
    }
  }

  selectEmployee(rep_code) {
    this.props.actionItemEmployees.data.forEach((employee) => {
      if (rep_code === employee.rep_code) this.setState({ selected_employee: employee });
    });
  }

  onChangeText(key, text) {
    this.setState({
      [key]: text,
    });
  }

  async submit() {
    const user = await Adapter.getUser();
    const {
      targetClosureDate,
      problemDesc,
      rootCause,
      actionPlan,
      selected_employee,
    } = this.state;
    if (!selected_employee) return;

    const data = {
      targetClosureDate,
      problemDesc,
      rootCause,
      actionPlan,
      approvedBy: {
        companyCode: user.company_code,
        repCode: user.rep_code,
        sbuCode: user.sbu_code,
        userType: user.user_type,
        fullName: user.user_name,
      },
      createdBy: {
        companyCode: user.company_code,
        repCode: user.rep_code,
        sbuCode: user.sbu_code,
        userType: user.user_type,
        full_name: user.user_name,
      },
      assignedTo: {
        companyCode: selected_employee.company_code,
        repCode: selected_employee.rep_code,
        sbuCode: selected_employee.sbu_code,
        userType: selected_employee.user_type,
        full_name: selected_employee.name,
      },
    };
    this.props.addActionItem(data).then(() => {
      const { error } = this.props.actionItemAdd;
      if (error) {
        alert('Error Adding Action Item');
        return;
      }
      Alert.alert(
        'Action Item Added',
        'Action Item has been added',
        [
          {
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 1,
              });
              this.props.navigation.dispatch(popAction);
            },
          },
        ],
        { cancelable: false },
      );
    });
  }

  render() {
    const { userData } = this.props.navigation.state.params;
    const divisions = this.props.divisions.data;
    const { loading } = this.props.divisions;
    const { data } = this.props.actionItemEmployees;
    const loadEmployees = this.loadEmployees.bind(this);
    const selectEmployee = this.selectEmployee.bind(this);
    const submit = this.submit.bind(this);
    const onChangeText = this.onChangeText.bind(this);
    const selectDivision = this.selectDivision.bind(this);
    const changeDate = this.changeDate.bind(this);
    const hoverLoading = this.props.actionItemAdd.loading;

    const {
      types,
      selected_type,
      selected_employee,
      problemDesc,
      rootCause,
      actionPlan,
      selected_division,
      targetClosureDate,
    } = this.state;
    return (
      <AddComponent
        hoverLoading={hoverLoading}
        user={userData}
        changeDate={changeDate}
        selected_type={selected_type}
        targetClosureDate={targetClosureDate}
        selected_division={selected_division}
        selected_employee={selected_employee}
        loading={loading}
        divisions={divisions}
        loadEmployees={loadEmployees}
        employees={data}
        types={types}
        selectEmployee={selectEmployee}
        submit={submit}
        onChangeText={onChangeText}
        problemDesc={problemDesc}
        rootCause={rootCause}
        actionPlan={actionPlan}
        selectDivision={selectDivision}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  actionItemEmployees: state.actionItemEmployees,
  divisions: state.filterDivisions,
  actionItemAdd: state.actionItemAdd,
});

export default connect(
  mapStateToProps,
  { loadActionItemEmployees, loadFilterDivisions, addActionItem },
)(ActionItemAddContainer);
