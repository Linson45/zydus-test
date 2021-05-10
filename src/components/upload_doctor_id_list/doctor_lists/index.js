import React from 'react';
import {
  Body, Input, Item, ListItem, Right, Text
} from 'native-base';
import { ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorStyle from '../../../styles/colorsStyles';
import styles from './styles';
import ParentView from '../../ParentView';

class UploadDoctorListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
  }

  goToDetailScreen(data, userData) {
    this.props.navigation.navigate('UploadDocumentDetail', { data, userData });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        this.setState({ searchQuery: searchEvent.searchQuery });
      }
    }
  }

  renderList() {
    const { data, user } = this.props;
    const { searchQuery } = this.state;

    if (data.length !== 0) {
      data.sort((a, b) => b.status.localeCompare(a.status));

      return data.map((bo, index) => {
        const {
          doc_name,
          doc_code,
          qualification,
          spec_desc,
          mcr_no,
          status,
        } = bo;

        if (searchQuery) {
          if (doc_name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
            return null;
          }
        }

        const statusStyle = JSON.parse(JSON.stringify(styles.itemValues));
        if (status.toLowerCase() === 'pending') statusStyle.color = 'blue';
        else if (status.toLowerCase() === 'rejected') statusStyle.color = 'red';
        else statusStyle.color = 'green';

        return (
          <ListItem
            key={index}
            onPress={() => this.goToDetailScreen(bo, user)}
            bordered
            style={{
              marginLeft: 0,
            }}
          >
            <Body>
              <Text style={styles.itemHeading}>{doc_name}</Text>
              <Text note style={styles.itemValues}>
                {doc_code}
              </Text>
              <Text note style={styles.itemValues}>
                {qualification}
              </Text>
              <Text note style={styles.itemValues}>
                {spec_desc}
              </Text>
              <Text note style={styles.itemValues}>
                {mcr_no}
              </Text>
              <Text note style={statusStyle}>
                {status}
              </Text>
            </Body>

            <Right>
              <Icon
                name="plus-circle"
                type="AntDesign"
                style={{ color: 'grey', fontSize: 16 }}
              />
            </Right>
          </ListItem>
        );
      });
    }
    return (
      <View
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.itemHeading}> No data found </Text>
      </View>
    );
  }

  displayJsxMessage() {
    return (
      <Item
        style={{
          margin: 5,
          borderColor: ColorStyle.gray_light_1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}
      >
        <Icon
          name="search"
          style={{
            color: ColorStyle.gray_light_1,
            fontSize: 25,
          }}
        />
        <Input
          onChangeText={(searchQuery) => this.searchText({ searchQuery })}
          placeholder="Search"
        />
      </Item>
    );
  }

  render() {
    const { loading, data } = this.props;
    console.log(data);
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <View style={{ flexDirection: 'column' }}>
          <View style={{
            marginTop: 15,
            marginRight: 15,
            marginLeft: 15
          }}
          >
            {this.displayJsxMessage()}
          </View>

          <ScrollView
            style={{
              paddingHorizontal: 15,
              marginBottom: 60
            }}
          >
            {data ? this.renderList() : null}
          </ScrollView>
        </View>
      </ParentView>
    );
  }
}
export default withNavigation(UploadDoctorListComponent);
