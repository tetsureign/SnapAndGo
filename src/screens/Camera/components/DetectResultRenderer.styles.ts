import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
