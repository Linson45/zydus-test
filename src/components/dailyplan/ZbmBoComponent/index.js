import React from 'react';
import {
  Body, Container, Content, Icon, ListItem, Right, Text
} from 'native-base';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';
import Colors from '../../../styles/colorsStyles';

export default class ZbmBoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(true)
    };
  }

  renderList(bos) {
    const { onPress } = this.props;

    return bos.map((bo, index) => {
      const { name, hq_name } = bo;

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
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: Colors.black, fontSize: 16 }}
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
    const { data } = this.props;
    const { collapsibleToggleArray } = this.state;

    if (data && Array.isArray(data)) {
      return data.map(({ region_id, region_name, bos }, index) => (
        <Collapse
          key={region_id}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={collapsibleToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
              resizeMode="contain"
            >
              <Text style={styles.headerText}>
                {region_name}
                {' '}
                (ZBM)
              </Text>
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
      loading, date, changeQuery, connected
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <View style={styles.topRow}>
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
          <Content>
            {this.renderCollapse()}
          </Content>
        </Container>
      </ParentView>
    );
  }
}
