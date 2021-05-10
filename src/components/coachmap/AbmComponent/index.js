import React from 'react';
import {
  Dimensions, Image, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import { Card } from 'react-native-elements';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

const bg = require('../../../../assets/images/bgtop.png');
const add = require('../../../../assets/images/ic_add_coachmap.png');
const view = require('../../../../assets/images/ic_view_coachmap.png');

export default class AbmComponent extends React.Component {
  render() {
    const { gotoLeadermap, gotoCoachmap } = this.props;
    return (
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card containerStyle={{
          width: Dimensions.get('window').width - 50,
          borderRadius: 5,
          paddingLeft: 0,
          paddingRight: 0,
          padding: 30
        }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <TouchableOpacity
              onPress={gotoCoachmap}
              opacity={1}
              style={[layoutStyles.col5, {
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: colorsStyles.gray_dark
              }]}
            >
              <Image source={add} resizeMode="contain" style={{ width: 85, height: 85 }} />
              <Text style={[LightFontStyle.fontLarge, { marginVertical: 10, textAlign: 'center' }]}>Add / View Coachmap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={gotoLeadermap}
              opacity={1}
              style={[layoutStyles.col5, { alignItems: 'center' }]}
            >
              <Image source={view} resizeMode="contain" />
              <Text style={[LightFontStyle.fontLarge, { marginVertical: 10 }]}>View Leadermap</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ImageBackground>
    );
  }
}
