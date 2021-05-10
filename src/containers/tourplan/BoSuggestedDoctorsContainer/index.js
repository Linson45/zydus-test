import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadTourPlanSuggestedDoctors } from '../../../actions';
import BoSuggestedDoctorsComponent from '../../../components/tourplan/BoSuggestedDoctorsComponent';
import Colors from '../../../Constants/colorConstants';
import colorsStyles from '../../../styles/colorsStyles';
import Adapter from '../../../util/Adapter';

class TourplanBoSuggestedDoctorsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bo_data: {},
      selectedDr: [],
      isInternetConnected: true
    };
  }

    static navigationOptions = ({ navigation }) => {
      const saveFn = navigation.getParam('saveFn');
      return {
        title: 'Doctors List',
        headerRight: (
          <>
            <TouchableOpacity
              opaque={1}
              style={{ backgroundColor: 'transparent', padding: 10, color: Colors.white }}
              onPress={() => {
                saveFn();
              }}
              color="#fff"
            >
              <Icon name="save" type="FontAwesome" style={{ color: colorsStyles.white }} />
            </TouchableOpacity>
          </>
        )
      };
    };

    componentDidMount() {
      this.props.navigation.setParams({
        saveFn: this.save.bind(this)
      });
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
      const { bo_data } = this.props.navigation.state.params;
      const data = {};
      const selectedDr = [];
      for (const value of bo_data) {
        data[value.doc_code] = value;
        selectedDr.push(value);
      }
      this.setState({
        bo_data: data,
        selectedDr
      });
    }

    onRefresh = () => {
      this.props.navigation.setParams({
        saveFn: this.save.bind(this)
      });
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
      const { bo_data } = this.props.navigation.state.params;
      const data = {};
      const selectedDr = [];
      for (const value of bo_data) {
        data[value.doc_code] = value;
        selectedDr.push(value);
      }
      this.setState({
        bo_data: data,
        selectedDr
      });
    }

    addDoctor(doctor) {
      const data = { ...this.state.bo_data };
      if (data[doctor.doc_code]) {
        delete data[doctor.doc_code];
      } else {
        data[doctor.doc_code] = doctor;
      }
      const selectedDr = [];
      for (const key in data) {
        selectedDr.push(data[key]);
      }
      this.setState({
        bo_data: data,
        selectedDr
      });
    }

    loadData() {
      const { user, date } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadTourPlanSuggestedDoctors(data);
    }

    async save() {
      await Adapter.set('TP_DR_SELECTED', this.state.selectedDr);
      this.props.navigation.goBack();
    }

    render() {
      const { loading, data } = this.props.tourplanSuggestedDoctors;
      const { bo_data, selectedDr } = this.state;
      const addDoctor = this.addDoctor.bind(this);
      return (
        <BoSuggestedDoctorsComponent
          data={data}
          selectedDr={selectedDr}
          bo_data={bo_data}
          addDoctor={addDoctor}
          loading={loading}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanSuggestedDoctors: state.tourplanSuggestedDoctors
});

export default connect(
  mapStateToProps,
  { loadTourPlanSuggestedDoctors }
)(TourplanBoSuggestedDoctorsContainer);
