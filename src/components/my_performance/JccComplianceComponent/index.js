import React from 'react';
import {
  Body, Container, Content, H3, ListItem, Text
} from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import { addPercentageSign } from '../../../util/NumberTrasformer';

export default class JccComplianceComponent extends React.Component {
  renderList() {
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((bo, index) => {
      const { name, value } = bo;
      return (
        <ListItem key={index}>
          <Body>
            <Text style={styles.docName}>{name}</Text>
            <Text note style={styles.docDetails}>
              JCC Compliance :
              {addPercentageSign(value)}
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
