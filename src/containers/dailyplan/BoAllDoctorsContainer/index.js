import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDailyPlanBoAllDoctors, REFRESH_DAILY_PLAN } from '../../../actions';
import DailyPlanBoAllDoctorsComponent from '../../../components/dailyplan/DailyPlanBoAllDoctorsComponent';
import Adapter from '../../../util/Adapter';
import { createDailyPlanAdhocDoctorsPlanned, getAllFullDataDoctors } from '../../../local-storage/helper/dailyplan';

class DailyPlanBoAllDoctorsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      searchQuery: null,
      docList: [],
      isInternetConnected: true,
    };
  }

    static navigationOptions = {
      title: 'Add Doctor',
    };

    async componentDidMount() {
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
    }

    onRefresh = () => {
      const { user, date } = this.props.navigation.state.params;
      const { rep_code, company_code, sbu_code } = user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        date
      };
      this.props.loadDailyPlanBoAllDoctors(data);
    };

    onChange(index, doctor) {
      const { selected } = this.state;
      if (selected) {
        if (selected[index]) {
          delete selected[index];
        } else {
          selected[index] = doctor;
        }
      }
      this.setState({
        selected: selected || {}
      });
    }

    async save() {
      const { selected } = this.state;
      const { user, date } = this.props.navigation.state.params;
      const { rep_code } = user;
      const docs = Object.keys(selected).map((key) => selected[key]);
      if (docs.length) {
        await createDailyPlanAdhocDoctorsPlanned(date, rep_code, docs);
        await Adapter.set(REFRESH_DAILY_PLAN, true);
        this.props.navigation.goBack();
      }
    }

    searchText(searchQuery) {
      this.setState({ searchQuery });
      const { data } = this.props.dailyPlanBoAllDoctors;
      const searchResults = this.searchArray(searchQuery, data);
      this.setState({
        docList: searchResults
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

    render() {
      const { data, loading } = this.props.dailyPlanBoAllDoctors;
      const { doctors_planned } = this.props.navigation.state.params;
      const { selected, searchQuery } = this.state;
      const onChange = this.onChange.bind(this);
      const save = this.save.bind(this);
      const searchText = this.searchText.bind(this);
      return (
        <DailyPlanBoAllDoctorsComponent
          doctors_planned={doctors_planned}
          data={this.state.docList && this.state.searchQuery ? this.state.docList : data}
          loading={loading}
          selected={selected}
          onChange={onChange}
          searchText={searchText}
          save={save}
          searchQuery={searchQuery}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanBoAllDoctors: state.dailyPlanBoAllDoctors
});

export default connect(
  mapStateToProps,
  { loadDailyPlanBoAllDoctors }
)(DailyPlanBoAllDoctorsContainer);
