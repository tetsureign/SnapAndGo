import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import styles from './LoadingIndicator.styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingIndicator;
