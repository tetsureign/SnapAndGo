import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {FocusAwareStatusBar} from '../components/FocusAwareStatusBar';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../components/firebase';

export default function HistoryPage() {
  const isFocused = useIsFocused();

  const [results, setResults] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  let items = [];

  if (results) {
    let index = 1;
    results.forEach(element => {
      let item = element.val();
      items.push(
        <TouchableOpacity
          style={styles.historyItemsContainer}
          key={index}
          onPress={() => {
            Linking.openURL(
              'http://maps.google.com/?q=' + item.ObjectsName + ' shop',
            );
          }}>
          <Text style={styles.historyItemsName}>{item.ObjectsName}</Text>
          <Text style={styles.historyItemsDate}>{item.currentDate}</Text>
        </TouchableOpacity>,
      );
      index++;
    });
  }

  function readData() {
    const starCountRef = ref(db, 'HistorySearch/');
    onValue(starCountRef, snapshot => {
      setRefreshing(false);
      console.log(snapshot);
      setResults(snapshot);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    readData();
  }, []);

  useEffect(() => {
    setRefreshing(true);
    readData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FocusAwareStatusBar barStyle={'dark-content'} />
      {items}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyItemsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  historyItemsName: {
    fontWeight: 'bold',
    color: 'black',
  },
  historyItemsDate: {
    color: '#BFBFBF',
  },
});
