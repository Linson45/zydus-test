import React from 'react';
import { Body, ListItem, Text } from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';

export default class AbmSelectionComponent extends React.Component {
  renderList() {
    const { data, select } = this.props;

    if (data && Array.isArray(data)) {
      return data.map((item, index) => (
        <ListItem key={index} onPress={() => select(item)}>
          <Body>
            <Text>
              {item.name}
              {' '}
              (
              {item.rep_code}
              )
            </Text>
            <Text note style={styles.secondaryTitle}>
              (ABM,
              {item.area_desc}
              )
            </Text>
          </Body>
        </ListItem>
      ));
    }
    return null;
  }

  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          {this.renderList()}
        </ScrollView>
      </ParentView>
    );
  }
}
