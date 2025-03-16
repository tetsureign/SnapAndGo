import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // Buttons
  detectedItemsButton: {
    paddingBottom: 5,
  },
  itemBackground: {
    padding: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  itemsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: {
    // TODO: Global style anyone??
    fontSize: 25,
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
