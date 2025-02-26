import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import {styles} from './Button.styles';

type GoButtonProps = {
  onPress: () => void;
  icon: React.ReactElement;
  text: string;
  color: string;
};

const GoButton = ({onPress, icon, text, color}: GoButtonProps) => {
  return (
    <TouchableOpacity style={styles.goButton} onPress={onPress}>
      <View style={styles.goButtonViewInside}>
        {icon}
        <Text style={[styles.goButtonText, {color: color}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoButton;
