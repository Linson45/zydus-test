import React from 'react';
import { Text } from 'native-base';
import {
  ScrollView
} from 'react-native';
import ParentView from '../../ParentView';

export default class AddEngagementDetailComponent extends React.Component {
  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          <Text>AddEngagementDetailComponent</Text>
        </ScrollView>
      </ParentView>
    );
  }
}
