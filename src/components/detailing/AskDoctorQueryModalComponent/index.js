import React, { Component } from 'react';
import {
  Image, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'native-base';
import styles from './styles';
import Images from '../../../Constants/imageConstants';

export default class AskDoctorQueryModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  renderHeader() {
    const { onClose } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Image source={Images.ic_ask_query} style={styles.headingIcon} />
          <Text style={styles.headerHeading}>Ask Us</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => (onClose ? onClose() : null)} style={styles.iconButtonStyle}>
            <Icon
              name="times-circle-o"
              type="FontAwesome"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderTextInput() {
    const { query } = this.state;
    return (
      <View style={styles.optionsContainer}>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.subjective}
          value={query}
          placeholder="Type your query here..."
          onChangeText={(query) => {
            this.setState({ query });
          }}
        />
      </View>
    );
  }

  renderBottom() {
    const { onSubmit } = this.props;
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            const { query } = this.state;
            if (query) {
              onSubmit(query);
            }
          }}
        >
          <Text style={styles.nextButtonText}>Submit Query</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { isVisible } = this.props;

    return (

      <Modal isVisible={isVisible}>
        <View style={styles.container}>
          <View style={{ ...styles.content }}>
            {this.renderHeader()}
            {this.renderTextInput()}
            {this.renderBottom()}
          </View>
        </View>
      </Modal>
    );
  }
}
