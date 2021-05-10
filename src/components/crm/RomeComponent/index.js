import React from 'react';
import { Text } from 'native-base';
import {
  ImageBackground, ScrollView, TouchableOpacity, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import DoctorDetailComponent from '../DoctorDetailComponent';
import ColorStyle from '../../../styles/colorsStyles';

export default class RomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      collapsibleToggleArray: new Array(100).fill(false)
    };
  }

  renderHeader() {
    const { getHeaderInfo } = this.props;

    const { marketing_efforts, doc_coverage, rome } = getHeaderInfo();
    return (
      <View style={styles.header}>
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

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderList() {
    const { doctors, showDoctorDetail } = this.props;
    const { collapsibleToggleArray } = this.state;

    if (doctors && Array.isArray(doctors)) {
      return doctors.map(({ hq_name, hq_code, doctors }, index) => (
        <Collapse
          key={hq_code}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
          style={styles.container}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={Images.myPerformanceListHeader}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{hq_name}</Text>
              <Text style={styles.headerRowSubText}>ROME: 0.0</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {
                                    doctors.map((doctor, index) => {
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
                                          </View>
                                        </TouchableOpacity>
                                      );
                                    })
                                }
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
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
      >
        <ScrollView>
          {this.renderHeader()}
          {this.renderList()}
          {this.renderModal()}
        </ScrollView>
      </ParentView>
    );
  }
}
