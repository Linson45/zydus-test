import React from 'react';
import {
  ActivityIndicator, FlatList, Image,
  ScrollView, Text, TextInput, View
} from 'react-native';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import { priceFormatWithDecimal } from '../../../util/NumberTrasformer';
import Images from '../../../Constants/imageConstants';
import ParentView from '../../ParentView';

export default class ContactChemistComponent extends React.Component {
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

  renderChemists() {
    const { data } = this.props;
    if (data) {
      return (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => this.renderChemist(item)}
          keyExtractor={(item) => item.count}
        />
      );
    }
    return null;
  }

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

  renderChemist(chemist) {
    const {
      name, count, last_month_rcpa, chemist_code, last_rcpa_date
    } = chemist;
    return (
      <View key={count} style={styles.chemistView}>
        <View style={styles.main}>
          <View style={styles.left}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{chemist_code}</Text>
          </View>

          <View style={styles.right}>
            <View style={[styles.column, styles.marginRight25]}>
              <Text style={styles.smallHeading}>Last RCPA</Text>
              <Text style={styles.rcpaValue}>{this.formatDate(last_rcpa_date)}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.smallHeading}>RCPA Last Month</Text>
              <Text style={styles.rcpaValue}>{priceFormatWithDecimal(last_month_rcpa)}</Text>
            </View>
          </View>
        </View>
        {this.renderChemistBottom(chemist)}
      </View>
    );
  }

  renderChemistBottom(chemist) {
    const { mobile, email } = chemist;
    if (mobile || email) {
      return (
        <View>
          <View style={styles.divider} />
          <View style={styles.main}>
            <View style={styles.left} />
            <View style={styles.right}>
              {this.renderMobile(mobile)}
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
          {this.renderChemists()}
        </ScrollView>
      </ParentView>
    );
  }
}
