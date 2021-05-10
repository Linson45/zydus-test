import React from 'react';
import {
  Body, Container, Content, H3, Icon, ListItem, Text, View
} from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import layoutStyles from '../../../styles/layoutStyles';
import { addPercentageSign } from '../../../util/NumberTrasformer';

export default class RcpaBoListComponent extends React.Component {
  renderList() {
    const { data, onItemPress } = this.props;
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((bo, index) => {
      const {
        name, value, date, rep_code
      } = bo;
      return (
        <ListItem key={rep_code} onPress={() => onItemPress(index)}>
          <Body>
            <Text style={styles.docName}>{name}</Text>
            <View style={styles.rowView}>
              <View style={layoutStyles.col6}>
                <Text note style={styles.docDetails}>
                  Doctors RCPAed
                  :
                  {addPercentageSign(value)}
                </Text>
              </View>
              <View style={layoutStyles.col4}>
                <Text style={styles.iconRight}>
                  <Icon
                    name="arrow-dropright-circle"
                    style={styles.icon}
                  />
                </Text>
              </View>
            </View>
            <Text note style={styles.docDetailsRight}>
              Last Visited Days:
              {date}
            </Text>
          </Body>
        </ListItem>
      );
    });
  }

  render() {
    const { loading, data, date_range } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <H3 style={styles.date_heading}>{date_range}</H3>
          <Content>
            <ScrollView>
              {data ? this.renderList() : null}
            </ScrollView>
          </Content>
        </Container>
      </ParentView>
    );
  }
}
