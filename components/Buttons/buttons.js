import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {goButtonStyles, showHideButtonStyle} from './styles';

export const GoButton = ({onPress, icon, text, color}) => {
  return (
    <TouchableOpacity style={goButtonStyles.goButton} onPress={onPress}>
      <View style={goButtonStyles.goButtonViewInside}>
        <Image
          source={icon}
          style={[goButtonStyles.goButtonImage, {tintColor: color}]}
        />
        <Text style={[goButtonStyles.goButtonText, {color: color}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ShowHideButton = ({onPress, isOpened, text, color}) => {
  let buttonSource = null;
  if (isOpened) {
    buttonSource = require('../../assets/icons/nav-arrow-up.png');
  } else {
    buttonSource = require('../../assets/icons/nav-arrow-down.png');
  }
  return (
    <TouchableOpacity
      style={showHideButtonStyle.showHideButton}
      onPress={onPress}>
      <Text style={[showHideButtonStyle.showHideButtonText, {color: color}]}>
        {text}
      </Text>

      <Image
        source={buttonSource}
        style={[showHideButtonStyle.showHideButtonArrow, {tintColor: color}]}
      />
    </TouchableOpacity>
  );
};
