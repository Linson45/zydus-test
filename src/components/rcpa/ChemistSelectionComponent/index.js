import React, { Component } from 'react';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
  Body, Icon, ListItem, Right
} from 'native-base';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';
import Colors from '../../../styles/colorsStyles';

class ChemistSelectionComponent extends Component {
  renderData() {
    const {
      changeChemist, data, doctor, chemist, goToHistory, addRcpa
    } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.ChemistSelectionBanner}
          resizeMode="stretch"
          style={styles.bannerStyle}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.year}>
              {getFullMonthString(getCurrentMonth())}
              {' '}
              {getCurrentYear()}
            </Text>
          </View>
        </ImageBackground>
        <View>
          <Dropdown
            label="Doctor"
            value={doctor.doc_name}
            data={[{ value: doctor.doc_code, label: doctor.doc_name }]}
          />
          <Dropdown
            label="Chemist"
            value="Select Chemist"
            data={data}
            valueExtractor={({ chemist_code }) => chemist_code}
            labelExtractor={({ chemist_name }) => chemist_name}
            onChangeText={(value, index, data) => {
              changeChemist(data[index]);
            }}
          />
        </View>
        {chemist && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              addRcpa(doctor);
            }}
          >
            <Text style={styles.buttonText}>Add/Edit RCPA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
            <Text style={styles.buttonText}>View History</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
    );
  }

  renderPendingLogs() {
    const { pendingLogs, onPress, me } = this.props;
    if (pendingLogs) {
      return pendingLogs.map((log, index) => {
        const { creation_date, total } = log;
        return (
          <ListItem
            key={index}
            onPress={() => onPress(log)}
            bordered
            style={{
              marginLeft: 0,
            }}
          >
            <Image source={Images.ic_sync_red_600_24dp} style={{ width: 50, height: 50, marginRight: 10 }} />
            <Body>
              <Text style={styles.itemHeading}>{creation_date}</Text>
              <Text note style={styles.itemValues}>
                RCPA Value : ₹
                {total}
              </Text>
              <Text note style={styles.itemValues}>
                Saved By:
                {me ? me.user_name : ''}
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
    return null;
  }

  renderLogs() {
    const { logs, onPress } = this.props;
    if (logs) {
      return logs.map((log, index) => {
        const { creation_date, price, created_by } = log;
        return (
          <ListItem
            key={index}
            onPress={() => onPress(log)}
            bordered
            style={{
              marginLeft: 0,
            }}
          >
            <Body>
              <Text style={styles.itemHeading}>{creation_date}</Text>
              <Text note style={styles.itemValues}>
                RCPA Value : ₹
                {price}
              </Text>
              <Text note style={styles.itemValues}>
                Saved By:
                {created_by}
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
    return null;
  }

  render() {
    const {
      loading, data, hoverLoading, connected
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        data={data}
        hoverLoading={hoverLoading}
        style={styles.container}
      >
        <ScrollView style={{
          paddingHorizontal: 15
        }}
        >
          {data ? this.renderData() : null}
          {this.renderPendingLogs()}
          {this.renderLogs()}
        </ScrollView>
      </ParentView>
    );
  }
}

export default ChemistSelectionComponent;
