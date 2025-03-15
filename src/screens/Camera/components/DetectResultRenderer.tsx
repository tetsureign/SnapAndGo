import React, {useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {SelectedResultContext} from '@/contexts/DetectionResultContext';

import {DetectionResultType} from '@/types/detection';

import {styles} from './DetectResultRenderer.styles';

type Props = {
  element: DetectionResultType;
  index: number;
  isReliable: boolean;
  renderType: 'button' | 'rect';
};

const DetectResultRendererComponent = ({
  element,
  index,
  isReliable,
  renderType,
}: Props) => {
  const {selectedResult, setSelectedResult, resizeRatio} = useContext(
    SelectedResultContext,
  );

  const buttonStyle = [
    selectedResult.index === index
      ? styles.selectedItemBackground
      : styles.itemBackground,
  ];

  const textStyle = [
    styles.itemsText,
    isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
    selectedResult.index === index && styles.itemsTextWhite,
  ];

  const rectStyle = {
    width: (element.coordinate.x1 - element.coordinate.x0) * resizeRatio,
    height: (element.coordinate.y1 - element.coordinate.y0) * resizeRatio,
    left: element.coordinate.x0 * resizeRatio,
    top: element.coordinate.y0 * resizeRatio,
  };

  function handlePress() {
    setSelectedResult(
      selectedResult.index === index
        ? {result: null, index: null}
        : {result: element.object, index},
    );
  }

  return (
    <>
      {renderType === 'button' ? (
        <View style={styles.detectedItemsButton}>
          <TouchableOpacity style={buttonStyle} onPress={handlePress}>
            <View style={styles.itemsTextContainer}>
              <Text style={textStyle}>{element.object}</Text>
              <Text style={textStyle}>{Math.round(element.score)}%</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.rect,
            isReliable && styles.rectFade,
            selectedResult.index === index && styles.rectWhite,
            rectStyle,
          ]}
        />
      )}
    </>
  );
};

export const DetectResultRenderer = React.memo(DetectResultRendererComponent);
