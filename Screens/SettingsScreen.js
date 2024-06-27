import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Voice from '@react-native-community/voice';

export default function SavedScreen() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function startAudioRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopAudioRecording() {
    setRecording(undefined);
    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const uri = recording.getURI();
      setRecordings([...recordings, { sound, duration: getDurationFormatted(status.durationMillis), file: uri }]);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  async function startVoiceRecognition() {
    setIsRecordingVoice(true);
    setRecognizedText('');
    setLoading(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Failed to start voice recognition', error);
      setIsRecordingVoice(false);
      setLoading(false);
    }
  }

  async function stopVoiceRecognition() {
    setIsRecordingVoice(false);
    setLoading(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Failed to stop voice recognition', error);
    }
  }

  function onSpeechResults(e) {
    setRecognizedText(e.value[0]);
    setLoading(false);
  }

  function onSpeechError(e) {
    console.error('Speech recognition error', e);
    setLoading(false);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording #{index + 1} | {recordingLine.duration}
        </Text>
        <Button onPress={() => recordingLine.sound.replayAsync()} title="Play" />
      </View>
    ));
  }

  function clearRecordings() {
    setRecordings([]);
  }

  return (
    <View style={styles.container}>
      <Button title={recording ? 'Stop Audio Recording' : 'Start Audio Recording'} onPress={recording ? stopAudioRecording : startAudioRecording} />
      {getRecordingLines()}
      <Button title={isRecordingVoice ? 'Stop Voice Recognition' : 'Start Voice Recognition'} onPress={isRecordingVoice ? stopVoiceRecognition : startVoiceRecognition} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text>{recognizedText}</Text>
      <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecordings} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40
  },
  fill: {
    flex: 1,
    margin: 15
  }
});
