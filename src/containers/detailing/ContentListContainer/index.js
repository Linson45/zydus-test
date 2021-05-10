import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import {
  loadContentList,
  downloadContent,
  loadLandingPages,
  downloadLandingPage,
  loadTrainingPages,
  downloadTraining,
} from '../../../actions';
import ContentListComponent from '../../../components/detailing/ContentListComponent';
import Colors from '../../../styles/colorsStyles';

class ContentListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      disable: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ downloadAll: this.downloadAll.bind(this) });
    this.props.navigation.setParams({ disable: this.state.disable });

    this.loadData();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Content List',
      headerBackground: null,
      headerRight: (
        <>
          <TouchableOpacity
            opaque={1}
            style={{
              backgroundColor: 'transparent',
              padding: 10,
              color: Colors.white,
            }}
            onPress={() => {
              params.downloadAll(params.disable);
              // if (params.disable) { alert('Download In-Progress'); } else { params.downloadAll(); }
            }}
            color="#fff"
          >
            <Icon
              name="download"
              type="MaterialCommunityIcons"
              style={{ color: Colors.black, fontSize: 20 }}
            />
          </TouchableOpacity>
        </>
      ),
    };
  };

  updateNavAndState(bool) {
    this.props.navigation.setParams({
      disable: bool,
    });
    this.setState({ disable: bool });
  }

  downloadAll(disable) {
    const { downloadContent, downloadTraining, downloadLandingPage } = this.props;
    if (!disable) {
      this.updateNavAndState(true);
      if (this.props.trainingPageList.data !== null) {
        if (this.props.trainingPageList.data.length !== 0) {
          this.props.trainingPageList.data.forEach((element) => {
            const { downloaded } = element;
            if (!downloaded) {
              downloadTraining(element);
            }
          });
        }
      }
      if (this.props.landingPageList.data !== null) {
        if (this.props.landingPageList.data.length !== 0) {
          this.props.landingPageList.data.forEach((element) => {
            const { downloaded } = element;
            if (!downloaded) {
              downloadLandingPage(element);
            }
          });
        }
      }
      if (this.props.contentList.data !== null) {
        if (this.props.contentList.data.length !== 0) {
          this.props.contentList.data.forEach((element) => {
            const { downloaded } = element;
            if (!downloaded) {
              downloadContent(element);
            }
          });
          // this.setState({ disable: false });
        }
      }
    } else {
      alert('Download In-Progress');
    }
  }

  loadData = () => {
    this.props.loadContentList();
    this.props.loadLandingPages();
    this.props.loadTrainingPages();
  };

    render() {
      const { loading, data } = this.props.contentList;
      const { landingPageList, trainingPageList } = this.props;
      const { downloadContent, downloadLandingPage, downloadTraining } = this.props;
      return (
        <ContentListComponent
          loading={loading}
          data={data}
          downloadLandingPage={downloadLandingPage}
          landingPageList={landingPageList}
          trainingPageList={trainingPageList}
          downloadContent={downloadContent}
          downloadTraining={downloadTraining}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  contentList: state.contentList,
  landingPageList: state.landingPageList,
  trainingPageList: state.trainingPageList
});

export default connect(
  mapStateToProps,
  {
    loadContentList,
    downloadContent,
    downloadLandingPage,
    loadLandingPages,
    loadTrainingPages,
    downloadTraining,
  },
)(ContentListContainer);
