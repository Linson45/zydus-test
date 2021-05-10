import React from 'react';
import {
  ImageBackground, ScrollView, TouchableOpacity, Text, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import { Fab, Icon } from 'native-base';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyle from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import DoctorDetailComponent from '../DoctorDetailComponent';

export default class RbmComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(false),
      isModalVisible: false
    };
  }

  renderList(doctors) {
    const { showDoctorDetail } = this.props;

    return doctors.map((doctor, index) => {
      const {
        doc_name, doc_code, mcr_no, doc_spec, visit_category, bo_name, bo_code, marketing_efforts
      } = doctor;
      let { rome } = doctor;
      rome = +rome;
      rome = rome.toFixed(2);
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
          </View>
        </TouchableOpacity>
      );
    });
  }

  renderFab() {
    const { goToAddRequest } = this.props;
    return (
      <Fab
        direction="up"
        style={{ backgroundColor: ColorStyle.colorPrimary }}
        position="bottomRight"
        onPress={() => goToAddRequest({})}
      >
        <Icon name="add" />
      </Fab>
    );
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderCollapse() {
    const { doctorEffort } = this.props;
    const { collapsibleToggleArray } = this.state;
    if (doctorEffort && Array.isArray(doctorEffort)) {
      return doctorEffort.map(({ hq_name, hq_code, doctors }, index) => (
        <Collapse
          key={hq_code}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{hq_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {this.renderList(doctors)}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  renderHeader() {
    const { getHeaderInfo, goToPendingRequest } = this.props;
    const { user_name, user_type, area_name } = this.props.user;
    const { marketing_efforts, doc_coverage, rome } = getHeaderInfo();
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.headerName}>{user_name}</Text>
            <Text style={styles.headerSub}>
              {user_type}
              ,
              {' '}
              {area_name}
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => goToPendingRequest()}>
              <Text style={styles.pendingRequest}>
                Check Pending Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerCardView}>
          <View style={{ ...styles.headerCard, backgroundColor: ColorStyle.greenish_sky_blue }}>
            <Text style={styles.headerNumber}>{marketing_efforts}</Text>
            <Text style={styles.headerSubText}>Mktg Efforts</Text>
          </View>

          <View style={{ ...styles.headerCard, backgroundColor: ColorStyle.sky_blue }}>
            <Text style={styles.headerNumber}>{doc_coverage}</Text>
            <Text style={styles.headerSubText}>Doc Covered</Text>
          </View>

          <View style={{ ...styles.headerCard, backgroundColor: ColorStyle.blue }}>
            <Text style={styles.headerNumber}>{rome}</Text>
            <Text style={styles.headerSubText}>ROME</Text>
          </View>

        </View>
      </View>
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

  hideModal() {
    this.setState({ isModalVisible: false });
  }

  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        {this.renderHeader()}
        <ScrollView style={styles.collapseContainer}>
          {this.renderCollapse()}
        </ScrollView>
        {this.renderFab()}
        {this.renderModal()}
      </ParentView>
    );
  }
}
