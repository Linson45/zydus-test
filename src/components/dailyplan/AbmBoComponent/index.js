import React from 'react';
import {
  Body,
  Container,
  Content,
  Icon,
  ListItem,
  Right,
  Text,
  Item,
  Input,
} from 'native-base';
import { ScrollView, View } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import Colors from '../../../styles/colorsStyles';

export default class AbmBoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
    };
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
      }
    }
  }

  renderList() {
    const { data } = this.props;
    const { searchQuery } = this.state;

    return data.map((bo) => {
      if (searchQuery) {
        if (bo.hasOwnProperty('name') && bo.name) {
          const itemName = bo.name.trim().toLowerCase();
          if (itemName.includes(searchQuery)) {
            return this.renderItem(bo);
          }
        }
      } else {
        return this.renderItem(bo);
      }
      return null;
    });
  }

  renderItem(item) {
    const { name, hq_name, is_jfw } = item;
    const { onPress } = this.props;

    return (
      <ListItem onPress={() => onPress(item)}>
        <Body>
          <Text style={styles.name}>{name}</Text>
          <Text note style={styles.secondaryTitle}>
            (BO,
            {' '}
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
  }

  render() {
    const {
      loading, data, date, changeQuery, connected
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
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 140,
              }}
            >
              Team Members
            </Text>

            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <View style={styles.rightTopRowTextContainer}>
                  <Text style={styles.rightTopRowText}>
                    {moment(date, 'DD-MMM-YYYY').format('DD-MMM')}
                  </Text>
                </View>
                <DatePicker
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    margin: 5,
                    width: 30,
                  }}
                  iconSource={Images.calendarIcon}
                  hideText
                  mode="date"
                  format="DD-MMM-YYYY"
                  minDate={moment()
                    .startOf('month')
                    .format('DD-MMM-YYYY')}
                  maxDate={moment()
                    .add(1, 'M')
                    .endOf('month')
                    .format('DD-MMM-YYYY')}
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
                      justifyContent: 'center',
                    },
                  }}
                  onDateChange={(date) => changeQuery(date)}
                />
              </View>
            </View>
          </View>
          <Content>
            <Item
              style={{
                margin: 5,
                borderColor: Colors.gray_light_1,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Icon
                name="ios-search"
                style={{
                  color: Colors.gray_light_1,
                }}
              />
              <Input
                onChangeText={(searchQuery) => this.searchText({ searchQuery })}
                placeholder="Search"
              />
            </Item>
            <ScrollView ref={(scrollView) => (this._scrollView = scrollView)}>
              {data ? this.renderList() : null}
            </ScrollView>
          </Content>
        </Container>
      </ParentView>
    );
  }
}
