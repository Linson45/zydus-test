import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { Image, TouchableOpacity } from 'react-native';
import { loadContentHub } from '../../../actions';
import ContentHubComponent from '../../../components/content_hub/ContentHubComponent';
import styles from '../ContentHubBrandContainer/styles';
import Images from '../../../Constants/imageConstants';

class ContentHubContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      selectedSpeciality: null,
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      let onSearch = null;
      if (params) {
        onSearch = params.onSearch;
      }

      return {
        headerTitle: 'Content Hub',
        headerRight: (
          <TouchableOpacity onPress={() => {
            if (onSearch) {
              onSearch();
            }
          }}
          >
            <Image
              source={Images.icon_search}
              style={styles.up}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      };
    };

    async componentDidMount() {
      this.onRefresh();
      this.props.navigation.setParams({
        onSearch: this.onSearch
      });
    }

    onSearch = () => {
      this.props.navigation.navigate('ContentHubSearch');
    };

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
      this.props.loadContentHub();
    };

    goToBrandDetail = async (brand) => {
      this.props.navigation.navigate('ContentHubBrand', { brand });
    };

    goToContentDetail = (content) => {
      this.props.navigation.navigate('ContentHubDetail', { content });
    };

    selectSpeciality = (selectedSpeciality) => {
      this.setState({ selectedSpeciality });
    };

    render() {
      const { isInternetConnected, selectedSpeciality } = this.state;
      const { loading, data } = this.props.contentHub;
      const {
        shareButtonDisabled,
        navigation
      } = this.props;

      return (
        <>
          <ContentHubComponent
            onRefresh={this.onRefresh}
            connected={isInternetConnected}
            loading={loading}
            data={data}
            navigation={navigation}
            shareButtonDisabled={shareButtonDisabled}
            goToBrandDetail={this.goToBrandDetail}
            goToContentDetail={this.goToContentDetail}
            selectedSpeciality={selectedSpeciality}
            selectSpeciality={this.selectSpeciality}
          />
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  contentHub: state.contentHub,
  shareButtonDisabled: state.openTokScreen.shareButtonDisabled
});

export default connect(
  mapStateToProps,
  { loadContentHub }
)(ContentHubContainer);
