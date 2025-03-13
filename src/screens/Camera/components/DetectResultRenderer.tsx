import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import {SelectedResultContext} from '@/contexts/DetectionResultContext';

import {DetectionResultType} from '@/types/detectionResult';

type Props = {
  element: DetectionResultType;
  index: number;
  isReliable: boolean;
  renderType: 'button' | 'rect';
};

export const DetectResultRenderer = ({
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

const styles = StyleSheet.create({
  // Buttons
  detectedItemsButton: {
    paddingVertical: 5,
  },
  selectedItemBackground: {
    backgroundColor: '#646464',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 10,
    height: 40,
  },
  itemBackground: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 40,
  },
  itemsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: {
    fontSize: 25,
    paddingHorizontal: 5,
  },
  itemsTextWhite: {
    color: 'white',
  },
  itemsTextFade: {
    color: 'rgba(255, 255, 255, 0.25)',
  },

  // Rectangles
  rect: {
    position: 'absolute',
  },
  rectFade: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
  rectWhite: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
});
