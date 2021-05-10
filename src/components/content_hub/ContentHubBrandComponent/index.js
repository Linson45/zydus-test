import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import { normalisedSource } from '../../../util/ArrayUtil';

export default class ContentHubBrandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedTypes: {},
    };
  }

  renderContentType() {
    const { data, hiddenTypes } = this.props;
    const { expandedTypes } = this.state;
    if (data) {
      return data.map((contentType) => {
        const { content_type, contents } = contentType;
        if (!hiddenTypes[content_type]) {
          return (
            <View key={content_type}>
              <View style={styles.contentTypeHeadingContainer}>
                <Text style={styles.contentTypeHeading}>{content_type}</Text>
                <TouchableOpacity onPress={() => this.toggleDisplay(content_type)}>
                  <Text style={styles.contentTypeSeeAll}>{expandedTypes[content_type] ? 'Hide' : 'See All'}</Text>
                </TouchableOpacity>
              </View>

              {this.renderContents(content_type, contents)}
            </View>
          );
        }
        return null;
      });
    }
    return null;
  }

  renderContents(content_type, contents) {
    const isExpanded = this.state.expandedTypes[content_type];
    if (isExpanded) {
      return (
        <View horizontal showsHorizontalScrollIndicator={false} style={styles.expandedContents}>
          {this.renderContentItems(contents)}
        </View>
      );
    }
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.unExpandedContents}>
        {this.renderContentItems(contents)}
      </ScrollView>
    );
  }

    renderContentItems = (contents) => {
      const { goToContentDetail } = this.props;
      return contents.map((content) => {
        const { content_id, title, thumbnail_url } = content;
        return (
          <TouchableOpacity style={styles.content} key={content_id} onPress={() => { goToContentDetail(content); }}>
            <Image source={{ uri: normalisedSource(thumbnail_url) }} style={styles.contentThumbnail} resizeMode="contain" />
            <View style={styles.contentDescView}>
              <Text style={styles.contentTitle}>{title}</Text>
            </View>
          </TouchableOpacity>
        );
      });
    };

    toggleDisplay = (content_type) => {
      const { expandedTypes } = this.state;
      let isExpanded = expandedTypes[content_type];
      isExpanded = !isExpanded;
      expandedTypes[content_type] = isExpanded;
      this.setState({ ...expandedTypes });
    };

    render() {
      const { loading, connected } = this.props;

      return (
        <ParentView
          loading={loading}
          connected={connected}
        >
          <ScrollView>
            {this.renderContentType()}
          </ScrollView>
        </ParentView>
      );
    }
}
