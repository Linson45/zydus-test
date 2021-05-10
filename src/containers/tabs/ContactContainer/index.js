import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Images from '../../../Constants/imageConstants';
import styles from '../styles';
import ContactContainer from '../../contact/ContactContainer';

class ContactTabContainer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Contact',
    headerLeft: (
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Image
          source={Images.ham}
          style={styles.ham}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
  });

  async componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this.openDrawer });
  }

  openDrawer = () => {
    this.drawer.toggle();
  };

  render() {
    return (
      <ContactContainer navigation={this.props.navigation} />
    );
  }
}

export default ContactTabContainer;
