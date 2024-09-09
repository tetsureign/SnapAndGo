import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {NavArrowUp, NavArrowDown} from 'iconoir-react-native';

import {goButtonStyles, showHideButtonStyle} from './styles';

export const GoButton = ({onPress, icon, text, color}) => {
  return (
    <TouchableOpacity style={goButtonStyles.goButton} onPress={onPress}>
      <View style={goButtonStyles.goButtonViewInside}>
        {/* <Image
          source={icon}
          style={[goButtonStyles.goButtonImage, {tintColor: color}]}
        /> */}
        {icon}
        <Text style={[goButtonStyles.goButtonText, {color: color}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ShowHideButton = ({onPress, isOpened, text, color}) => {
  let buttonSource = null;
  const buttonSize = 18;
  if (isOpened) {
    // buttonSource = require('../../assets/icons/nav-arrow-up.png');
    buttonSource = (
      <NavArrowUp color={color} width={buttonSize} height={buttonSize} />
    );
  } else {
    // buttonSource = require('../../assets/icons/nav-arrow-down.png');
    buttonSource = (
      <NavArrowDown color={color} width={buttonSize} height={buttonSize} />
    );
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
