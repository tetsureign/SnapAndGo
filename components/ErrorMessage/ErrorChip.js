import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export const ErrorChip = ({errorCode}) => {
  switch (errorCode) {
    case 200:
      return (
        <View style={styles.errorBackgroundSuccess}>
          <Text style={styles.errorMessage}>
            Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
          </Text>
        </View>
      );
    case 400:
      return (
        <View style={styles.errorBackgroundError}>
          <Text style={styles.errorMessage}>
            Không tìm thấy sản phẩm! Vui lòng thử lại.
          </Text>
        </View>
      );
    case 500:
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
