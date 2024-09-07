import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export const ErrorChip = ({status}) => {
  switch (status) {
    case 'success':
      return (
        <View style={styles.errorBackgroundSuccess}>
          <Text style={styles.errorMessage}>
            Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
          </Text>
        </View>
      );
    case 'empty':
      return (
        <View style={styles.errorBackgroundError}>
          <Text style={styles.errorMessage}>
            Không tìm thấy sản phẩm! Vui lòng thử lại.
          </Text>
        </View>
      );
    case 'failed':
      return (
        <View style={styles.errorBackgroundError}>
          <Text style={styles.errorMessage}>Không thể kết nối đến server.</Text>
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  errorBackgroundSuccess: {
    backgroundColor: '#5FC314',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorBackgroundError: {
    backgroundColor: '#FF6901',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
  },
});
