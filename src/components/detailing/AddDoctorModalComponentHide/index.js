import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import {getAllDoctors} from '../../../local-storage/helper/dailyplan';
import Adapter from '../../../util/Adapter';
import styles from './styles';
import Colors from '../../../styles/colorsStyles';

export default class AddDoctorModalComponentHide extends Component {
  constructor(props) {
    super(props);
    let {selectedDocs, allowPractice} = props;
    if (!selectedDocs) {
      selectedDocs = [];
    }
    if (!allowPractice) {
      allowPractice = false;
    }
    allowPractice = false;
    this.state = {
      doctors: [],
      selectedCodes: selectedDocs,
      allowPractice,
      initial: 0,
      searchText: '',
      allDoctors: [],
    };
  }

  async componentDidMount() {
    const me = await Adapter.getUser();
    const doctors = await getAllDoctors(me.rep_code);
    this.setState({doctors, allDoctors: doctors});
  }

  renderHeader() {
    const {onClose} = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Icon style={styles.headingIcon} name="file" type="FontAwesome" />
          <Text style={styles.headerHeading}>Add Doctor</Text>
        </View>
      </View>
    );
  }

  renderPracticeHeader() {
    const {allowPractice, initial} = this.state;
    if (allowPractice) {
      const radioOptions = [
        {label: 'Select Doctor', value: 0},
        {label: 'Practice Detailing', value: 1},
      ];

      return (
        <RadioForm
          style={styles.practiceContainer}
          formHorizontal
          labelStyle={styles.radioLabel}
          buttonColor={Colors.contentBlue}
          animation={false}
          radio_props={radioOptions}
          initial={initial}
          onPress={value => {
            this.setState({initial: value});
          }}
        />
      );
    }
    return null;
  }

  renderSearch() {
    return (
      <TextInput
        value={this.state.searchText}
        style={styles.searchBox}
        onChangeText={searchText => {
          this.setState({searchText});
          const doctors = [];
          this.state.allDoctors.forEach(doctor => {
            if (
              doctor.doc_name
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
            ) {
              doctors.push(doctor);
            }
          });
          this.setState({doctors});
        }}
        placeholder="Search"
      />
    );
  }

  renderDoctors() {
    const {doctors, initial} = this.state;
    return (
      <View>
        {this.renderSearch()}
        <FlatList
          style={[
            initial === 1 ? {opacity: 0.3} : {},
            {height: Dimensions.get('window').height / 2},
          ]}
          data={doctors}
          renderItem={({item}) => this.renderDoctor(item)}
          keyExtractor={item => item.doc_code}
          extraData={this.state.refresh}
        />
      </View>
    );
  }

  renderDoctor = doctor => {
    const {selectedCodes, initial} = this.state;
    const {doc_name, doc_code, doc_spec} = doctor;
    return (
      <View style={styles.doctorRow}>
        <CheckBox
          key={doc_code}
          disabled={initial === 1}
          style={{padding: 10}}
          rightTextStyle={{color: '#000'}}
          onClick={() => {
            const index = selectedCodes.indexOf(doc_code);
            if (index === -1) {
              selectedCodes.push(doc_code);
            } else {
              selectedCodes.splice(index, 1);
            }
            this.setState({selectedCodes, refresh: !this.state.refresh});
          }}
          isChecked={this.state.selectedCodes.indexOf(doc_code) !== -1}
        />
        <View style={styles.doctorContainer}>
          <Text style={styles.doctorName}>{doc_name}</Text>
          <Text style={styles.doctorSpec}>{doc_spec}</Text>
        </View>
      </View>
    );
  };

  renderBottom() {
    const {onClose} = this.props;

    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={this.onSubmitAction}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSubmitAction = () => {
    const {onSubmit} = this.props;
    const {selectedCodes, initial} = this.state;
    if (initial === 0) {
      if (selectedCodes.length === 0) {
        return;
      }
      onSubmit(selectedCodes);
      return;
    }
    onSubmit(null);
  };

  render() {
    const {isVisible} = this.props;

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
          <View style={{...styles.content}}>
            {this.renderHeader()}
            {this.renderPracticeHeader()}
            {this.renderDoctors()}
            {this.renderBottom()}
          </View>
        </View>
      </Modal>
    );
  }
}
