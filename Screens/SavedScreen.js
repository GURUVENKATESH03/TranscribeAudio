import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
export default function SavedScreen() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
        recording.startAsync(); // Start recording immediately after creation
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      if (!recording) {
        return;
      }

      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const recordingURI = recording.getURI();
      setRecordings([...recordings, { sound, duration: getDurationFormatted(status.durationMillis), file: recordingURI }]);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return `${Math.floor(minutes)}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  const downloadFromAPI = async (recordingLine) => {
    const filename = "Recording.wav"; // Adjust the filename as needed
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const url = `http://${localhost}:5000/generate-pdf?name=MissCoding&email=hello@tripwiretech.com`;

    try {
      const result = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + filename,
        {
          headers: {
            "MyHeader": "MyValue"
          }
        }
      );
      console.log(result);
      save(result.uri, filename, result.headers["Content-Type"]);
    } catch (error) {
      console.error('Failed to download file', error);
    }
  };

  const save = async (uri, filename, mimetype) => {
    try {
      const permissions = await FileSystem.requestStoragePermissionsAsync();
      if (permissions.status === 'granted') {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + filename, base64, { encoding: FileSystem.EncodingType.Base64 });
        console.log('File saved successfully');
      } else {
        console.log('Storage permission not granted');
      }
    } catch (error) {
      console.error('Failed to save file', error);
    }
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording #{index + 1} | {recordingLine.duration}
        </Text>
        <Button onPress={() => recordingLine.sound.replayAsync()} title="Play" />
        <Button onPress={() => recordingLine.sound.stopAsync()} title="Stop" />
        <Button onPress={() => downloadFromAPI(recordingLine)} title="Convert" />
      </View>
    ));
  }

  function clearRecordings() {
    setRecordings([]);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {getRecordingLines()}
      <Button
        title={recordings.length > 0 ? 'Clear Recordings' : ''}
        onPress={clearRecordings}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  fill: {
    flex: 1,
    marginHorizontal: 15,
  },
});
