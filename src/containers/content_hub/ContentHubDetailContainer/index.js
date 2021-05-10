import React from 'react';
import { connect } from 'react-redux';
import ContentHubDetailComponent from '../../../components/content_hub/ContentHubDetailComponent';
import { getAllDoctors } from '../../../local-storage/helper/dailyplan';
import Adapter from '../../../util/Adapter';
import { getPreview, shareContent } from '../../../actions';
import Toaster from '../../../util/Toaster';
import FloatingButtonComponent from '../../../components/detailing/FloatingButtonComponent';

class ContentHubDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDocs: {},
      doctors: [],
      searchText: '',
      allDoctors: [],
      refresh: false,
      message: false,
      email: false,
      loading: false,
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      const { content } = params;
      return {
        headerTitle: content.content_type,
      };
    };

    async componentDidMount() {
      const me = await Adapter.getUser();
      const doctors = await getAllDoctors(me.rep_code);
      this.setState({ doctors, allDoctors: doctors });
    }

    setSelectedDocs = (selectedDocs) => {
      this.setState({ selectedDocs, refresh: !this.state.refresh });
    };

    setMessageType = (key) => {
      const state = { ...this.state };
      state[key] = !state[key];
      this.setState(state);
    };

    loadPreview = async () => {
      this.setState({ loading: true });
      const { content } = this.props.navigation.state.params;
      const response = await getPreview(content.content_path);
      if (response) {
        const { url } = response;
        this.props.navigation.navigate('ContentHubPreview', { url });
      }
      this.setState({ loading: false });
    };

    share = async () => {
      const { selectedDocs, message, email } = this.state;
      const me = await Adapter.getUser();

      const { content } = this.props.navigation.state.params;

      const share_to = [];
      Object.keys(selectedDocs).forEach((doc_code) => {
        if (selectedDocs[doc_code]) {
          share_to.push({
            id: doc_code,
          });
        }
      });

      if (!share_to.length) {
        return;
      }

      let shareType = null;
      if (message && email) {
        shareType = 'email_and_sms';
      } else if (message) {
        shareType = 'sms';
      } else if (email) {
        shareType = 'email';
      } else {
        return;
      }

      const body = {
        share_via: shareType,
        shared_by: me.rep_code,
        share_to,
        attachment_id: content.content_id,
        attachment_type: content.content_format,
      };

      await this.setState({ loading: true });
      const response = await shareContent(body);
      await this.setState({ loading: false });
      if (response !== 'Sharing Scheduled') {
        Toaster.show('Share Failed');
      } else {
        Toaster.show('Shared Successfully!');
      }
      Toaster.show('Shared Successfully!');
    };

    onSearch = (searchText) => {
      this.setState({ searchText });
      const doctors = [];
      this.state.allDoctors.forEach((doctor) => {
        if (doctor.doc_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          doctors.push(doctor);
        }
      });
      this.setState({ doctors });
    };

    render() {
      const { content } = this.props.navigation.state.params;
      const {
        doctors, selectedDocs, refresh, message, email, searchText
      } = this.state;

      return (
        <>
          <FloatingButtonComponent
            navigation={this.props.navigation}
          />
          <ContentHubDetailComponent
            hoverLoading={this.state.loading}
            content={content}
            doctors={doctors}
            selectedDocs={selectedDocs}
            refresh={refresh}
            setSelectedDocs={this.setSelectedDocs}
            setMessageType={this.setMessageType}
            message={message}
            email={email}
            loadPreview={this.loadPreview}
            share={this.share}
            searchText={searchText}
            onSearch={this.onSearch}
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
)(ContentHubDetailContainer);
