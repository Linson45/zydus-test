import React from 'react';
import { Text } from 'react-native-elements';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  deletePendingEDetailing,
  getFirstPendingEDetailing,
  getPendingEDetailingCount
} from '../../../local-storage/helper/detailing';
import styles from './styles';
import { IS_SYNCING_CALLS_MANUALLY, syncEDetailing } from '../../../actions';
import Toaster from '../../../util/Toaster';
import Adapter from '../../../util/Adapter';

class SyncEDetailingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingCount: 0,
      syncing: false,
    };
  }

  static navigationOptions = {
    title: 'Sync Offline data',
  };

  async componentDidMount() {
    await this.setPendingCount();
  }

  renderNoPending = () => {
    const { pendingCount } = this.state;
    if (pendingCount === 0) {
      return (
        <View>
          <Text style={styles.heading}>There are no pending e-detailings</Text>
        </View>
      );
    }
    return null;
  };

  renderPending = () => {
    const { pendingCount } = this.state;
    const pendingMessage = `There are ${pendingCount} pending e-detailings`;
    if (pendingCount !== 0) {
      return (
        <View>
          <Text style={styles.heading}>{pendingMessage}</Text>
          {this.renderSync()}
          {this.renderSyncing()}
        </View>
      );
    }
    return null;
  };

  renderSync = () => {
    const { syncing } = this.state;
    if (!syncing) {
      return (
        <TouchableOpacity style={styles.syncButton} onPress={this.startSync}>
          <Text style={styles.syncButtonText}>Sync Now</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  startSync = () => {
    this.setState({ syncing: true });
    setTimeout(async () => {
      await Adapter.set(IS_SYNCING_CALLS_MANUALLY, true);
      this.onSync();
    }, 10000);
  };

  renderSyncing = () => {
    const { syncing } = this.state;
    if (syncing) {
      return (
        <View>
          <View style={styles.syncingButton}>
            <Text style={styles.syncButtonText}>Syncing...</Text>
          </View>
          <Text style={styles.syncingDesc}>Please do not go back or close the app</Text>
        </View>
      );
    }
    return null;
  }

  setPendingCount = async () => {
    const pendingCount = await getPendingEDetailingCount();
    if (pendingCount !== 0) {
      await Adapter.set(IS_SYNCING_CALLS_MANUALLY, true);
    } else {
      await Adapter.set(IS_SYNCING_CALLS_MANUALLY, false);
    }
    this.setState({ pendingCount });
  };

  onSync = async () => {
    this.setState({ syncing: true });
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await this.setPendingCount();
      const pendingEDetailing = await getFirstPendingEDetailing();
      if (pendingEDetailing) {
        try {
          const payload = JSON.parse(pendingEDetailing.items);
          let resp = await syncEDetailing(payload);
          if (resp) {
            resp = resp.trim();
          }
          if (resp === 'Session Captured') {
            await deletePendingEDetailing(payload.u_id, payload.rep_code);
          } else {
            await this.setPendingCount();
            this.setState({ syncing: false });
            Toaster.show('Something went wrong please retry.');
            break;
          }
        } catch (e) {
          await this.setPendingCount();
          this.setState({ syncing: false });
          Toaster.show('Something went wrong please retry.');
          break;
        }
      } else {
        await this.setPendingCount();
        this.setState({ syncing: false });
        break;
      }
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderNoPending()}
        {this.renderPending()}
      </ScrollView>
    );
  }
}

export default SyncEDetailingComponent;
