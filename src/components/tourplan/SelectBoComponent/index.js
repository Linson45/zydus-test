import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';

class SelectBoComponent extends React.Component {
  renderBo() {
    const { data, addBo, selectedBo } = this.props;
    if (data) {
      return data.bo_list.map((bo, index) => (
        <Card
          key={index}
          containerStyle={{
            borderRadius: 5,
            marginLeft: 0,
            marginRight: 0
          }}
        >
          <View style={[layoutStyles.topRow]}>
            <View style={[layoutStyles.leftTopRow]}>
              <Text style={[LightFontStyle.fontSmall]}>
                <Text
                  style={[layoutStyles.blackText, FontStyle.fontMedium]}
                >
                  {bo.name}
                </Text>
                {' '}
                (
                {bo.rep_code}
                )
              </Text>
              <Text style={[LightFontStyle.fontSmall]}>
                {bo.hq_name}
              </Text>
              <Text style={[layoutStyles.blackText, LightFontStyle.fontSmall]}>
                {bo.status}
              </Text>
            </View>
            <View style={[layoutStyles.rightTopRow]}>
              <CheckBox
                onClick={() => addBo(bo.rep_code)}
                isChecked={selectedBo.indexOf(bo.rep_code) > -1}
              />
            </View>
          </View>
        </Card>
      ));
    }
    return null;
  }

  render() {
    const { loading } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          {this.renderBo()}
        </ScrollView>
      </ParentView>
    );
  }
}

export default SelectBoComponent;
