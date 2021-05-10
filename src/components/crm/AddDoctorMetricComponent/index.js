import React from 'react';
import {
  Card, Input, Item, Label, Text, Form
} from 'native-base';
import {
  ScrollView, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorsStyles from '../../../styles/colorsStyles';
import { getMonthString } from '../../../util/dateTimeUtil';
import { priceFormatWithDecimal } from '../../../util/NumberTrasformer';

export default class AddDoctorMetricComponent extends React.Component {
  renderHeader() {
    const { doc_matrics } = this.props;
    if (doc_matrics) {
      const { red_flag, month, matrics } = doc_matrics;
      return (
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={{ flex: 6 }}>No of Red Flags</Text>
            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[0]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[1]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{red_flag[2]}</Text>
            </View>
          </View>

          <Card>
            <View style={styles.cardHeading}>
              <Text style={{ flex: 6, color: ColorsStyles.white, marginRight: 15 }}>Parameter (Division Norm)</Text>
              <Text style={styles.month}>{getMonthString(month[0])}</Text>
              <Text style={styles.month}>{getMonthString(month[1])}</Text>
              <Text style={styles.month}>{getMonthString(month[2])}</Text>
            </View>

            {
                            matrics.map(({
                              title, subTitle, val1_flag, val2_flag, val3_flag, value1, value2, value3
                            }, index) => {
                              let color_1 = ColorsStyles.gray;
                              let color_2 = ColorsStyles.gray;
                              let color_3 = ColorsStyles.gray;
                              if (val1_flag) color_1 = ColorsStyles.red;
                              if (val2_flag) color_2 = ColorsStyles.red;
                              if (val3_flag) color_3 = ColorsStyles.red;

                              return (
                                <View style={styles.cardRow} key={index}>
                                  <Text style={styles.cardTitle}>
                                    {index !== 0 ? title : 'GSP'}
                                    {' '}
                                    {subTitle}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_1 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value1) : value1}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_2 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value2) : value2}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_3 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value3) : value3}
                                  </Text>
                                </View>
                              );
                            })
                        }

          </Card>
        </View>
      );
    }
    return null;
  }

  renderBody() {
    const {
      doc_matrics, updateProposedExpense, proposed_exp, updateExpectedExpense, expected_supp
    } = this.props;
    if (doc_matrics) {
      return (
        <View>
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Proposed Expense</Label>
              <Input onChangeText={(text) => updateProposedExpense(text)} value={proposed_exp} />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Current Support (12 months RCPA)</Label>
              <Input disabled value={doc_matrics.rcpa_12_mon.toString()} />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Current ROME (Current Support / Proposed Expense)</Label>
              <Input disabled value={proposed_exp ? (doc_matrics.rcpa_12_mon / +proposed_exp).toFixed(1).toString() : ''} />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Total Expected Support (12 months)</Label>
              <Input onChangeText={(text) => updateExpectedExpense(text)} value={expected_supp} />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Estimated ROME (Total Expected Support / Proposed Expense)</Label>
              <Input disabled value={proposed_exp ? (+expected_supp / +proposed_exp).toFixed(1).toString() : ''} />
            </Item>

          </Form>
        </View>
      );
    }
    return null;
  }

  renderFooter() {
    const { next } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={() => next()}>
        <Text style={styles.bottomButtonText}>Save & Next</Text>
      </TouchableOpacity>
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
          {this.renderBody()}
          {this.renderFooter()}
        </ScrollView>
      </ParentView>
    );
  }
}
