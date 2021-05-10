import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import ParentView from '../../../components/ParentView';
import AbmComponent from '../../../components/coachmap/AbmComponent';
import colorsStyles from '../../../styles/colorsStyles';

class CoachMapAbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
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

    gotoCoachmap() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CoachMapAbmCoachmap', { user });
    }

    gotoLeadermap() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CoachMapAbmLeaderboard', { user });
    }

    render() {
      const gotoCoachmap = this.gotoCoachmap.bind(this);
      const gotoLeadermap = this.gotoLeadermap.bind(this);

      return (
        <ParentView
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        >
          <AbmComponent
            gotoCoachmap={gotoCoachmap}
            gotoLeadermap={gotoLeadermap}
          />
        </ParentView>
      );
    }
}

export default CoachMapAbmContainer;
