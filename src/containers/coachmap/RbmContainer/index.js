import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import ParentView from '../../../components/ParentView';
import RbmComponent from '../../../components/coachmap/RbmComponent';
import colorsStyles from '../../../styles/colorsStyles';

class CoachMapRbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected });
      });
  }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected });
        });
    }

    static navigationOptions = () => ({
      title: 'Coachmap / Leadermap',
      headerStyle: {
        backgroundColor: colorsStyles.coachmap_header,
        elevation: 0,
        shadowOpacity: 0
      },
      headerBackground: null,
      headerRight: null
    });

    gotoCoachmap() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CoachMapRbmCoachmap', { user });
    }

    render() {
      const gotoCoachmap = this.gotoCoachmap.bind(this);

      return (
        <ParentView
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        >
          <RbmComponent
            gotoCoachmap={gotoCoachmap}
          />
        </ParentView>
      );
    }
}

export default CoachMapRbmContainer;
