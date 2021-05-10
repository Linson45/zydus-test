import React, { Component } from 'react';
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { Container } from 'native-base';
import moment from 'moment';
import styles from './styles';
import ParentView from '../../ParentView';

export default class TrainingListComponent extends Component {
  renderBrandScrollView(data) {
    const {
      gotoVA,
    } = this.props;
    const items = JSON.parse(JSON.stringify(data));
    if (items) {
      return items.map((datum) => (
        <TouchableOpacity style={styles.item} onPress={() => gotoVA(datum)}>
          <ImageLoad
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: datum.thumbnail }}
            style={styles.imageTop}
          />
          <View style={styles.besideImage}>
            <Text style={styles.vaName}>{datum.title}</Text>
            {/* <Text style={styles.brandName}>{datum.brand_name}</Text> */}
          </View>
        </TouchableOpacity>
      ));
    }
    return null;
  }

  renderBrandTabs() {
    const {
      brands,
    } = this.props;
    const that = this;
    if (!brands || !brands.length) {
      return this.renderNoContent();
    }
    const renderBrandTabHead = brands.map((brand) => {
      if (brand.data && brand.data.length !== 0) {
        const allowedData = [];
        brand.data.forEach((item) => {
          allowedData.push(item);
        });
        if (allowedData.length !== 0) {
          return (
            <View>
              <Text style={styles.dateHeading}>{moment(brand.name, 'DD-MMM-YY').format('DD MMM YYYY')}</Text>
              {that.renderBrandScrollView(allowedData)}
              <View style={styles.divider} />
            </View>
          );
        }
      }
      return null;
    });
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {renderBrandTabHead}
        </ScrollView>
      </View>
    );
  }

  renderNoContent = () => {
    const {
      brands,
    } = this.props;
    if (!brands || !brands.length) {
      return (
        <Text style={styles.noData}>No Contents Available</Text>
      );
    }
    return null;
  };

  render() {
    return (
      <ParentView
        connected
        style={styles.container}
      >
        <Container>
          {this.renderBrandTabs()}
        </Container>
      </ParentView>
    );
  }
}
