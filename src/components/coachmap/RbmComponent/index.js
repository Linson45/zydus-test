import React from 'react';
import {
  Dimensions, Image, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import { Card } from 'react-native-elements';
import layoutStyles from '../../../styles/layoutStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

const bg = require('../../../../assets/images/bgtop.png');
const add = require('../../../../assets/images/ic_add_coachmap.png');

export default class RbmComponent extends React.Component {
  render() {
    const { gotoCoachmap } = this.props;
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
          padding: 30,
          paddingVertical: 15
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
              style={[layoutStyles.col10, {
                alignItems: 'center',
                flexDirection: 'row',
              }]}
            >
              <Image
                source={add}
                resizeMode="contain"
                style={[layoutStyles.col3, { width: 60, height: 60, alignSelf: 'flex-start' }]}
              />
              <View style={[layoutStyles.col7, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[LightFontStyle.fontLarge]}>Add/View</Text>
                <Text style={[LightFontStyle.fontLarge]}>Coachmap/Leadermap</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </ImageBackground>
    );
  }
}
