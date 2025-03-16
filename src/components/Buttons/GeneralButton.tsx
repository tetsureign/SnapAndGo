// Currently DARK only
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {styles} from './Button.styles';

const GeneralButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.buttonBackground, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

export default GeneralButton;
