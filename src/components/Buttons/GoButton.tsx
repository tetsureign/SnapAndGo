import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import {styles} from './Button.styles';

interface GoButtonProps {
  onPress: () => void;
  icon: React.ReactElement;
  text: string;
  color: string;
}

export const GoButton: React.FC<GoButtonProps> = ({
  onPress,
  icon,
  text,
  color,
}) => {
  return (
    <TouchableOpacity style={styles.goButton} onPress={onPress}>
      <View style={styles.goButtonViewInside}>
        {icon}
        <Text style={[styles.goButtonText, {color: color}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
