import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {IconoirProvider} from 'iconoir-react-native';

import {styles} from './Button.styles';

interface GoButtonProps extends TouchableOpacityProps {
  icon: React.ReactElement;
  text: string;
  color: string;
}

const GoButton = (props: GoButtonProps) => {
  return (
    // TODO: Global style for all these sizes, padding, ...
    <IconoirProvider iconProps={{width: 30, height: 30, color: props.color}}>
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
