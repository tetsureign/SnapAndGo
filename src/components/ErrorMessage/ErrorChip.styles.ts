import {StyleSheet} from 'react-native';

import {BaseTheme} from '@/styles/theme';

const styles = StyleSheet.create({
  backgroundSuccess: {
    backgroundColor: BaseTheme.colors.green,
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backgroundError: {
    backgroundColor: BaseTheme.colors.orange,
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backgroundNeutral: {
    backgroundColor: BaseTheme.colors.gray,
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
