import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import ColorStyles from '../../styles/colorsStyles';
import NoInternetComponent from '../NoInternetComponent/index';

export default class ParentView extends React.Component {
  render() {
    const {
      loading, children, hoverLoading, connected
    } = this.props;
    const isVisibleLoading = loading || hoverLoading;
    return (
      <>
        {connected ? isVisibleLoading
          ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={ColorStyles.gray} />
            </View>
          ) : null
          : (
            <NoInternetComponent
              onRefresh={() => this.props.onRefresh()}
            />
          )}
        {connected ? loading ? null : children : null}
      </>

    );
  }
}
