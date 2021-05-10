import React, { Component } from 'react';
import * as Progress from 'react-native-progress';

import {
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Colors from '../../../styles/colorsStyles';

class ContentListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      trainingList: [],
      landingList: [],
      content: [],
    };
  }

  renderList() {
    const { data } = this.props;

    if (data) {
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            this.renderItem(item)
          )}
          ListEmptyComponent={() => <Text style={styles.noData}>No Contents Available</Text>}
          keyExtractor={(item) => item.content_id.toString()}
        />
      );
    }
    return null;
  }

  renderLandingPageList() {
    const { data } = this.props.landingPageList;

    if (data) {
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            this.renderItemLandingPage(item)
          )}
          keyExtractor={(item) => item.content_id.toString()}
        />
      );
    }
    return null;
  }

  renderTrainingPageList() {
    const { data } = this.props.trainingPageList;
    if (data) {
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            this.renderItemTrainingPage(item)
          )}
          keyExtractor={(item) => item.content_id.toString()}
        />
      );
    }
    return null;
  }

  renderItemTrainingPage(item) {
    const {
      content_id, content_type, title, content_size
    } = item;
    return (
      <View key={content_id} style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {content_type ? <Text style={styles.secondary}>{content_type}</Text> : null}
        </View>
        <View style={styles.middle}>
          <Text>{content_size}</Text>
        </View>
        <View style={styles.right}>
          {this.renderDownloadProgressTrainingPage(item)}
        </View>
      </View>
    );
  }

  renderDownloadProgressTrainingPage(item) {
    const { downloadTraining } = this.props;
    const { failed, progress, downloaded } = item;
    console.log('downloaded: ', downloaded);
    console.log('failed: ', failed);
    console.log('progress: ', progress);
    if (downloaded) {
      return (
        <Text style={styles.downloadedButton}>Downloaded</Text>
      );
    }
    if ((progress || progress === 0) && !failed) {
      return (
        <View>
          <Progress.Bar progress={progress / 100} width={200} color={Colors.contentBlue} />
          <Text style={styles.progressText}>{`In progress... ${progress}%`}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => {
        downloadTraining(item);
      }}
      >
        {failed
          ? <Text style={styles.downloadButton}>Retry</Text>
          : <Text style={styles.downloadButton}>Download</Text>}
      </TouchableOpacity>
    );
  }

  renderItem(item) {
    const {
      content_id, brand_name, content_type, title, content_size
    } = item;
    return (
      <View key={content_id} style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {brand_name ? <Text style={styles.secondary}>{brand_name}</Text> : null}
          {content_type ? <Text style={styles.secondary}>{content_type}</Text> : null}
        </View>
        <View style={styles.middle}>
          <Text>{content_size}</Text>
        </View>
        <View style={styles.right}>
          {this.renderDownloadProgress(item)}
        </View>
      </View>
    );
  }

  renderItemLandingPage(item) {
    const {
      content_id, brand_name, content_type, title, content_size
    } = item;
    return (
      <View key={content_id} style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {brand_name ? <Text style={styles.secondary}>{brand_name}</Text> : null}
          {content_type ? <Text style={styles.secondary}>{content_type}</Text> : null}
        </View>
        <View style={styles.middle}>
          <Text>{content_size}</Text>
        </View>
        <View style={styles.right}>
          {this.renderDownloadProgressLandingPage(item)}
        </View>
      </View>
    );
  }

  renderDownloadProgressLandingPage(item) {
    const { downloadLandingPage } = this.props;
    const { failed, progress, downloaded } = item;
    if (downloaded) {
      return (
        <Text style={styles.downloadedButton}>Downloaded</Text>
      );
    }
    if ((progress || progress === 0) && !failed) {
      return (
        <View>
          <Progress.Bar progress={progress / 100} width={200} color={Colors.contentBlue} />
          <Text style={styles.progressText}>{`In progress... ${progress}%`}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => {
        downloadLandingPage(item);
      }}
      >
        {failed
          ? <Text style={styles.downloadButton}>Retry</Text>
          : <Text style={styles.downloadButton}>Download</Text>}
      </TouchableOpacity>
    );
  }

  renderDownloadProgress(item) {
    const { downloadContent } = this.props;
    const { failed, progress, downloaded } = item;
    if (downloaded) {
      return (
        <Text style={styles.downloadedButton}>Downloaded</Text>
      );
    }
    if ((progress || progress === 0) && !failed) {
      return (
        <View>
          <Progress.Bar progress={progress / 100} width={200} color={Colors.contentBlue} />
          <Text style={styles.progressText}>{`In progress... ${progress}%`}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => {
        downloadContent(item);
      }}
      >
        {failed
          ? <Text style={styles.downloadButton}>Retry</Text>
          : <Text style={styles.downloadButton}>Download</Text>}
      </TouchableOpacity>
    );
  }

  render() {
    const loading = this.props.loading && this.props.landingPageList.loading && this.props.trainingPageList.loading;
    return (
      <ParentView
        connected
        loading={loading}
        style={styles.container}
      >
        <ScrollView>
          {this.renderTrainingPageList()}
          {this.renderLandingPageList()}
          {this.renderList()}
        </ScrollView>
      </ParentView>
    );
  }
}

export default ContentListComponent;
