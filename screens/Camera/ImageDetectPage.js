/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Linking,
  Image,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';

const ImageDetectPage = ({route, navigation}) => {
  const {photoUri, photoWidth, photoHeight} = route.params;
  const actionSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);
  // const [imageHeightDevice, setImageHeightDevice] = useState(null);

  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isActionsheetOpened, setActionsheetOpened] = useState(false);

  // WIP
  const [errorCode, setErrorCode] = useState(null);

  const [isUnreliableResultsOpened, setUnreliableResultsOpened] =
    useState(false);

  const FetchAPI = source => {
    let photoUpload = {uri: source};
    let formData = new FormData();
    formData.append('file', {
      uri: photoUpload.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const baseUrl = 'http://35.78.235.36';

    return axios
      .post(`${baseUrl}/api/v1/yolo-obj-detect/images/detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('From API: ', response.data);
        setResult(response.data);
        setErrorCode(200);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setErrorCode(500);
        setLoading(false);
      });
  };

  const __getResults = () => {
    setLoading(true);
    setDetectPressed(true);
    FetchAPI(photoUri);
  };

  const __goBack = () => {
    navigation.navigate('Trang Camera');
  };

  const __showResults = () => {
    actionSheetRef.current?.show();
    setActionsheetOpened(true);
  };

  const __unreliableResultsCollapse = () => {
    if (isUnreliableResultsOpened === false) {
      setUnreliableResultsOpened(true);
    } else {
      setUnreliableResultsOpened(false);
    }
  };

  const buttons = [];
  const buttonsLow = [];
  const rectRegions = [];
  const rectRegionsLow = [];
  let itemsLowCount = 0;

  const ItemsButtonRender = ({element, index, isReliable}) => {
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

  const RectRender = ({element, index, isReliable}) => {
    return (
      <View
        key={index}
        style={[
          isReliable && styles.rectFade,
          selectedResultIndex === index && styles.rectWhite,
          {
            position: 'absolute',
            width:
              (element.coordinate.x1 - element.coordinate.x0) * resizeRatio,
            height:
              (element.coordinate.y1 - element.coordinate.y0) * resizeRatio,
            left: element.coordinate.x0 * resizeRatio,
            top: element.coordinate.y0 * resizeRatio,
          },
        ]}
      />
    );
  };

  if (errorCode === 200) {
    if (result && result.length >= 1) {
      result.map((element, index) => {
        if (element.score >= 70) {
          buttons.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
          rectRegions.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
        } else {
          itemsLowCount++;
          buttonsLow.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
          rectRegionsLow.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
        }
      });
    } else if (result.length === 0) {
      setErrorCode(400);
    }
  }

  useEffect(() => {
    if (!isLoading && isDetectPressed && errorCode === 200) {
      actionSheetRef.current?.show();
      setActionsheetOpened(true);
    }
  }, [isLoading, isDetectPressed, errorCode]);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <ImageBackground
        source={{uri: photoUri}}
        style={styles.background}
        resizeMode={'contain'}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setResizeRatio(width / photoWidth);
          setImageWidthDevice(width);
        }}>
        {errorCode && (
          <View style={styles.errorContainer}>
            <View
              style={
                errorCode === 200
                  ? styles.errorBackgroundSuccess
                  : styles.errorBackgroundError
              }>
              {errorCode === 200 ? (
                <Text style={styles.errorMessage}>
                  Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
                </Text>
              ) : errorCode === 400 ? (
                <Text style={styles.errorMessage}>
                  Không tìm thấy sản phẩm! Vui lòng thử lại.
                </Text>
              ) : (
                errorCode === 500 && (
                  <Text style={styles.errorMessage}>
                    Không thể kết nối đến server.
                  </Text>
                )
              )}
            </View>
          </View>
        )}

        {result && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photoHeight * resizeRatio,
              }}>
              {rectRegions}
              {rectRegionsLow}
            </View>
          </View>
        )}

        {result === null ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        ) : (
          errorCode === 400 && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={__goBack}
                title="Thử chụp hình lại"
                style={styles.button}
              />
            </View>
          )
        )}

        {isActionsheetOpened === false && errorCode === 200 && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={__showResults}
              title="Danh sách kết quả"
              style={styles.button}
            />
          </View>
        )}
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <ActionSheet
        ref={actionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setActionsheetOpened(false);
        }}>
        <View style={styles.actionSheetItems}>
          {buttons}
          {itemsLowCount >= 1 && (
            <TouchableOpacity
              style={styles.unreliableResultsButton}
              onPress={__unreliableResultsCollapse}>
              <Text style={styles.unreliableResultsButtonText}>
                Kết quả có độ chính xác thấp
              </Text>
              {isUnreliableResultsOpened ? (
                <Image
                  source={require('../../assets/icons/nav-arrow-up.png')}
                  style={styles.unreliableResultsArrow}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/nav-arrow-down.png')}
                  style={styles.unreliableResultsArrow}
                />
              )}
            </TouchableOpacity>
          )}
          {isUnreliableResultsOpened && buttonsLow}
          {selectedResult && (
            <View>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  navigation.navigate('Thông tin', {selectedResult});
                }}>
                <View style={styles.searchButtonViewInside}>
                  <Image
                    source={require('../../assets/icons/search.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: '#00C5FF',
                    }}
                  />
                  <Text style={styles.searchText}>Xem thông tin</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  Linking.openURL(
                    'http://maps.google.com/?q=' + selectedResult + ' shop',
                  );
                }}>
                <View style={styles.searchButtonViewInside}>
                  <Image
                    source={require('../../assets/icons/search.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: '#00C5FF',
                    }}
                  />
                  <Text style={styles.searchText}>Tìm kiếm</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  // General
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#212121',
  },

  // Error messages area
  errorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
  },
  errorBackgroundSuccess: {
    backgroundColor: '#5FC314',
    marginTop: 100,
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorBackgroundError: {
    backgroundColor: '#FF6901',
    marginTop: 100,
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
  },

  // Outside Actionsheet
  //   Rect region style
  rectContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rectWhite: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
  rectFade: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },

  //   Detect button
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    // flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },

  // Actionsheet area
  //   Results
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
  detectedItemsButton: {
    paddingVertical: 5,
  },

  //   Unreliable results
  unreliableResultsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreliableResultsButtonText: {
    color: '#C7C7C7',
    fontSize: 15,
  },
  unreliableResultsArrow: {
    width: 18,
    height: 18,
    tintColor: '#C7C7C7',
    marginHorizontal: 5,
  },

  //   Search button
  searchButton: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButtonViewInside: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 25,
    color: '#00C5FF',
    paddingLeft: 5,
  },

  //   Actionsheet styles
  actionSheet: {
    backgroundColor: '#434343',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 75,
  },
});

export default ImageDetectPage;
