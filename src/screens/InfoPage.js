import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {FocusAwareStatusBar} from '../components/FocusAwareStatusBar';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../components/firebase';

export default function InfoPage({route}) {
  const {selectedResult} = route.params;
  const [ObjectsName, setObjectsName] = useState('');
  const [Description, setDescription] = useState('');

  // function createData() {
  //   // const newKey = push(child(ref(database), 'users')).key;

  //   set(ref(db, 'Objects/' + ObjectsName), {
  //     ObjectsName: ObjectsName,
  //     Description: Description,
  //   })
  //     .then(() => {
  //       // Data saved successfully!
  //       alert('data updated!');
  //     })
  //     .catch(error => {
  //       // The write failed...
  //       alert(error);
  //     });
  // }

  // function update() {
  //   // const newKey = push(child(ref(database), 'users')).key;

  //   update(ref(db, 'users/' + username), {
  //     username: username,
  //     email: email,
  //   })
  //     .then(() => {
  //       // Data saved successfully!
  //       alert('data updated!');
  //     })
  //     .catch(error => {
  //       // The write failed...
  //       alert(error);
  //     });
  // }

  // function deleteData() {
  //   remove(ref(db, 'users/' + username));
  //   alert('removed');
  // }

  function readData() {
    const starCountRef = ref(db, 'Objects/' + selectedResult);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      setDescription(data.Description);
    });
  }

  useEffect(() => {
    readData();
  });

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <Text>{selectedResult}</Text>
      <Text>{Description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
  },
});
