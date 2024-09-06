import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {SelectedResultContext} from '../../contexts/DetectionResultContext';

export const ItemsButtonRender = ({element, index, isReliable}) => {
  const {selectedResultIndex, setSelectedResultIndex, setSelectedResult} =
    useContext(SelectedResultContext);

  return (
    <TouchableOpacity
      style={styles.detectedItemsButton}
      key={index}
      onPress={() => {
        if (selectedResultIndex === index) {
          setSelectedResultIndex(null);
          setSelectedResult(null);
        } else {
          setSelectedResultIndex(index);
          setSelectedResult(element.object);
        }
      }}>
      {selectedResultIndex === index && (
        <View style={styles.selectedItemBackground} />
      )}
      <View style={styles.itemsTextContainer}>
        <Text
          style={[
            styles.itemsText,
            isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
            selectedResultIndex === index && styles.itemsTextWhite,
          ]}>
          {element.object}
        </Text>
        <Text
          style={[
            styles.itemsText,
            isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
            selectedResultIndex === index && styles.itemsTextWhite,
          ]}>
          {element.score}%
        </Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: -40,
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
