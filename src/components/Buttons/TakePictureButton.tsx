import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Search} from 'iconoir-react-native';

import {styles} from './Button.styles';
import {BaseTheme} from '@/styles/theme';

const TakePictureButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity style={styles.captureButton} onPress={props.onPress}>
      <Search
        color={BaseTheme.colors.blue}
        width={BaseTheme.fontSize.xl}
        height={BaseTheme.fontSize.xl}
      />
    </TouchableOpacity>
  );
};

export default TakePictureButton;
