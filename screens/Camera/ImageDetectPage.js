import React, {useRef, useEffect, useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import ActionSheet, {useScrollHandlers} from 'react-native-actions-sheet';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import LoadingIndicator from '../../components/LoadingIndicator';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../../components/firebase';
import * as api from '../../api/api';
import {
  DetectionResultContext,
  SelectedResultContext,
} from '../../contexts/DetectionResultContext';
import {RectRender} from './ImageDetectRectDraw';
import {ItemsButtonRender} from './ImageDetectResultList';
import {ErrorChip} from '../../components/ErrorMessage/ErrorChip';

const ImageDetectPage = ({route, navigation}) => {
  const {photoUri, photoWidth, photoHeight} = route.params;

  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  const resultsActionSheetRef = useRef(null);
  const infoActionSheetRef = useRef(null);
  const scrollHandlers = useScrollHandlers('scrollview-1', infoActionSheetRef);

  const [result, setResult] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);
  // const [imageHeightDevice, setImageHeightDevice] = useState(null);

  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultsActionsheetOpened, setResultsActionsheetOpened] =
    useState(false);
  const [isInfoActionsheetOpened, setInfoActionsheetOpened] = useState(false);
  const [isUnreliableResultsOpened, setUnreliableResultsOpened] =
    useState(false);

  const [description, setDescription] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [errorCode, setErrorCode] = useState(null);

  const buttons = [];
  const buttonsLow = [];
  const rectRegions = [];
  const rectRegionsLow = [];
  let itemsLowCount = 0;

  useEffect(() => {
    var date = moment().utcOffset('+07:00').format('HH:mm, DD/MM/YYYY');
    setCurrentDate(date);
  }, []);

  const FetchAPI = async source => {
    let photoUpload = {uri: source};
    let formData = new FormData();
    formData.append('image', {
      uri: photoUpload.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const responseData = await api.Post('/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Result: ', responseData);
      setResult(responseData);
      setErrorCode(200);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrorCode(500);
      setLoading(false);
    }
  };

  const createHistoryData = () => {
    set(ref(db, 'HistorySearch/' + selectedResult), {
      ObjectsName: selectedResult,
      currentDate: currentDate,
    })
      .then(() => {
        // Data saved successfully!
        console.log('Data updated!');
      })
      .catch(error => {
        // The write failed...
        console.log(error);
      });
  };

  if (errorCode === 200) {
    if (result && result.length >= 1) {
      result.map((element, index) => {
        if (element.score >= 0.7) {
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

  const __getResults = () => {
    setLoading(true);
    setDetectPressed(true);
    FetchAPI(photoUri);
  };

  const __goBack = () => {
    navigation.navigate('Trang Camera');
  };

  const __showResults = () => {
    resultsActionSheetRef.current?.show();
    setResultsActionsheetOpened(true);
  };

  const __unreliableResultsCollapse = () => {
    if (isUnreliableResultsOpened === false) {
      setUnreliableResultsOpened(true);
    } else {
      setUnreliableResultsOpened(false);
    }
  };

  const __showInfoData = () => {
    const starCountRef = ref(db, 'Objects/' + selectedResult);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
      setDescription(data.Description);
    });
    infoActionSheetRef.current?.show();
    setInfoActionsheetOpened(true);
    resultsActionSheetRef.current?.hide();
  };

  const __closeDesc = () => {
    infoActionSheetRef.current?.hide();
    setInfoActionsheetOpened(false);
    resultsActionSheetRef.current?.show();
    setResultsActionsheetOpened(true);
  };

  const __searchMap = () => {
    createHistoryData();
    Linking.openURL('http://maps.google.com/?q=' + selectedResult + ' shop');
  };

  useEffect(() => {
    if (!isLoading && isDetectPressed && errorCode === 200) {
      resultsActionSheetRef.current?.show();
      setResultsActionsheetOpened(true);
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
            <View style={{marginTop: headerHeight + 15}} />
            <ErrorChip errorCode={errorCode} />
          </View>
        )}

        {result && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photoHeight * resizeRatio,
              }}>
              <SelectedResultContext.Provider
                value={{
                  selectedResultIndex,
                  setSelectedResultIndex,
                  setSelectedResult,
                  resizeRatio,
                }}>
                {rectRegions}
                {rectRegionsLow}
              </SelectedResultContext.Provider>
            </View>
          </View>
        )}

        {result === null ? (
          <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        ) : (
          errorCode === 400 && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
              <Button
                onPress={__goBack}
                title="Thử chụp hình lại"
                style={styles.button}
              />
            </View>
          )
        )}

        {isResultsActionsheetOpened === false &&
          isInfoActionsheetOpened === false &&
          errorCode === 200 && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
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
        ref={resultsActionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        // useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        drawUnderStatusBar={false}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setResultsActionsheetOpened(false);
        }}>
        <View
          style={[
            styles.actionSheetItems,
            {paddingBottom: bottomTabHeight + 15},
          ]}>
          <SelectedResultContext.Provider
            value={{
              selectedResultIndex,
              setSelectedResultIndex,
              setSelectedResult,
            }}>
            {buttons}
          </SelectedResultContext.Provider>

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
          <SelectedResultContext.Provider
            value={{
              selectedResultIndex,
              setSelectedResultIndex,
              setSelectedResult,
            }}>
            {isUnreliableResultsOpened && buttonsLow}
          </SelectedResultContext.Provider>
          {selectedResult && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={__showInfoData}>
                <View style={styles.searchButtonViewInside}>
                  <Image
                    source={require('../../assets/icons/desc.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: '#5FC314',
                    }}
                  />
                  <Text style={styles.descButton}>Thông tin</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={__searchMap}>
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

      <ActionSheet
        ref={infoActionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        drawUnderStatusBar={false}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setInfoActionsheetOpened(false);
          setResultsActionsheetOpened(true);
          resultsActionSheetRef.current?.show();
        }}>
        <View
          style={[styles.actionSheetItems, {paddingBottom: bottomTabHeight}]}>
          <TouchableOpacity style={styles.searchButton} onPress={__closeDesc}>
            <View style={styles.searchButtonViewInside}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: '#00C5FF',
                }}
              />
              <Text style={styles.searchText}>Trở về danh sách</Text>
            </View>
          </TouchableOpacity>
          <ScrollView {...scrollHandlers}>
            <Text style={styles.descTitle}>{selectedResult}</Text>
            <Text style={styles.desc}>{description}</Text>
          </ScrollView>
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
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorBackgroundError: {
    backgroundColor: '#FF6901',
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

  //   Detect button
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchButton: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButtonViewInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 25,
    color: '#00C5FF',
    paddingLeft: 5,
  },
  descButton: {
    fontSize: 25,
    color: '#5FC314',
    paddingLeft: 5,
  },

  //   Actionsheet styles
  actionSheet: {
    backgroundColor: '#434343',
    borderRadius: 10,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    // paddingBottom: 75,
  },

  //   Desc Actionsheet
  descTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    color: 'white',
  },
});

export default ImageDetectPage;
