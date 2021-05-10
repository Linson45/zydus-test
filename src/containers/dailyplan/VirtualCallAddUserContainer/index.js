import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDailyPlanBoAllDoctors, loadTeam, setVirtualDetailingForm } from '../../../actions';
import { getAllFullDataDoctors } from '../../../local-storage/helper/dailyplan';
import VirtualCallAddUserComponent from '../../../components/dailyplan/VirtualCallAddUserComponent';

class VirtualCallAddUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      selectedTeam: {},
      searchQuery: null,
      docList: [],
      userList: [],
    };
  }

    static navigationOptions = {
      title: 'Add participants',
    };

    async componentDidMount() {
      const { team, doctors } = this.props.virtualDetailingForm;
      const selectedTeam = {};
      const selected = {};
      team.forEach((user) => {
        selectedTeam[user.rep_code] = user;
      });
      doctors.forEach((doctor) => {
        selected[doctor.doc_code] = doctor;
      });
      this.setState({ selectedTeam, selected });

      const { user, date } = this.props.navigation.state.params;
      const { rep_code, company_code, sbu_code } = user;
      const localDocs = await getAllFullDataDoctors(rep_code);
      const data = {
        rep_code,
        company_code,
        sbu_code,
        date,
        localDocs,
      };
      this.props.loadDailyPlanBoAllDoctors(data);
      this.props.loadTeam({ rep_code });
    }

    onChange(doc_code, doctor) {
      const { selected } = this.state;
      if (selected) {
        if (selected[doc_code]) {
          delete selected[doc_code];
        } else {
          selected[doc_code] = doctor;
        }
      }
      this.setState({
        selected: selected || {}
      });
    }

    onTeamChange = (rep_code, user) => {
      const { selectedTeam } = this.state;
      if (selectedTeam) {
        if (selectedTeam[rep_code]) {
          delete selectedTeam[rep_code];
        } else {
          selectedTeam[rep_code] = user;
        }
      }
      this.setState({
        selectedTeam: selectedTeam || {}
      });
    };

    async save() {
      const { selected, selectedTeam } = this.state;
      const doctors = Object.keys(selected).map((key) => selected[key]);
      const team = Object.keys(selectedTeam).map((key) => selectedTeam[key]);
      this.props.setVirtualDetailingForm(team, doctors);
      this.props.navigation.goBack();
    }

    searchText(searchQuery) {
      this.setState({ searchQuery });
      const { data } = this.props.dailyPlanBoAllDoctors;
      const { dailyPlanMyTeam } = this.props;
      const searchResults = this.searchArray(searchQuery, data);
      const searchTeamResults = this.searchTeam(searchQuery, dailyPlanMyTeam.data);

      this.setState({
        docList: searchResults,
        userList: searchTeamResults,
      });
    }

    searchArray(searchQuery, data) {
      if (data.length < 1) {
        return [];
      }
      const searchResults = [];
      for (let index = 0; index < data.length; index++) {
        const itemName = data[index].doc_name.trim().toLowerCase();
        if (itemName.indexOf(searchQuery.toLowerCase()) !== -1) {
          searchResults.push(data[index]);
        }
      }
      return searchResults;
    }

    searchTeam(searchQuery, data) {
      if (data.length < 1) {
        return [];
      }
      const searchResults = [];
      for (let index = 0; index < data.length; index++) {
        const itemName = data[index].name.trim().toLowerCase();
        if (itemName.indexOf(searchQuery.toLowerCase()) !== -1) {
          searchResults.push(data[index]);
        }
      }
      return searchResults;
    }

    render() {
      const { dailyPlanMyTeam } = this.props;
      const { data, loading } = this.props.dailyPlanBoAllDoctors;
      const { selected, searchQuery, selectedTeam } = this.state;
      const onChange = this.onChange.bind(this);
      const save = this.save.bind(this);
      const searchText = this.searchText.bind(this);
      const { doneDoctors, doctor } = this.props.navigation.state.params;

      return (
        <VirtualCallAddUserComponent
          doneDoctors={doneDoctors}
          data={this.state.docList && this.state.searchQuery ? this.state.docList : data}
          team={this.state.userList && this.state.searchQuery ? this.state.userList : dailyPlanMyTeam.data}
          loading={loading || dailyPlanMyTeam.loading}
          selected={selected}
          selectedTeam={selectedTeam}
          onTeamChange={this.onTeamChange}
          onChange={onChange}
          doctor={doctor}
          searchText={searchText}
          save={save}
          searchQuery={searchQuery}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanBoAllDoctors: state.dailyPlanBoAllDoctors,
  dailyPlanMyTeam: state.dailyPlanMyTeam,
  virtualDetailingForm: state.dailyPlanVirtualDetailingForm,
});

export default connect(
  mapStateToProps,
  { loadDailyPlanBoAllDoctors, loadTeam, setVirtualDetailingForm }
)(VirtualCallAddUserContainer);
