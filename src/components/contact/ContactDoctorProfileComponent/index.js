import React from 'react';
import {
  Image, ScrollView, Text, View
} from 'react-native';
import styles from './styles';
import Images from '../../../Constants/imageConstants';

export default class ContactDoctorProfileComponent extends React.Component {
  renderTop() {
    const { doctor } = this.props;
    const { mobile_no, email, whatsapp } = doctor;
    return (
      <View style={styles.main}>
        <View style={styles.column}>
          <Text style={styles.smallHeading}>PHONE NUMBER</Text>
          <View style={styles.row}>
            <Image source={Images.ic_call} style={styles.emailIcon} resizeMode="contain" />
            <Text style={styles.topValue}>{ mobile_no || '-' }</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.smallHeading}>EMAIL ADDRESS</Text>
          <View style={styles.row}>
            <Image source={Images.ic_email} style={styles.emailIcon} resizeMode="contain" />
            <Text style={styles.topValue}>{ email || '-' }</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.smallHeading}>WHATSAPP</Text>
          <View style={styles.row}>
            <Image source={Images.ic_whatsapp} style={styles.emailIcon} resizeMode="contain" />
            <Text style={styles.topValue}>{ whatsapp || '-' }</Text>
          </View>
        </View>
      </View>
    );
  }

  renderTop2() {
    const { doctor } = this.props;
    const { dob, gender } = doctor;
    return (
      <View style={styles.main}>
        <View style={styles.column}>
          <Text style={styles.smallHeading}>DATE OF BIRTH</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{ dob || '-' }</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.smallHeading}>GENDER</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{ gender || '-' }</Text>
          </View>
        </View>
        <View style={styles.column} />
      </View>
    );
  }

  renderPractice() {
    const { doctor } = this.props;
    const { practice_type, fees, opd_monthly_volume } = doctor;
    return (
      <View style={styles.main}>
        <View style={styles.column}>
          <Text style={styles.smallHeading}>PRACTICE TYPE</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{ practice_type || '-' }</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.smallHeading}>FEES</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{fees ? `Rs ${fees}/ consultation` : '-'}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.smallHeading}>OPD VOLUME (MONTHLY)</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{ opd_monthly_volume || '-' }</Text>
          </View>
        </View>
      </View>
    );
  }

  renderDivider() {
    return (
      <View style={styles.divider} />
    );
  }

  renderHeading(heading) {
    return (
      <Text style={styles.heading}>{heading}</Text>
    );
  }

  renderChemists() {
    const { doctor } = this.props;
    let { chemists } = doctor;
    if (!chemists) {
      chemists = [];
    }
    return chemists.map((chemist) => {
      const { name, location } = chemist;
      return (
        <View style={styles.chemistRow}>
          <Text style={styles.chemistName}>{name}</Text>
          <Text style={styles.chemistLocation}>{location}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        {this.renderTop()}
        {this.renderTop2()}
        {this.renderDivider()}
        {this.renderPractice()}
        {this.renderDivider()}
        {this.renderHeading('ASSOCIATED CHEMIST')}
        {this.renderChemists()}
      </ScrollView>
    );
  }
}
