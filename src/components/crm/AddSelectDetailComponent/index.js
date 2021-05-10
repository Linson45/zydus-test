import React from 'react';
import {
  Card, Icon, CardItem, Text
} from 'native-base';
import {
  ScrollView, TouchableOpacity, View
} from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';

export default class AddSelectDetailComponent extends React.Component {
  renderTop() {
    const {
      abm, bo, doctor, goToSelectAbm, goToSelectBo, goToSelectDoctor
    } = this.props;
    return (
      <View style={styles.top}>
        <TouchableOpacity style={styles.topButton} onPress={() => goToSelectAbm()}>
          {abm
            ? (
              <View>
                <Text style={styles.topButtonFloatHint}>Select ABM</Text>
                <Text style={styles.topButtonText}>{abm.name}</Text>
              </View>
            )
            : <Text style={styles.topButtonHint}>Select ABM</Text>}
          <Icon name="arrow-dropright" style={styles.topButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} onPress={() => goToSelectBo()}>
          {bo
            ? (
              <View>
                <Text style={styles.topButtonFloatHint}>Select BO</Text>
                <Text style={styles.topButtonText}>{bo.name}</Text>
              </View>
            )
            : <Text style={styles.topButtonHint}>Select BO</Text>}
          <Icon name="arrow-dropright" style={styles.topButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} onPress={() => goToSelectDoctor()}>
          {doctor
            ? (
              <View>
                <Text style={styles.topButtonFloatHint}>Select Doctor</Text>
                <Text style={styles.topButtonText}>{doctor.doc_name}</Text>
              </View>
            )
            : <Text style={styles.topButtonHint}>Select Doctor</Text>}
          <Icon name="arrow-dropright" style={styles.topButtonIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  renderEngagement() {
    const { engagement, doctor } = this.props;

    if (engagement) {
      const { BO_details, DR_details } = engagement;
      return (
        <View>
          <Card style={styles.card}>
            <CardItem style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>BO Details:</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>HQ Primary Sales % Ach:</Text>
                <Text style={styles.cardItemText}>{BO_details.hq_primary_sales_ach}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Regional Primary Sales % Ach:</Text>
                <Text style={styles.cardItemText}>{BO_details.reginal_primary_sales_ach}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>HQ Secondary Sales (% of Primary Sales):</Text>
                <Text style={styles.cardItemText}>{BO_details.hq_secondary_sales_ach}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>DOH:</Text>
                <Text style={styles.cardItemText}>{BO_details.doh}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}># ofBO Visits last month:</Text>
                <Text style={styles.cardItemText}>{BO_details.visit ? BO_details.visit : 0}</Text>
              </View>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Doctor Details:</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Doctor Name:</Text>
                <Text style={styles.cardItemText}>
                  {doctor.doc_name}
                  {' '}
                  (
                  {doctor.doc_code}
                  ,
                  {' '}
                  {doctor.visit_category}
                  )
                </Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Doctor Spec:</Text>
                <Text style={styles.cardItemText}>{doctor.doc_spec}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Contact No:</Text>
                <Text style={styles.cardItemText}>{DR_details.contact}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>3 - month avg GSP:</Text>
                <Text style={styles.cardItemText}>{DR_details.avg_gsp}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>3 - month avg RCPA:</Text>
                <Text style={styles.cardItemText}>{DR_details.avg_rcpa}</Text>
              </View>

              <View style={styles.cardItem}>
                <Text style={styles.cardItemTextLeft}>Priority Brands:</Text>
                <Text style={styles.cardItemText} />
              </View>
            </CardItem>
          </Card>
        </View>
      );
    }
    return null;
  }

  renderFooter() {
    const { next } = this.props;
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => next()}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { connected } = this.props;
    return (
      <ParentView
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView style={styles.container}>
          {this.renderTop()}
          {this.renderEngagement()}
        </ScrollView>
        {this.renderFooter()}
      </ParentView>
    );
  }
}
