import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default LoadingIndicator;
