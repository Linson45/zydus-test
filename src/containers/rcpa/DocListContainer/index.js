import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaDocList } from '../../../actions';
import DocListComponent from '../../../components/rcpa/DocListComponent';
import { pendingRcpaDoctorCodes } from '../../../local-storage/helper/rcpa';

class RcpaDocListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: {
        gsp: [],
        multivisit: [],
        all: []
      },
      searchQuery: null,
      pendingDocs: [],
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'RCPA Doctor Status',
    };

    async componentDidMount() {
      this.willFocus = this.props.navigation.addListener(
        'didFocus',
        this.onFocus.bind(this)
      );
      const pendingDocs = await pendingRcpaDoctorCodes();
      this.setState({ pendingDocs });
    }

    onFocus() {
      // this.loadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
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
    }

    componentWillUnmount() {
      this.willFocus.remove();
    }

    async loadData() {
      const pendingDocs = await pendingRcpaDoctorCodes();
      this.setState({ pendingDocs });

      const { user } = this.props.navigation.state.params;
      const { company_code, sbu_code, rep_code } = user;

      const data = {
        company_code,
        sbu_code,
        rep_code
      };
      this.props.loadRcpaDocList(data);
    }

    selectDoctor(doctor) {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('RcpaChemistSelection', { user, doctor });
    }

    searchText(searchEvent) {
      if (searchEvent != null) {
        if (searchEvent.searchQuery != null) {
          this.setState({ searchQuery: searchEvent.searchQuery });
          const searchQuery = searchEvent.searchQuery.toLowerCase();
          const { data } = this.props.rcpaDocList;
          const searchResults = {};
          searchResults.gsp = this.searchArray(searchQuery, data.gsp);
          searchResults.multivisit = this.searchArray(searchQuery, data.multivisit);
          searchResults.all = this.searchArray(searchQuery, data.all);
          this.setState({
            docList: searchResults
          });
        }
      }
    }

    searchArray(searchQuery, data) {
      if (data.length < 1) {
        return [];
      }
      const searchResults = [];
      for (let index = 0; index < data.length; index++) {
        const itemName = data[index].doc_name.trim().toLowerCase();
        if (itemName.includes(searchQuery)) {
          searchResults.push(data[index]);
        }
      }
      return searchResults;
    }

    render() {
      const { loading, data } = this.props.rcpaDocList;
      const selectDoctor = this.selectDoctor.bind(this);
      const searchText = this.searchText.bind(this);
      const { searchQuery, pendingDocs } = this.state;
      const { bo_name } = this.props.navigation.state.params;
      return (
        <DocListComponent
          loading={loading}
          data={this.state.docList && this.state.searchQuery && (this.state.docList.gsp || this.state.docList.all || this.state.docList.multivisit) ? this.state.docList : data}
          selectDoctor={selectDoctor}
          bo_name={bo_name}
          searchQuery={searchQuery}
          searchText={searchText}
          pendingDocs={pendingDocs}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaDocList: state.rcpaDocList,
});

export default connect(
  mapStateToProps,
  { loadRcpaDocList }
)(RcpaDocListContainer);
