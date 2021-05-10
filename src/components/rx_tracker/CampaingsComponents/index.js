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

class CampaingsListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
  }

  goToDetailScreen(bo, user) {
    this.props.navigation.navigate('RxDocList', { bo, user });
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
    //   data.sort((a, b) => b.status.localeCompare(a.status));

      return data.map((bo, index) => {
        const {
          campaign_name, campaign_code
        } = bo;

        if (searchQuery) {
          if (campaign_name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
            return null;
          }
        }

        return (
          <ListItem
            key={index}
            onPress={() => this.goToDetailScreen(bo,user)}
            bordered
            style={{
              marginLeft: 0,
            }}
          >
            <Body>
              <Text style={styles.itemHeading}>{campaign_name}</Text>
              <Text note style={styles.itemValues}>
                {campaign_code}
              </Text>
            </Body>

            <Right>
              <Icon
                name="chevron-right"
                type="Entypo"
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

  displayError() {
    return (
      <Text style={{ textAlign: 'center', marginTop: 30 }}>No Data Found</Text>
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
            {data ? this.renderList() : this.displayError()}
          </ScrollView>
        </View>
      </ParentView>
    );
  }
}
export default withNavigation(CampaingsListComponent);
