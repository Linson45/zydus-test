import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  Image, Text, TouchableOpacity, View
} from 'react-native';
import CheckBox from 'react-native-check-box';
import RBSheet from 'react-native-raw-bottom-sheet';
import { loadBrandContentHub } from '../../../actions';
import ContentHubBrandComponent from '../../../components/content_hub/ContentHubBrandComponent';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import FloatingButtonComponent from '../../../components/detailing/FloatingButtonComponent';

class ContentHubBrandContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      hiddenTypes: {},
      appliedHiddenTypes: {},
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      const { brand, openFilters } = params;
      return {
        headerTitle: brand.brand_name,
        headerRight: (
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => {
              if (openFilters) {
                openFilters();
              }
            }}
            >
              <Image
                source={Images.Filter}
                style={styles.up}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ),
      };
    };

    async componentDidMount() {
      this.props.navigation.setParams({
        openFilters: this.openFilters,
      });
      this.onRefresh();
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
    };

    loadData = async () => {
      const { brand } = this.props.navigation.state.params;
      this.props.loadBrandContentHub(brand);
    };

    openFilters = () => {
      if (this.filterSheet) {
        this.filterSheet.open();
      }
    };

    goToContentDetail = (content) => {
      this.props.navigation.navigate('ContentHubDetail', { content });
    };

    renderBottomSheet() {
      const { data } = this.props.contentHubBrandItems;
      if (!data) {
        return null;
      }
      return (
        <RBSheet
          ref={(ref) => { this.filterSheet = ref; }}
          height={500}
          openDuration={250}
        >
          <View style={styles.filterHeaderContainer}>
            <Text style={styles.filterHeading}>Filter</Text>
            <TouchableOpacity onPress={() => this.filterSheet.close()}>
              <Text style={styles.filterClose}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.documentType}>Document Type</Text>
          { data.map((contentType) => {
            const { content_type } = contentType;
            return (
              <View style={styles.filterItem} key={content_type}>
                <CheckBox
                  key={content_type}
                  style={{ padding: 10 }}
                  rightTextStyle={{ color: '#000' }}
                  onClick={() => {
                    const hiddenTypes = JSON.parse(JSON.stringify(this.state.hiddenTypes));
                    hiddenTypes[content_type] = !hiddenTypes[content_type];
                    this.setState({ hiddenTypes });
                  }}
                  isChecked={!this.state.hiddenTypes[content_type]}
                />
                <Text style={styles.filterItemText}>
                  By
                  {content_type}
                </Text>
              </View>
            );
          })}
          <View style={styles.filterFooterContainer}>
            <TouchableOpacity onPress={() => {
              const hiddenTypes = JSON.parse(JSON.stringify(this.state.hiddenTypes));
              data.forEach(({ content_type }) => {
                hiddenTypes[content_type] = true;
              });
              this.setState({ hiddenTypes });
            }}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                this.setState({ appliedHiddenTypes: JSON.parse(JSON.stringify(this.state.hiddenTypes)) });
                this.filterSheet.close();
              }}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      );
    }

    render() {
      const { isInternetConnected, appliedHiddenTypes } = this.state;
      const { loading, data } = this.props.contentHubBrandItems;

      return (
        <View style={{ flex: 1 }}>
          <FloatingButtonComponent
            navigation={this.props.navigation}
          />
          <ContentHubBrandComponent
            data={data}
            connected={isInternetConnected}
            loading={loading}
            hiddenTypes={appliedHiddenTypes}
            goToContentDetail={this.goToContentDetail}
          />
          {this.renderBottomSheet()}
        </View>
      );
    }
}

const mapStateToProps = (state) => ({
  contentHubBrandItems: state.contentHubBrandItems,
});

export default connect(
  mapStateToProps,
  { loadBrandContentHub }
)(ContentHubBrandContainer);
