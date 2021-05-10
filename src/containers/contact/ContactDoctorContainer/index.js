import React from 'react';
import { connect } from 'react-redux';
import { loadContactDoctors } from '../../../actions';
import ContactDoctorComponent from '../../../components/contact/ContactDoctorComponent';

class ContactDoctorContainer extends React.Component {
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
    this.props.loadContactDoctors();
  };

  searchText = (searchQuery) => {
    const { data } = this.props.doctors;
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
      const itemName = data[index].doc_name.trim().toLowerCase();
      if (itemName.indexOf(searchQuery.toLowerCase()) !== -1) {
        searchResults.push(data[index]);
      }
    }
    return searchResults;
  }

  goToDoctorDetail = (doctor) => {
    this.props.navigation.navigate('ContentDoctorDetail', { doctor });
  };

  render() {
    const { searchQuery, filterList } = this.state;
    const { loading, data } = this.props.doctors;

    return (
      <ContactDoctorComponent
        loading={loading}
        data={filterList && searchQuery ? filterList : data}
        searchText={this.searchText}
        searchQuery={searchQuery}
        onPress={this.goToDoctorDetail}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  doctors: state.contactDoctor,
});

export default connect(
  mapStateToProps,
  { loadContactDoctors }
)(ContactDoctorContainer);
