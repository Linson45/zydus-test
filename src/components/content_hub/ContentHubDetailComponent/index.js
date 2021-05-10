import React from 'react';
import {
  FlatList, Image, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CheckBox from 'react-native-check-box';
import ParentView from '../../ParentView';
import styles from './styles';
import { normalisedSource } from '../../../util/ArrayUtil';

export default class ContentHubDetailComponent extends React.Component {
  renderHeader() {
    const { content } = this.props;
    return (
      <View>
        <Image source={{ uri: normalisedSource(content.thumbnail_url) }} style={styles.thumbnailHeader} />
        <Text style={styles.contentTitle}>{content.title}</Text>
      </View>
    );
  }

  renderDetails() {
    const { content } = this.props;
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainerBlock}>
          <Text style={styles.smallHeading}>Uploaded</Text>
          <Text style={styles.detailsValue}>{content.publish_date}</Text>
        </View>
      </View>
    );
  }

  renderSearch() {
    const { searchText, onSearch } = this.props;
    return (
      <TextInput
        value={searchText}
        style={styles.searchBox}
        onChangeText={onSearch}
        placeholder="Search"
      />
    );
  }

  renderBottomSheet() {
    const {
      doctors, refresh, setMessageType, message, email, share
    } = this.props;
    return (
      <RBSheet
        ref={(ref) => { this.doctorSheet = ref; }}
        height={500}
        openDuration={250}
      >
        <View style={styles.filterHeaderContainer}>
          <Text style={styles.filterHeading}>Share Content</Text>
          <TouchableOpacity onPress={() => this.doctorSheet.close()}>
            <Text style={styles.filterClose}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {this.renderSearch()}

        <FlatList
          data={doctors}
          renderItem={({ item }) => (
            this.renderDoctor(item)
          )}
          keyExtractor={(item) => item.doc_code}
          extraData={refresh}
        />

        <View style={styles.filterFooterContainer}>
          <View style={styles.checkboxes}>
            <View style={styles.checkboxRow}>
              <CheckBox
                key="email"
                style={{ padding: 10 }}
                rightTextStyle={{ color: '#000' }}
                onClick={() => {
                  setMessageType('email');
                }}
                isChecked={email}
              />
              <View style={styles.doctorContainer}>
                <Text style={styles.doctorName}>Email</Text>
              </View>
            </View>

            <View style={styles.checkboxRow}>
              <CheckBox
                key="message"
                style={{ padding: 10 }}
                rightTextStyle={{ color: '#000' }}
                onClick={() => {
                  setMessageType('message');
                }}
                isChecked={message}
              />
              <View style={styles.doctorContainer}>
                <Text style={styles.doctorName}>Message Link</Text>
              </View>
            </View>

          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              share();
              this.doctorSheet.close();
            }}
          >
            <Text style={styles.applyButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

    renderDoctor = (doctor) => {
      const { selectedDocs, setSelectedDocs } = this.props;
      const { doc_name, doc_code, doc_spec } = doctor;
      return (
        <View style={styles.doctorRow}>
          <CheckBox
            key={doc_code}
            style={{ padding: 10 }}
            rightTextStyle={{ color: '#000' }}
            onClick={() => {
              selectedDocs[doc_code] = !selectedDocs[doc_code];
              setSelectedDocs(selectedDocs);
            }}
            isChecked={selectedDocs[doc_code]}
          />
          <View style={styles.doctorContainer}>
            <Text style={styles.doctorName}>{doc_name}</Text>
            <Text style={styles.doctorSpec}>{doc_spec}</Text>
          </View>
        </View>
      );
    };

    renderShareButton() {
      const { content } = this.props;
      if (content && (content.is_shareable === '1' || content.is_shareable === 1)) {
        return (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              if (this.doctorSheet) {
                this.doctorSheet.open();
              }
            }}
          >
            <Text style={styles.startButton.text}>Share</Text>
          </TouchableOpacity>
        );
      }
      return (
        <View style={styles.startButtonDisabled}>
          <Text style={styles.startButtonDisabled.text}>Share</Text>
        </View>
      );
    }

    render() {
      const { loading, loadPreview, hoverLoading } = this.props;

      return (
        <ParentView
          hoverLoading={hoverLoading}
          loading={loading}
          connected
        >
          {this.renderHeader()}
          {this.renderDetails()}
          <View style={styles.bottomView}>
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.previewButton} onPress={loadPreview}>
                <Text style={styles.previewButton.text}>View</Text>
              </TouchableOpacity>
              {this.renderShareButton()}
            </View>
          </View>
          {this.renderBottomSheet()}
        </ParentView>
      );
    }
}
