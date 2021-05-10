import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EDetailingBrandDrComponent from '../../../components/detailing/E-DetatilingBrandDrComponent';
import {
  createDetailingContentShowcase, deleteDailyShowCase,
  getDetailingContentData
} from '../../../local-storage/helper/detailing';
import api from '../../../api';
import Urls from '../../../api/urls';
import Adapter from '../../../util/Adapter';
import { loadVADetailsWithConfig, readConfig } from '../../../util/startDeatiling';
import {
  addOpenTokData,
  joinVirtualCall,
  REFRESH_DAILY_PLAN,
  SET_SESSION_DATA_OPENTOK
} from '../../../actions';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import { isToday } from '../../../util/dateTimeUtil';
import Toaster from '../../../util/Toaster';

class EDetailingBrandDrContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      loading: false,
      brands: [],
      doc_code: '',
      showSharedHistory: false,
      sharedHistory: [],
      sortType: null,
      maxPosition: 0
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      const { doctor, onSort } = params;
      const { doc_name } = doctor;
      return {
        headerTitle: doc_name,
        headerRight: (
          <TouchableOpacity onPress={() => {
            if (onSort) {
              onSort();
            }
          }}
          >
            <Image
              source={Images.ic_sort}
              style={styles.up}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      };
    };

    onSort = () => {
      const { sortType } = this.state;
      if (!sortType) {
        this.setState({ sortType: 'asc' });
        return;
      }
      if (sortType === 'asc') {
        this.setState({ sortType: 'desc' });
        return;
      }
      this.setState({ sortType: 'asc' });
    };

    componentWillUnmount() {
      this.willFocus.remove();
    }

    componentDidMount(): void {
      this.willFocus = this.props.navigation.addListener(
        'didFocus',
        () => {
          this.loadVADetailsWithConfig().then().catch();
        }
      );
      this.fetchHistory().then(async (response) => {
        response = JSON.stringify(response).toLowerCase();
        response = JSON.parse(response);
        const brands = [];
        for (const content of response) {
          const {
            thumbnail,
            content_id,
            session_date,
            total_time,
            content_title
          } = content;
          const datum = await getDetailingContentData(content_id);
          if (datum) {
            brands.push({
              thumbnail,
              content_title,
              session_date,
              total_time,
              isOffline: datum && datum.content_id,
              ...datum
            });
          }
        }
        this.setState({
          sharedHistory: brands
        });
      }).catch();

      this.props.navigation.setParams({
        onSort: this.onSort
      });

      const { currentTab } = this.props.navigation.state.params;
      if (currentTab === 1) {
        this.openSharedHistory();
      }
    }

    openSharedHistory() {
      this.setState({
        showSharedHistory: true
      });
    }

    closeSharedHistory() {
      this.setState({
        showSharedHistory: false
      });
    }

    async fetchHistory() {
      const user = await Adapter.getUser();
      const { rep_code } = user;
      const {
        doctor
      } = this.props.navigation.state.params;
      const {
        doc_code
      } = doctor;
      const results = [];

      const { statusCode, data } = await api({
        method: 'GET',
        url: Urls.SHARED_HISTORY_BO,
        params: { rep_code, doc_code },
      });
      if (statusCode === 200) {
        data.forEach((detailing) => {
          const { contents, session_date } = detailing;
          if (contents) {
            contents.forEach((content) => {
              const {
                content_id, content_path, content_title, thumbnail, time
              } = content;
              results.push({
                session_date, content_id, content_path, content_title, thumbnail, total_time: time,
              });
            });
          }
        });
        return results;
      }
      return [];
    }

    async loadVADetailsWithConfig() {
      const {
        doctor
      } = this.props.navigation.state.params;
      const {
        doc_code
      } = doctor;
      const brands = await loadVADetailsWithConfig(doc_code, doctor.contents);
      let maxPosition = 0;
      for (const brand of brands) {
        for (const position in brand.data) {
          if (brand.data.hasOwnProperty(position) && brand.data[position].in_showcase) {
            if (brand.data[position].vaPosition && maxPosition < brand.data[position].vaPosition) {
              maxPosition = brand.data[position].vaPosition;
            } else {
              maxPosition++;
            }
          }
        }
      }
      this.setState({
        brands,
        doc_code,
        maxPosition
      });
    }

    gotoVA(VA) {
      let {
        maxPosition
      } = this.state;
      maxPosition++;
      this.props.navigation.navigate('VisualAid', { VA, maxPosition });
    }

    startSingleShowCase(VA) {
      const {
        doctor
      } = this.props.navigation.state.params;
      const {
        doc_code
      } = doctor;
      const allVAS = [];
      for (const brand of this.state.brands) {
        for (const va of brand.data) {
          allVAS.push(
            va,
          );
        }
      }
      loadVADetailsWithConfig(doc_code, [VA]).then((response) => {
        const {
          doctor,
          date,
        } = this.props.navigation.state.params;
        this.props.navigation.navigate('EDetailingWebView', {
          showcase: response[0].data,
          doctor,
          allVAS,
          date,
        });
      });
    }

    startShowCase() {
      this.loadVADetailsWithConfig().then(() => {
        const brandsCloned = [];
        const allVAS = [];
        for (const brand of this.state.brands) {
          for (const va of brand.data) {
            const {
              vaPosition,
              in_showcase,
            } = va;
            if (in_showcase) {
              if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
                brandsCloned[vaPosition] = va;
              } else {
                brandsCloned.push(
                  va
                );
              }
            }
            allVAS.push(
              va,
            );
          }
        }
        const {
          doctor,
          date,
        } = this.props.navigation.state.params;
        if (brandsCloned.length > 0) {
          const finalVAS = [];
          for (const render of brandsCloned) {
            if (render) {
              finalVAS.push(
                render
              );
            }
          }
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: finalVAS,
            doctor,
            allVAS,
            date,
          });
        } else {
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: allVAS,
            allVAS,
            doctor,
            date,
          });
        }
      });
    }

    async toggleShowcase(brandName, position, addToShowCase) {
      const brandsCloned = [];
      let {
        maxPosition
      } = this.state;
      for (const brand of this.state.brands) {
        if (brandName === brand.name) {
          brand.data[position].in_showcase = addToShowCase;
          if (!addToShowCase) {
            brand.data[position].vaPosition = 0;
          } else {
            brand.data[position].vaPosition = ++maxPosition;
          }
          const VA = brand.data[position];
          const {
            doc_code,
            content_id,
            content_location
          } = VA;
          deleteDailyShowCase(
            doc_code,
            content_id
          );
          VA.in_showcase = addToShowCase;
          if (!addToShowCase) {
            VA.config = await readConfig(content_location, doc_code, content_id, VA, true);
            VA.name = VA.title;
          }
          createDetailingContentShowcase(
            doc_code,
            content_id,
            VA
          ).then().catch();
        }
        brandsCloned.push(
          brand
        );
      }
      this.setState({
        brands: brandsCloned.splice(0),
        maxPosition
      });
      await Adapter.set(REFRESH_DAILY_PLAN, true);
    }

    previewShowCase() {
      this.loadVADetailsWithConfig().then(() => {
        const brandsCloned = [];
        const allVAS = [];
        for (const brand of this.state.brands) {
          for (const va of brand.data) {
            const {
              vaPosition,
              in_showcase,
            } = va;
            if (in_showcase) {
              if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
                brandsCloned[vaPosition] = va;
              } else {
                brandsCloned.push(
                  va
                );
              }
            }
            allVAS.push(
              va,
            );
          }
        }
        const {
          doctor
        } = this.props.navigation.state.params;
        if (brandsCloned.length > 0) {
          const finalVAS = [];
          for (const render of brandsCloned) {
            if (render) {
              finalVAS.push(
                render
              );
            }
          }
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: finalVAS,
            doctor,
            allVAS,
            preview: true
          });
        } else {
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: allVAS,
            doctor,
            allVAS,
            preview: true
          });
        }
      });
    }

  joinVirtualCall = async () => {
    const { doctor, date } = this.props.navigation.state.params;
    const { virtual_call_schedule } = doctor;
    if (virtual_call_schedule) {
      this.setState({ hoverLoading: true });
      const { statusCode, errorMessage, data } = await joinVirtualCall(virtual_call_schedule.session_token);
      await this.setState({ hoverLoading: false });
      if (statusCode === 200) {
        this.props.addOpenTokData(SET_SESSION_DATA_OPENTOK, {
          apiKey: data.key,
          sessionId: data.session_id,
          token: data.token,
          name: data.user_name
        });
        this.props.navigation.navigate('VirtualDetailingVideo', { doctor, date });
        return;
      }
      Toaster.show(errorMessage);
    }
  };

  render() {
    const gotoVA = this.gotoVA.bind(this);
    const {
      isInternetConnected,
      loading,
      brands,
      showSharedHistory,
      sharedHistory,
      sortType,
      hoverLoading
    } = this.state;
    const { doctor } = this.props.navigation.state.params;
    const { date } = this.props.navigation.state.params;
    const toggleShowcase = this.toggleShowcase.bind(this);
    const startShowCase = this.startShowCase.bind(this);
    const previewShowCase = this.previewShowCase.bind(this);
    const openSharedHistory = this.openSharedHistory.bind(this);
    const closeSharedHistory = this.closeSharedHistory.bind(this);
    const startSingleShowCase = this.startSingleShowCase.bind(this);
    const isSharedHistory = true;
    return (
      <EDetailingBrandDrComponent
        hoverLoading={hoverLoading}
        doctor={doctor}
        isToday={isToday(date)}
        loading={loading}
        brands={brands}
        gotoVA={gotoVA}
        sharedHistory={sharedHistory}
        toggleShowcase={toggleShowcase}
        startShowCase={startShowCase}
        connected={isInternetConnected}
        previewShowCase={previewShowCase}
        closeSharedHistory={closeSharedHistory}
        openSharedHistory={openSharedHistory}
        showSharedHistory={showSharedHistory}
        startSingleShowCase={startSingleShowCase}
        isSharedHistory={isSharedHistory}
        sortType={sortType}
        joinVirtualCall={this.joinVirtualCall}
      />
    );
  }
}

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { addOpenTokData }
)(EDetailingBrandDrContainer);
