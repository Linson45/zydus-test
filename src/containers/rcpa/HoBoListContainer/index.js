import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  loadRcpaRbmBOs, loadRcpaRegions, loadRcpaSbus, resetRcpaRegions
} from '../../../actions';
import RcpaHoBoComponent from '../../../components/rcpa/HoBoComponent';

class RcpaHoBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      division: null,
      region: null,
      rbm: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Select BO',
    };

    async componentDidMount() {
      // this.props.resetRcpaRegions();

      const { rep_code } = this.props.navigation.state.params.user;
      const data = { rep_code };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.resetRcpaRegions();
              this.props.loadRcpaSbus(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { rep_code } = this.props.navigation.state.params.user;
      const data = { rep_code };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.resetRcpaRegions();
              this.props.loadRcpaSbus(data);
            }
          });
        });
    }

    selectDivision(division) {
      this.props.resetRcpaRegions();
      this.setState({ division, region: null, rbm: null });
      const { company_code, sbu_code } = division;
      this.props.loadRcpaRegions({ company_code, sbu_code });
    }

    selectRegion(region) {
      this.props.resetRcpaRegions();
      this.setState({ region, rbm: null });
      const { company_code, sbu_code } = this.state.division;
      const { region_id } = region;
      const data = { company_code, sbu_code, region_code: region_id };
      this.props.loadRcpaRbmBOs(data);
    }

    selectRbm(rbm) {
      this.props.resetRcpaRegions();
      this.setState({ rbm });
      const { rep_code } = rbm;
      const { company_code, sbu_code } = this.state.division;
      const data = { rep_code, company_code, sbu_code };
      this.props.loadRcpaRbmBOs(data);
    }

    goToRbmDetail(user) {
      const bo_name = user.name;
      this.props.navigation.navigate('RcpaDocList', { user, bo_name });
    }

    render() {
      const { rcpaRegions, rcpaRbmBOs, rcpaSbus } = this.props;
      const { data, loading } = rcpaSbus;
      const selectDivision = this.selectDivision.bind(this);
      const selectRegion = this.selectRegion.bind(this);
      const selectRbm = this.selectRbm.bind(this);
      const hoverLoading = rcpaRegions.loading || rcpaRbmBOs.loading;
      const regions = rcpaRegions.data;
      const bos = rcpaRbmBOs.data;
      const { region, rbm } = this.state;
      const goToRbmDetail = this.goToRbmDetail.bind(this);

      return (
        <RcpaHoBoComponent
          loading={loading}
          divisions={data}
          selectDivision={selectDivision}
          selectRegion={selectRegion}
          selectRbm={selectRbm}
          hoverLoading={hoverLoading}
          regions={regions}
          region={region}
          rbm={rbm}
          bos={bos}
          onPress={goToRbmDetail}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaSbus: state.rcpaSbus,
  rcpaRegions: state.rcpaRegions,
  rcpaRbmBOs: state.rcpaRbmBOs
});

export default connect(
  mapStateToProps,
  {
    loadRcpaSbus, loadRcpaRegions, loadRcpaRbmBOs, resetRcpaRegions
  }
)(RcpaHoBoListContainer);
