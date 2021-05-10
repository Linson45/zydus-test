import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import VisualAidComponent from '../../../components/detailing/VisualAidComponent';
import colorsStyles from '../../../styles/colorsStyles';
import { createDetailingContentShowcase, deleteDailyShowCase } from '../../../local-storage/helper/detailing';
import Adapter from '../../../util/Adapter';
import { REFRESH_DAILY_PLAN } from '../../../actions';

class VisualAidContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: [],
      content_id: '',
      doc_code: '',
      folderVAPath: '',
      isInternetConnected: true,
      loading: false,
      edit: false,
      title: '',
    };
  }

  async componentDidMount(): void {
    const {
      VA
    } = this.props.navigation.state.params;
    const {
      content_id,
      config,
      doc_code,
      name,
    } = VA;
    const folderVAPath = VA.content_location;
    this.setState({
      config,
      doc_code,
      folderVAPath,
      content_id
    });
    this.props.navigation.setParams({
      toggleEdit: () => { this.toggleEdit(this); }
    });
    this.setState({ title: name });
  }

    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        title: '',
        headerRight:
            (
              <>
                <TouchableOpacity
                  opaque={1}
                  style={{ backgroundColor: 'transparent', padding: 10 }}
                  onPress={() => {
                    if (params && params.toggleEdit) {
                      params.toggleEdit();
                    }
                  }}
                >
                  <Text style={{ color: colorsStyles.contentBlue }}>Edit</Text>
                </TouchableOpacity>
              </>
            )
      };
    };

    modifyConfig(position, has_to_be_shown) {
      const { config } = this.state;
      config[position].has_to_be_shown = has_to_be_shown;
      this.setState({
        config: [...config]
      });
    }

    async saveShowcase() {
      await Adapter.set(REFRESH_DAILY_PLAN, true);
      deleteDailyShowCase(
        this.state.doc_code,
        this.state.content_id
      );
      const {
        config
      } = this.state;
      const {
        VA,
        maxPosition
      } = this.props.navigation.state.params;
      VA.config = config;
      VA.in_showcase = true;
      VA.vaPosition = maxPosition;
      VA.name = this.state.title;
      createDetailingContentShowcase(
        this.state.doc_code,
        this.state.content_id,
        VA
      ).then(() => {
        this.props.navigation.goBack();
      });
    }

    toggleEdit(that) {
      that.setState({
        edit: !this.state.edit
      });
    }

    setTitle = (title) => {
      this.setState({ title });
    };

    render() {
      const {
        isInternetConnected,
        loading,
        edit,
        config,
        folderVAPath,
        title
      } = this.state;
      const {
        VA
      } = this.props.navigation.state.params;
      const saveShowcase = this.saveShowcase.bind(this);
      const toggleEdit = this.toggleEdit.bind(this);
      const modifyConfig = this.modifyConfig.bind(this);
      return (
        <VisualAidComponent
                // doctor={doctor}
          title={title}
          config={config}
          modifyConfig={modifyConfig}
          folderVAPath={folderVAPath}
          loading={loading}
          edit={edit}
          toggleEdit={toggleEdit}
          connected={isInternetConnected}
          VA={VA}
          saveShowcase={saveShowcase}
          setTitle={this.setTitle}
        />
      );
    }
}

export default VisualAidContainer;
