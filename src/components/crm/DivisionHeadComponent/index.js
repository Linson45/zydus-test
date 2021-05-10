import React from 'react';
import { Card } from 'native-base';
import {
  Text, ScrollView, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import Colors from '../../../styles/colorsStyles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import DoctorDetailComponent from '../DoctorDetailComponent';
import RedFlagComponent from '../RedFlagComponent';

export default class DivisionHeadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isRedFlagModalVisible: false
    };
  }

  renderHeader() {
    const {
      goToRome, goToRedFlag, goToCoverage, goToPendingApproval
    } = this.props;
    let { dashboard_tile } = this.props;

    if (dashboard_tile) dashboard_tile = dashboard_tile[0];

    if (dashboard_tile) {
      return (
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Card style={styles.headerView}>
              <TouchableOpacity onPress={() => goToRome()}>
                <Text style={styles.headerHeading}>ROME</Text>
                <Text style={styles.headerNumber}>{dashboard_tile.rome_avg}</Text>
                <Text style={styles.headerNumberText}>Avg Rome</Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.headerView, backgroundColor: Colors.blue }}>
              <TouchableOpacity onPress={() => goToRedFlag()}>
                <Text style={styles.headerHeading}>Red Flags</Text>
                <Text style={styles.headerNumber}>
                  {dashboard_tile.red_flag_per}
                  {' '}
                  %
                </Text>
                <Text style={styles.headerNumberText}>% Rxers with Red Flags</Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={styles.headerRow}>
            <Card style={{ ...styles.headerView, backgroundColor: Colors.colorPrimary }}>
              <TouchableOpacity onPress={() => goToPendingApproval()}>
                <Text style={styles.headerHeading}>Pending Approval</Text>
                <Text style={styles.headerNumber}>{dashboard_tile.pending_approval}</Text>
                <Text style={styles.headerNumberText}># of Pending Requests</Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.headerView, backgroundColor: Colors.greenish_sky_blue }}>
              <TouchableOpacity onPress={() => goToCoverage()}>
                <Text style={styles.headerHeading}>Coverage</Text>
                <Text style={styles.headerNumber}>
                  {dashboard_tile.coverage}
                  {' '}
                  %
                </Text>
                <Text style={styles.headerNumberText}>Coverage of Rxers</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      );
    }
    return null;
  }

  renderHeaderButtons() {
    const { goToAddRequest, showRedFlags } = this.props;

    return (
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={() => goToAddRequest()}>
          <Text style={styles.headerButtonText}>Add New CRM Rxers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButtonRight}
          onPress={() => {
            showRedFlags();
            this.setState({ isRedFlagModalVisible: true });
          }}
        >
          <Text style={styles.headerButtonText}>Update Red Flags Threshold</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTop50Header() {
    return (
      <View style={styles.top50Header}>
        <Text style={styles.top50HeaderText}>View Top 50 Rxers</Text>
      </View>
    );
  }

  renderItems() {
    const { dashboard_top50 } = this.props;

    if (dashboard_top50) {
      return dashboard_top50.map((doctor) => this.renderItem(doctor));
    }
    return null;
  }

  renderItem(doctor, index) {
    const { showDoctorDetail } = this.props;
    const {
      doc_code, mcr_no, doc_name, doc_spec, visit_category, bo_name, bo_code, marketing_efforts, rome
    } = doctor;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.setState({ isModalVisible: true });
          showDoctorDetail(doctor);
        }}
        style={styles.item}
      >
        <Text style={styles.mcr}>
          #
          {mcr_no}
        </Text>
        <Text style={styles.name}>
          {doc_name}
          {' '}
          (
          {doc_code}
          )
        </Text>
        <Text style={styles.subText}>
          {doc_spec}
          {' '}
          (
          {visit_category}
          )
        </Text>
        <Text style={styles.subText}>
          {bo_name}
          {' '}
          (
          {bo_code}
          )
        </Text>
        <View style={styles.views}>
          <View style={styles.roundView}>
            <Text style={styles.marketingEfforts}>{priceFormatWithoutDecimal(marketing_efforts)}</Text>
            <Text style={styles.effortText}>Marketing Efforts</Text>
          </View>

          <View style={{ ...styles.roundView, marginLeft: 10 }}>
            <Text style={styles.romeEfforts}>{rome}</Text>
            <Text style={styles.effortText}>ROME</Text>
          </View>

          <View style={{ ...styles.roundView, marginLeft: 10 }}>
            <Text style={styles.marketingEfforts}>0</Text>
            <Text style={styles.effortText}>Red Flags</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderModal() {
    const { loading, data } = this.props.crmDoctorDetail;
    const { isModalVisible } = this.state;
    const hideModal = this.hideModal.bind(this);

    return (
      <DoctorDetailComponent
        isVisible={isModalVisible}
        hideModal={hideModal}
        loading={loading}
        data={data}
      />
    );
  }

  renderRedFlagModal() {
    const { loading, data } = this.props.crmRedFlags;
    const { isRedFlagModalVisible } = this.state;
    const hideModal = this.hideRedFlagModal.bind(this);

    return (
      <RedFlagComponent
        isVisible={isRedFlagModalVisible}
        hideModal={hideModal}
        loading={loading}
        data={data}
      />
    );
  }

  hideModal() {
    this.setState({ isModalVisible: false });
  }

  hideRedFlagModal() {
    this.setState({ isRedFlagModalVisible: false });
  }

  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          {this.renderHeader()}
          {this.renderHeaderButtons()}
          {this.renderTop50Header()}
          {this.renderItems()}
          {this.renderModal()}
          {this.renderRedFlagModal()}
        </ScrollView>
      </ParentView>
    );
  }
}
