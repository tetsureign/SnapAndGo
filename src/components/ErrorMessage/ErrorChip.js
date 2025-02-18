import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export const ErrorChip = ({status}) => {
  switch (status) {
    case 'success':
      return (
        <View style={styles.backgroundSuccess}>
          <Text style={styles.message}>
            Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
          </Text>
        </View>
      );
    case 'empty':
      return (
        <View style={styles.backgroundError}>
          <Text style={styles.message}>
            Không tìm thấy sản phẩm! Vui lòng thử lại.
          </Text>
        </View>
      );
    case 'failed':
      return (
        <View style={styles.backgroundError}>
          <Text style={styles.message}>Không thể kết nối đến server.</Text>
        </View>
      );
    default:
      return (
        <View style={styles.backgroundNeutral}>
          <Text style={styles.message}>Working...</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  backgroundSuccess: {
    backgroundColor: '#5FC314',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backgroundError: {
    backgroundColor: '#FF6901',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backgroundNeutral: {
    backgroundColor: '#4d4d4d',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
});
