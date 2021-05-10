import React, { Component } from 'react';
import {
  Body, Icon, ListItem, Right
} from 'native-base';
import {
  ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import ColorStyle from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';

class RcpaHoBoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: [false, false],
    };
  }

  renderList(bos) {
    const { onPress } = this.props;

    return bos.map((bo, index) => {
      const { name, hq_name, completion } = bo;

      const completionStyle = { marginTop: 5 };
      if (completion > 50) {
        completionStyle.color = ColorStyle.green;
      } else {
        completionStyle.color = ColorStyle.red;
      }

      return (
        <ListItem key={index} onPress={() => onPress(bo)}>
          <Body>
            <Text style={styles.name}>{name}</Text>
            <Text note style={styles.secondaryTitle}>
              (BO,
              {' '}
              {hq_name}
              )
            </Text>
            <Text note style={completionStyle}>
              Completion:
              {' '}
              {completion.toFixed(2)}
              {' '}
              %
            </Text>
          </Body>

          <Right>
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: ColorStyle.black, fontSize: 16 }}
            />
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
    if (bos) {
      return bos.map(({ area_id, area_name, bos }, index) => (
        <Collapse
          key={area_id}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={
                  this.state.collapsibleToggleArray[index]
                    ? Images.myPerformanceListHeaderUp
                    : Images.myPerformanceListHeaderDown
                }
              style={styles.headerImageBg}
            >
              <Text style={styles.headerText}>{area_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>{this.renderList(bos)}</ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  render() {
    const {
      loading,
      divisions,
      selectDivision,
      hoverLoading,
      region,
      selectRegion,
      connected
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

export default RcpaHoBoComponent;
