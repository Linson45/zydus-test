import React from 'react';
import {
  Body, Container, Content, H3, ListItem, Text
} from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';

export default class JfwBoListComponent extends React.Component {
  renderList() {
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((bo) => {
      const {
        name, value, rep_code, date
      } = bo;
      return (
        <ListItem key={rep_code}>
          <Body>
            <Text style={styles.docName}>{name}</Text>
            <Text note style={styles.docDetails}>
              No of JFW Days :
              {value}
            </Text>
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
