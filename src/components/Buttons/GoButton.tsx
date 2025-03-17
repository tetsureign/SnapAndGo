import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {IconoirProvider} from 'iconoir-react-native';

import {styles} from './Button.styles';
import {BaseTheme} from '@/styles/theme';

interface GoButtonProps extends TouchableOpacityProps {
  icon: React.ReactElement;
  text: string;
  color: string;
}

const GoButton = (props: GoButtonProps) => {
  return (
    // TODO: Global style for all these sizes, padding, ...
    <IconoirProvider
      iconProps={{
        width: BaseTheme.fontSize.xl,
        height: BaseTheme.fontSize.xl,
        color: props.color,
      }}>
      <TouchableOpacity
        {...props}
        style={styles.goButton}
        onPress={props.onPress}>
        <View style={styles.goButtonViewInside}>
          {props.icon}
          <Text style={[styles.goButtonText, {color: props.color}]}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </IconoirProvider>
  );
};

export default GoButton;
