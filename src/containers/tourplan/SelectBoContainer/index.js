import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import { loadTeamWise } from '../../../actions';
import SelectBoComponent from '../../../components/tourplan/SelectBoComponent';
import Colors from '../../../Constants/colorConstants';
import colorsStyles from '../../../styles/colorsStyles';
import Adapter from '../../../util/Adapter';

class TourplanSelectBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBo: [],
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
      const { bo_codes } = this.props.navigation.state.params;
      this.setState({
        selectedBo: bo_codes
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
      const { bo_codes } = this.props.navigation.state.params;
      this.setState({
        selectedBo: bo_codes
      });
    }

    addBo(rep_code) {
      if (this.state.selectedBo === undefined) {
        const selectedBo = this.state.selectedBo === undefined ? [] : [];
        if (selectedBo.indexOf(rep_code) > -1) {
          _.remove(selectedBo, (n) => n === rep_code);
        } else {
          selectedBo.push(rep_code);
        }
        this.setState({
          selectedBo
        });
      } else {
        const selectedBo = this.state.selectedBo.length > 0 ? this.state.selectedBo.splice(0) : [];
        if (selectedBo.indexOf(rep_code) > -1) {
          _.remove(selectedBo, (n) => n === rep_code);
        } else {
          selectedBo.push(rep_code);
        }
        this.setState({
          selectedBo
        });
      }
    }

    loadData() {
      const { user } = this.props.navigation.state.params;
      const {
        rep_code, company_code, sbu_code, user_type, date
      } = user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadTeamWise(data);
    }

    async save() {
      const { data, loading } = this.props.tourplanTeamWise;
      const { selectedBo } = this.state;
      if (!loading) {
        const selectedName = data.bo_list
          .filter((bo) => selectedBo.indexOf(bo.rep_code) > -1);
        await Adapter.set('TP_BO_SELECTED', selectedName);
      }
      this.props.navigation.goBack();
    }

    render() {
      const { loading, data } = this.props.tourplanTeamWise;
      const { selectedBo } = this.state;
      const addBo = this.addBo.bind(this);
      return (
        <SelectBoComponent
          data={data}
          loading={loading}
          selectedBo={selectedBo}
          addBo={addBo}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanTeamWise: state.tourplanTeamWise
});

export default connect(
  mapStateToProps,
  { loadTeamWise }
)(TourplanSelectBoContainer);
