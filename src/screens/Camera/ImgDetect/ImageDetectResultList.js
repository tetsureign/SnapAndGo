import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {SelectedResultContext} from '../../../contexts/DetectionResultContext';

export const ItemsButtonRender = ({element, index, isReliable}) => {
  const {selectedResult, setSelectedResult} = useContext(SelectedResultContext);
  const textStyles = [
    styles.itemsText,
    isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
    selectedResult.index === index && styles.itemsTextWhite,
  ];

  return (
    <View style={styles.detectedItemsButton}>
      <TouchableOpacity
        style={
          selectedResult.index === index
            ? styles.selectedItemBackground
            : styles.itemBackground
        }
        key={index}
        onPress={() => {
          if (selectedResult.index === index) {
            setSelectedResult({
              result: null,
              index: null,
            });
          } else {
            setSelectedResult({
              result: element.class,
              index: index,
            });
          }
        }}>
        <View style={styles.itemsTextContainer}>
          <Text style={textStyles}>{element.class}</Text>
          <Text style={textStyles}>{Math.round(element.score * 100)}%</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
