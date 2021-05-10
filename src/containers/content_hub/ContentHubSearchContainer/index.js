import React from 'react';
import { connect } from 'react-redux';
import ContentHubSearchComponent from '../../../components/content_hub/ContentHubSearchComponent';
import Adapter from '../../../util/Adapter';
import { searchContentHub } from '../../../actions';
import FloatingButtonComponent from '../../../components/detailing/FloatingButtonComponent';

class ContentHubSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searches: [],
      recentSearches: [],
      searchText: '',
      searching: false,
    };
  }

  async componentDidMount() {
    const searches = [];
    this.setState({ searches });
    const recentSearches = await Adapter.get('content_hub_searches');
    if (recentSearches) {
      this.setState({ recentSearches });
    }
  }

    addSearchText = async (text) => {
      let recentSearches = await Adapter.get('content_hub_searches');
      if (!recentSearches) {
        recentSearches = [];
      }
      recentSearches.push(text);
      await Adapter.set('content_hub_searches', recentSearches);
      this.setState({ recentSearches });
    };

    clearRecentSearches = async () => {
      const recentSearches = [];
      await Adapter.set('content_hub_searches', recentSearches);
      this.setState({ recentSearches });
    };

    setSearchText = async (searchText) => {
      this.setState({ searchText });
      if (searchText) {
        this.setState({ searching: true });
        const searches = await searchContentHub(searchText);
        this.setState({ searches, searching: false });
      }
    };

    openContent = async (content) => {
      this.props.navigation.navigate('ContentHubDetail', { content });
    };

    goBack = () => {
      this.props.navigation.goBack();
    };

    render() {
      const {
        searches, recentSearches, searchText, searching
      } = this.state;
      return (
        <>
          <FloatingButtonComponent
            navigation={this.props.navigation}
          />
          <ContentHubSearchComponent
            goBack={this.goBack}
            searches={searches}
            recentSearches={recentSearches}
            addSearchText={this.addSearchText}
            clearRecentSearches={this.clearRecentSearches}
            searchText={searchText}
            setSearchText={this.setSearchText}
            openContent={this.openContent}
            searching={searching}
          />
        </>
      );
    }
}

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { }
)(ContentHubSearchContainer);
