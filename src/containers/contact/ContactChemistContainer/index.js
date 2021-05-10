import React from 'react';
import { connect } from 'react-redux';
import ContactChemistComponent from '../../../components/contact/ContactChemistComponent';
import { loadContactChemists } from '../../../actions';

class ContactChemistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      filterList: [],
    };
  }

  async componentDidMount() {
    this.loadData();
  }

    loadData = async () => {
      this.props.loadContactChemists();
    };

    searchText = (searchQuery) => {
      const { data } = this.props.chemists;
      const filterList = this.searchArray(searchQuery, data);

      this.setState({
        searchQuery, filterList
      });
    };

    searchArray(searchQuery, data) {
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
      const { searchQuery, filterList } = this.state;
      const { loading, data } = this.props.chemists;

      return (
        <ContactChemistComponent
          loading={loading}
          data={filterList && searchQuery ? filterList : data}
          searchText={this.searchText}
          searchQuery={searchQuery}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  chemists: state.contactChemist,
});

export default connect(
  mapStateToProps,
  { loadContactChemists }
)(ContactChemistContainer);
