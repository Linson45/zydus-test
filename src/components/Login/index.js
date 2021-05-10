import React, {Component} from 'react';
import {Image, ImageBackground, StatusBar} from 'react-native';
import {Button, Icon, Input, Item, Text, View} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import colorsStyles from '../../styles/colorsStyles';

const bg = require('../../../assets/images/bg.png');
const logo = require('../../../assets/images/ic_company_logo.png');

export default class Login extends Component {
  render() {
    const {userId, password, changeInput} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
          <View style={styles.mainBox}>
            <View style={styles.topBox}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logoImage} />
              </View>
            </View>
            <View style={styles.bottomBox}>
              <Text style={styles.signIn}> Sign in</Text>
              <View style={styles.contentForm}>
                <Item>
                  <Icon style={styles.icon} active name="ios-contact" />
                  <Input
                    style={styles.inputBox}
                    placeholder="User Id"
                    value={userId}
                    placeholderTextColor={colorsStyles.gray_login}
                    onChangeText={text => changeInput('userId', text)}
                  />
                </Item>
                <Item>
                  <Icon style={styles.icon} active name="lock" />
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor={colorsStyles.gray_login}
                    value={password}
                    style={styles.inputBox}
                    onChangeText={text => changeInput('password', text)}
                  />
                </Item>
                <Button block onPress={() => this.props.onLogin()} style={styles.buttonLogin}>
                  <Text uppercase={false} style={styles.textLogin}>Sign in</Text>
                </Button>
              </View>
            </View>
          </View>
        </ImageBackground>
        <StatusBar hidden />
        <Spinner visible={this.props.loading} />
      </KeyboardAwareScrollView>
    );
  }
}
