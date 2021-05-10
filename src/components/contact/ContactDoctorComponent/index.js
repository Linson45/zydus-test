import React from 'react';
import {
  ActivityIndicator, FlatList, Image,
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import { priceFormatWithDecimal } from '../../../util/NumberTrasformer';
import Images from '../../../Constants/imageConstants';
import ParentView from '../../ParentView';

export default class ContactDoctorComponent extends React.Component {
  formatDate = (date) => {
    if (date) {
      try {
        const splits = date.split('-');
        return `${splits[0]} ${splits[1]}`;
      } catch (e) {
        return '--';
      }
    }
    return '--';
  };

  renderLoading() {
    const { loading } = this.props;
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorStyles.gray} />
        </View>
      );
    }
    return null;
  }

  renderSearch() {
    const {
      loading, data, searchText, searchQuery
    } = this.props;
    if (!loading && data) {
      return (
        <TextInput
          style={styles.search}
          placeholder="Search"
          onChangeText={(text) => searchText(text)}
          value={searchQuery}
        />
      );
    }
    return null;
  }

  renderDoctors() {
    const { data } = this.props;
    if (data) {
      return (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => this.renderDoctor(item)}
          keyExtractor={(item) => item.count}
        />
      );
    }
    return null;
  }

  renderDoctor(doctor) {
    const { onPress } = this.props;
    const {
      doc_name, doc_code, doc_spec, last_month_rcpa, count, visit_category, last_detailed_date
    } = doctor;
    return (
      <TouchableOpacity
        key={count}
        style={styles.doctorView}
        onPress={() => {
          onPress(doctor);
        }}
      >
        <View style={styles.main}>
          <View style={styles.left}>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.name}>{doc_name}</Text>
                <Text style={styles.code}>{doc_code}</Text>
              </View>
              <Text style={styles.spec}>{doc_spec}</Text>
            </View>
          </View>

          <View style={styles.right}>
            <View style={[styles.column, styles.marginRight25]}>
              <Text style={styles.smallHeading}>Last Detailed</Text>
              <Text style={styles.rcpaValue}>{this.formatDate(last_detailed_date)}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.smallHeading}>RCPA Last Month</Text>
              <Text style={styles.rcpaValue}>{priceFormatWithDecimal(last_month_rcpa)}</Text>
            </View>

            <Text style={styles.visitCategory}>{visit_category ? visit_category.toUpperCase() : ''}</Text>
          </View>
        </View>
        {this.renderDoctorBottom(doctor)}
      </TouchableOpacity>
    );
  }

  renderDoctorBottom(doctor) {
    const { mobile_no, email } = doctor;
    if (mobile_no || email) {
      return (
        <View>
          <View style={styles.divider} />
          <View style={styles.main}>
            <View style={styles.left} />
            <View style={styles.right}>
              {this.renderMobile(mobile_no)}
              {this.renderEmail(email)}
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  renderMobile(mobile) {
    if (mobile) {
      return (
        <View style={[styles.row, styles.marginRight25]}>
          <Image source={Images.ic_call} style={styles.emailIcon} resizeMode="contain" />
          <Text style={styles.mobile}>{mobile}</Text>
        </View>
      );
    }
    return null;
  }

  renderEmail(email) {
    if (email) {
      return (
        <View style={styles.row}>
          <Image source={Images.ic_email} style={styles.emailIcon} resizeMode="contain" />
          <Text style={styles.email}>{email}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <ParentView connected>
        {this.renderSearch()}
        <ScrollView
          connected
          contentContainerStyle={styles.container}
        >
          {this.renderLoading()}
          {this.renderDoctors()}
        </ScrollView>
      </ParentView>
    );
  }
}
