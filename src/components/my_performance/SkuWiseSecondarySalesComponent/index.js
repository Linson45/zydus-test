import React from 'react';
import {
  Body, Container, Content, H3, ListItem, View
} from 'native-base';
import { ScrollView, Text } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import { displayDecimal, numberTransformer } from '../../../util/NumberTrasformer';

export default class SkuWiseSecondarySalesComponent extends React.Component {
  renderList() {
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((item) => {
      const {
        id, section_1, section_2, section_3, section_4, title
      } = item;

      return (
        <ListItem key={id}>
          <Body>
            <Text style={styles.itemHeading}>{title}</Text>

            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_1.label}</Text>
                <Text style={styles.itemValues}>{numberTransformer(section_1.value, 2)}</Text>

                <Text style={styles.itemMarginTop}>{section_3.label}</Text>
                <Text style={styles.itemValues}>{numberTransformer(section_3.value, 2)}</Text>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_2.label}</Text>
                <Text style={styles.itemValues}>
                  {section_2.value}
                  {' '}
                  %
                </Text>

                <Text style={styles.itemMarginTop}>{section_4.label}</Text>
                <Text style={styles.itemValues}>
                  {displayDecimal(section_4.value)}
                  {' '}
                  %
                </Text>
              </View>
            </View>
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
