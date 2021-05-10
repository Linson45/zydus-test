import React, { Component } from 'react';
import {
  Body, Icon, ListItem, Right, Text
} from 'native-base';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Images from '../../../Constants/imageConstants';
import ParentView from '../../ParentView';
import styles from './styles';
import Colors from '../../../styles/colorsStyles';

class HoBoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(true)
    };
  }

  renderList(bos) {
    const { onPress } = this.props;

    return bos.map((bo, index) => {
      const { name, hq_name, is_jfw } = bo;

      return (
        <ListItem key={index} onPress={() => onPress(bo)}>
          <Body>
            <Text style={styles.name}>{name}</Text>
            <Text note style={styles.secondaryTitle}>
              (BO,
              {hq_name}
              )
            </Text>
          </Body>

          <Right>
            <View style={styles.rightAlign}>
              {is_jfw ? <Text style={styles.masterTitle}>JFW</Text> : null}
              <Icon
                name="rightcircle"
                type="AntDesign"
                style={{ color: Colors.black, fontSize: 16 }}
              />
            </View>
          </Right>
        </ListItem>
      );
    });
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderCollapse() {
    const { bos } = this.props;
    const { collapsibleToggleArray } = this.state;

    if (bos) {
      return bos.map(({ area_id, area_name, bos }, index) => (
        <Collapse
          key={area_id}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>{area_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {this.renderList(bos)}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  render() {
    const {
      loading, divisions, selectDivision, hoverLoading, region, selectRegion, changeQuery, date, connected
    } = this.props;
    let { regions } = this.props;
    if (!regions) regions = [];

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
        style={styles.container}
      >
        <View style={styles.topRow}>
          <Text style={{ alignSelf: 'center', marginLeft: 140 }}>Team Members</Text>
          <View style={styles.rightTopRow}>
            <View style={styles.rightTopRowContainer}>
              <View style={styles.rightTopRowTextContainer}>
                <Text style={styles.rightTopRowText}>
                  {moment(date, 'DD-MMM-YYYY').format('DD-MMM')}
                </Text>
              </View>
              <DatePicker
                style={{
                  paddingTop: 2, paddingBottom: 2, margin: 5, width: 30
                }}
                iconSource={Images.calendarIcon}
                hideText
                mode="date"
                format="DD-MMM-YYYY"
                minDate={moment().startOf('month').format('DD-MMM-YYYY')}
                maxDate={moment().add(1, 'M').endOf('month').format('DD-MMM-YYYY')}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width: 25,
                    height: 25,
                  },
                  dateTouchBody: {
                    flexDirection: 'row',
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center'
                  },
                }}
                onDateChange={(date) => changeQuery(date)}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.dropDownView}>
            <Dropdown
              label="Select Division"
              data={divisions}
              valueExtractor={({ sbu_code }) => sbu_code}
              labelExtractor={({ sbu_name }) => sbu_name}
              onChangeText={(value, index, data) => {
                selectDivision(data[index]);
              }}
            />
          </View>

          <View style={styles.dropDownView}>
            <Dropdown
              label="Select Region"
              data={regions}
              value={region ? region.region_name : ''}
              valueExtractor={({ region_id }) => region_id}
              labelExtractor={({ region_name }) => region_name}
              onChangeText={(value, index, data) => {
                selectRegion(data[index]);
              }}
            />
          </View>

          {this.renderCollapse()}
        </ScrollView>
      </ParentView>
    );
  }
}

export default HoBoComponent;
