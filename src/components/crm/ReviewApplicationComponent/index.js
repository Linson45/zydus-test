import React from 'react';
import { Input } from 'native-base';
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ApplicationComponent from '../ApplicationComponent';

export default class ReviewApplicationComponent extends React.Component {
  renderApplication() {
    let { data } = this.props;
    if (data) data = data[0];
    if (data) {
      const {
        brands, type_of_engagement, type_of_sponsorship, name_of_activity, recommended_by, reason,
        no_of_red_flag, matrics, current_support, expected_support, proposed_exp, curr_rome,
        estimated_rome, month, past_engagemet
      } = data;
      let { bo_details, doc_details } = data;
      if (bo_details) bo_details = bo_details[0];
      if (doc_details) doc_details = doc_details[0];

      const engagement_details = {
        brands,
        type_of_engagement,
        type_of_sponsorship,
        name_of_activity,
        recommended_by,
        reason
      };
      const doctor_metrics = {
        red_flag: no_of_red_flag,
        matrics,
        current_support,
        expected_support,
        proposed_exp,
        curr_rome,
        estimated_rome,
        month
      };
      const doctor_details = {
        bo_details,
        doc_details,
        past_engagemet
      };
      return (
        <ApplicationComponent
          engagement_details={engagement_details}
          reason_of_engagement={reason}
          doctor_metrics={doctor_metrics}
          doctor_details={doctor_details}
        />
      );
    }
    return null;
  }

  renderHeader() {
    const { comment, setComment } = this.props;
    return (
      <View style={styles.header}>
        <Input
          style={styles.input}
          placeholder="Add Comment"
          value={comment}
          onChangeText={((text) => (setComment(text)))}
        />

        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text style={styles.buttonLeft}>REJECT</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.buttonRight}>APPROVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          {this.renderHeader()}
          {this.renderApplication()}
        </ScrollView>
      </ParentView>
    );
  }
}
