import React from 'react';
import { Dimensions, Linking, View } from 'react-native';
import HTML from 'react-native-render-html';
import styles from './styles';

export default class TrainingComponent extends React.Component {
    onLinkPress = () => {
      Linking.openURL('http://www.zydustraining.com');
    };

    static navigationOptions = {
      title: 'Training',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      },
    };

    render() {
      const tagsStyles = { span: { fontSize: 16 } };
      const htmlContent = '<span>Welcome Zydans!'
            + '<br/><br/>'
            + 'We are excited to offer you access to the Zydus Training portal through this mobile platform. '
            + 'The Zydus Training portal is your gateway to all resources related to learning and development. '
            + 'To access all relevant training and learning material, click the <br/>'
            + "<a href='http://www.zydustraining.com'><b>here</b></a></span>";
      return (
        <View style={styles.container}>
          <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} tagsStyles={tagsStyles} onLinkPress={this.onLinkPress} />
        </View>
      );
    }
}
