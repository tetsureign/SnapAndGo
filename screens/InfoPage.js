import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native';
import {FocusAwareStatusBar} from '../components/FocusAwareStatusBar';
import {useState} from 'react/cjs/react.development';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../firebase';

export default function InfoPage({route}) {
  // const {selectedResult} = route.params;
  const [ObjectsName, setObjectsName] = useState('');
  const [Description, setDescription] = useState('');

  function createData() {
    // const newKey = push(child(ref(database), 'users')).key;

    set(ref(db, 'Objects/' + ObjectsName), {
      ObjectsName: ObjectsName,
      Description: Description,
    })
      .then(() => {
        // Data saved successfully!
        alert('data updated!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }

  function update() {
    // const newKey = push(child(ref(database), 'users')).key;

    update(ref(db, 'users/' + username), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        alert('data updated!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }

  function readData() {
    const starCountRef = ref(db, 'Objects/' + ObjectsName);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      setDescription(data.Description);
    });
  }

  function deleteData() {
    remove(ref(db, 'users/' + username));
    alert('removed');
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'dark-content'} />
      <TextInput
        // defaultValue={selectedResult}
        value={ObjectsName}
        onChangeText={ObjectsName => {
          setObjectsName(ObjectsName);
        }}
        placeholder="Objects"
        style={styles.textBoxes}
      />
      <TextInput
        value={Description}
        onChangeText={Description => {
          setDescription(Description);
        }}
        placeholder="Description"
        style={styles.textBoxes}
      />
      <Button
        onPress={readData}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
