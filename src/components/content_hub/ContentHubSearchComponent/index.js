import React from 'react';
import {
  ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';

export default class ContentHubSearchComponent extends React.Component {
  renderSearchHeader() {
    const { goBack, setSearchText, searchText } = this.props;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Images.icon_back}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.searchCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderBlankSpace() {
    return (
      <View style={styles.blank} />
    );
  }

  renderSearch() {
    const { searching } = this.props;
    if (searching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="grey" />
        </View>
      );
    }
    return null;
  }

  renderSearchResults() {
    const { addSearchText, openContent } = this.props;
    let { searches } = this.props;
    if (!searches) {
      searches = [];
    }
    return searches.map((search) => {
      const { title, content_type } = search;
      return (
        <TouchableOpacity
          style={styles.rowSearch}
          onPress={() => {
            addSearchText(title);
            openContent(search);
          }}
        >
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowDesc}>{content_type}</Text>
        </TouchableOpacity>
      );
    });
  }

  renderRecentSearches() {
    const { clearRecentSearches, setSearchText } = this.props;
    let { recentSearches } = this.props;
    if (!recentSearches) {
      recentSearches = [];
    }
    if (recentSearches.length) {
      return (
        <View>
          <View style={styles.recentSearchHeader}>
            <Text style={styles.recentSearchHeading}>Recent Search</Text>
            <TouchableOpacity onPress={clearRecentSearches}>
              <Text style={styles.recentSearchClear}>Clear</Text>
            </TouchableOpacity>
          </View>
          {
                        recentSearches.map((search) => (
                          <TouchableOpacity style={styles.rowSearch} onPress={() => setSearchText(search)}>
                            <Text style={styles.rowSearchList}>{search}</Text>
                          </TouchableOpacity>
                        ))
}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <ParentView
        loading={false}
        connected
      >
        {this.renderSearchHeader()}
        <ScrollView>
          {this.renderSearch()}
          {this.renderSearchResults()}
          {this.renderBlankSpace()}
          {this.renderRecentSearches()}
        </ScrollView>
      </ParentView>
    );
  }
}
