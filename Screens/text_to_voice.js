import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { Permissions } from 'expo';
import * as Speech from 'expo-speech';

export default function App({navigation}) {
  const [name, setName] = useState('');

  useEffect(() => {
    getPermissions();
    listAllVoiceOptions();
  }, []);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.SPEECH);
    if (status !== 'granted') {
      alert('Permission to use speech synthesis is required!');
    }
  };

  const listAllVoiceOptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
  };

  const speakGreeting = () => {
    const greeting = `Hi ${name}`;
    const options = {
      voice: 'com.apple.speech.synthesis.voice.Fred',
      pitch: 1.5,
      rate: 0.7,
    };
    try {
      Speech.speak(greeting, options);
    } catch (error) {
      console.error('Failed to speak', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <Button title="Speak" onPress={speakGreeting} />
      <StatusBar style="auto" />
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
  input: {
    alignSelf: 'stretch',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
});
