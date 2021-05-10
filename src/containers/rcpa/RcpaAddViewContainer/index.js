import React from 'react';
import { connect } from 'react-redux';
import { Alert, Platform } from 'react-native';
import { StackActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import RcpaAddViewComponent from '../../../components/rcpa/RcpaAddViewComponent';
import {
  getSubmittedRcpa,
  loadRcpaProductList,
  resetProductList,
  resetSubmittedRcpa,
  submitRcpa
} from '../../../actions/RcpaActions';
import { getCurrentMonth, getCurrentYear } from '../../../util/dateTimeUtil';
import Adapter from '../../../util/Adapter';
import api from '../../../api';
import Urls from '../../../api/urls';
import { createPendingRcpa } from '../../../local-storage/helper/rcpa';

class RcpaAddViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      month: getCurrentMonth(),
      year: getCurrentYear(),
      me: null,
      submittingRcpa: false,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'RCPA View',
    };

    async componentDidMount() {
      const me = await Adapter.getUser();
      this.setState({
        me
      });
      // this.loadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
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
    }

    onCancel() {
      if (!this.state.selectedItems.length) {
        this.props.navigation.goBack();
      }
    }

    submitData = async (selectedItem) => {
      let total = 0;
      const { user, doctor, chemist } = this.props.navigation.state.params;
      const {
        company_code, sbu_code, rep_code, user_id
      } = user;
      const { doc_code } = doctor;
      const { chemist_code } = chemist;
      const payload = {
        company_code,
        sbu_code,
        rep_code,
        doc_code,
        user_id,
        chemist_code,
        mobile_platform: Platform.OS,
        product_details: []
      };
      selectedItem.forEach((brand) => {
        brand.items.forEach((sub_product) => {
          if (sub_product.quantity && sub_product.quantity !== '') {
            const product = {};
            product.brand_code = brand.brand_code;
            product.brand_name = brand.brand_name;
            product.product_code = sub_product.product_code;
            product.is_master = true;
            product.cp_company_code = 'Zydus';
            product.company_name = 'Zydus';
            product.cp_product_code = sub_product.product_code;
            product.comp_product_code = sub_product.product_code;
            product.product_name = sub_product.product_name;
            product.mkt_rate = sub_product.mkt_rate;
            product.quantity = parseInt(sub_product.quantity);
            product.prescribed_qty = parseInt(sub_product.quantity);
            payload.product_details.push(product);
            total = sub_product.mkt_rate * parseInt(sub_product.quantity);
          }
          sub_product.competitors.forEach((competitor) => {
            if (competitor.quantity && competitor.quantity !== '') {
              const product = {};
              product.brand_code = brand.brand_code;
              product.brand_name = brand.brand_name;
              product.product_code = sub_product.product_code;
              product.is_master = false;
              product.cp_company_code = competitor.company_code;
              product.company_name = competitor.company_name;
              product.cp_product_code = competitor.product_code;
              product.comp_product_code = competitor.product_code;
              product.product_name = competitor.product_name;
              product.mkt_rate = sub_product.mkt_rate;
              product.quantity = parseInt(competitor.quantity);
              product.prescribed_qty = parseInt(competitor.quantity);
              total = sub_product.mkt_rate * parseInt(competitor.quantity);
              payload.product_details.push(product);
            }
          });
        });
      });

      this.setState({ submittingRcpa: true });
      const { statusCode } = await api({
        method: 'POST',
        url: Urls.POST_RCPA_DOC,
        data: payload
      });
      this.setState({ submittingRcpa: false });

      if (statusCode === 200) {
        Alert.alert(
          'RCPA submitted',
          'RCPA has been submitted successfully!',
          [{
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 2,
              });
              this.props.navigation.dispatch(popAction);
            }
          },
          ],
          { cancelable: false }
        );
      } else {
        createPendingRcpa(rep_code, chemist_code, doc_code, total, JSON.stringify(payload));
        Alert.alert(
          'RCPA submitted offline!',
          'Your data has been saved offline and will be synced with Frontline when internet is connected.',
          [{
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 2,
              });
              this.props.navigation.dispatch(popAction);
            }
          },
          ],
          { cancelable: false }
        );
      }
    };

    loadData() {
      const { user, doctor, chemist } = this.props.navigation.state.params;
      const { month, year, me } = this.state;
      const { doc_code } = doctor;
      const { chemist_code } = chemist;
      const { rep_code, sbu_code } = me;
      const data = {
        rep_code,
        sbu_code,
        month,
        year
      };

      const data_submitted_rcpa = {
        rep_code: user.rep_code,
        doc_code,
        chem_code: chemist_code
      };
      setTimeout(() => {
        this.props.getSubmittedRcpa(data_submitted_rcpa);
        this.props.loadRcpaProductList(data);
      }, 500);
    }

    renameObjectKey = (data) => {
      const newData = data.map((product) => {
        product.id = product.brand_code;
        product.name = product.brand_name;
        const newItems = product.items.map((items) => {
          items.id = items.product_code;
          items.name = items.product_name;
          const new_competitors = items.competitors.map((competitors) => {
            competitors.id = competitors.product_code;
            competitors.name = competitors.product_name;
            return competitors;
          });
          items.competitors = new_competitors;
          return items;
        });
        product.items = newItems;
        return product;
      });
      return newData;
    };

    componentWillUnmount() {
      this.props.resetProductList();
      this.props.resetSubmittedRcpa();
    }

    goToDoctorList = () => {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('RcpaDocList', { user });
    };

    render() {
      const { loading, data } = this.props.rcpaProductList;
      const loading1 = this.props.submittedRcpa.loading;
      const data2 = this.props.submittedRcpa.data;
      const { chemist, doctor } = this.props.navigation.state.params;
      const onCancel = this.onCancel.bind(this);
      const { submittingRcpa } = this.state;

      return (
        <RcpaAddViewComponent
          hoverLoading={submittingRcpa}
          loading={loading || loading1}
          brands={data ? this.renameObjectKey(data) : null}
          addRcpa={this.addRcpa}
          chemist={chemist}
          doctor={doctor}
          submitData={this.submitData}
          submittedRcpa={data2}
          postRcpa={this.props.rcpaPost}
          gotoList={this.goToDoctorList}
          onCancel={onCancel}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaProductList: state.rcpaProductList,
  rcpaPost: state.rcpaPost,
  submittedRcpa: state.submittedRcpa
});

export default connect(
  mapStateToProps,
  {
    loadRcpaProductList, submitRcpa, resetProductList, getSubmittedRcpa, resetSubmittedRcpa
  }
)(RcpaAddViewContainer);
