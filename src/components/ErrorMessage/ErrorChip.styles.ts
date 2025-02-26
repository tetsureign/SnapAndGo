import {StyleSheet} from 'react-native';

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

export default styles;
