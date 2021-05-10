import React from 'react';
import {
  Body, Container, Icon, Input, Item, ListItem, Right, Text
} from 'native-base';
import { ImageBackground, ScrollView, View } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ParentView from '../../ParentView';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import TabStyles from '../../../styles/tabStyles';
import ColorStyles from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';

export default class DocListComponent extends React.Component {
  renderList(docs, selectDoctor) {
    const { pendingDocs } = this.props;
    return docs.map((item, index) => {
      const {
        doc_name, doc_code, doc_spec, visit_category, sales_planning
      } = item;
      let { status } = item;
      if (pendingDocs.indexOf(doc_code) !== -1) {
        status = 'Submitted';
      }
      const statusStyle = JSON.parse(JSON.stringify(styles.itemValues));
      if (status.toLowerCase() === 'pending') statusStyle.color = ColorStyles.red;
      else statusStyle.color = ColorStyles.green;
      return (
        <ListItem
          key={index}
          onPress={() => selectDoctor(item)}
          bordered
          style={{
            marginLeft: 0,
          }}
        >
          <Body>
            <Text style={styles.itemHeading}>{doc_name}</Text>
            <Text note style={styles.itemValues}>{doc_spec}</Text>
            <Text note style={styles.itemValues}>
              Visit Category:
              {visit_category}
            </Text>
            <Text
              note
              style={styles.itemValues}
            >
              GSP :
              {' '}
              {sales_planning ? priceFormatWithoutDecimal(sales_planning) : 'NA'}
            </Text>
            <Text note style={statusStyle}>{status}</Text>
          </Body>

          <Right>
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: ColorStyles.black, fontSize: 16 }}
            />
          </Right>
        </ListItem>
      );
    });
  }

  renderTabs() {
    const { data, selectDoctor } = this.props;
    if (data) {
      const { gsp, multivisit, all } = data;
      let gspSubmitted; let gspTotal; let multiSubmitted; let multiTotal; let allSubmitted; let
        allTotal;
      gspSubmitted = gspTotal = multiSubmitted = multiTotal = allSubmitted = allTotal = 0;
      gsp.forEach((doc) => {
        if (doc.status.toLowerCase() !== 'pending') gspSubmitted += 1;
        gspTotal += 1;
      });
      multivisit.forEach((doc) => {
        if (doc.status.toLowerCase() !== 'pending') multiSubmitted += 1;
        multiTotal += 1;
      });
      all.forEach((doc) => {
        if (doc.status.toLowerCase() !== 'pending') allSubmitted += 1;
        allTotal += 1;
      });
      const gspHeading = `GSP DOC \n (${gspSubmitted} / ${gspTotal})`;
      const multiHeading = `MULTIVISIT \n (${multiSubmitted} / ${multiTotal})`;
      const allHeading = `ALL DOC \n (${allSubmitted} / ${allTotal})`;

      return (
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={TabStyles.textStyle.color}
          tabBarActiveTextColor={TabStyles.activeTextStyle.color}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel={gspHeading}>
            <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
              {data ? this.renderList(gsp, selectDoctor) : null}
            </ScrollView>
          </View>
          <View tabLabel={multiHeading}>
            <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
              {data ? this.renderList(multivisit, selectDoctor) : null}
            </ScrollView>
          </View>
          <View tabLabel={allHeading}>
            <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
              {data ? this.renderList(all, selectDoctor) : null}
            </ScrollView>
          </View>
        </ScrollableTabView>
      );
    }
    return null;
  }

  render() {
    const {
      loading, bo_name, searchText, connected
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <ImageBackground
            source={Images.ic_tool_bar_bg}
            style={styles.absoluteFill}
          >
            {bo_name ? (
              <Text style={styles.heading}>
                BO Name :
                {bo_name}
              </Text>
            ) : null}
          </ImageBackground>
          <Item style={{
            margin: 5,
            borderColor: ColorStyles.gray_light_1,
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
                color: ColorStyles.gray_light_1
              }}
            />
            <Input
              onChangeText={(searchQuery) => searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {this.renderTabs()}
        </Container>
      </ParentView>
    );
  }
}
