import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Player from './Player';

export default function App() {
  LogBox.ignoreAllLogs(true);
  const promise = new Promise((resolve, reject) => {

    resolve.getStatusAsync().then((result) => {
      console.log(result.durationMillis)
    });
  });

  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [musics, setMusics] = useState([
    {
      id: 1,
      name: 'Music 1',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
    },
    {
      id: 2,
      name: 'Music 2',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
    },
    {
      id: 3,
      name: 'Music 3',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    },
    {
      id: 4,
      name: 'Music 4',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    },
    {
      id: 5,
      name: 'Music 5',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
    },
    {
      id: 6,
      name: 'Music 6',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    },
    {
      id: 7,
      name: 'Music 7',
      artist: 'T. Schürger',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
    },
  ]);

  const changeMusic = async (id) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    let curFile = null;

    let newMusics = musics.filter((val, k) => {
      if (id == k) {
        musics[k].playing = true;
        curFile = musics[k].file;
        setPlaying(true);
        setAudioIndex(id);
      }
      else {
        musics[k].playing = false;
      }

      return musics[k];
    })

    if (audio != null) {
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) { }

    promise(curAudio);

    setAudio(curAudio);
    setMusics(newMusics);
    setPlaying(true);
  }



  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={styles.title}>Music App</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.text}>Music</Text>
          <Text style={styles.text}>Artist</Text>
        </View>
        {
          musics.map((val, k) => {
            if (val.playing) {
              return (
                <View style={styles.table} key={val.id}>
                  <TouchableOpacity onPress={() => changeMusic(k)} style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={styles.tableTextSelected}><AntDesign name="play" size={15} color={"#1db954"} /> {val.name}</Text>
                    <Text style={styles.tableTextSelected}>{val.artist}</Text>
                  </TouchableOpacity>
                </View>
              )
            } else {
              return (
                <View style={styles.table} key={val.id}>
                  <TouchableOpacity onPress={() => changeMusic(k)} style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={styles.tableText}><AntDesign name="play" size={15} color={"white"} /> {val.name}</Text>
                    <Text style={styles.tableText}>{val.artist}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <Player
        playing={playing}
        setPlaying={setPlaying}
        audioIndex={audioIndex}
        setAudioIndex={setAudioIndex}
        musics={musics}
        setMusics={setMusics}
        audio={audio}
        setAudio={setAudio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    width: '100%',
    backgroundColor: '#1db954',
    padding: 20,
    paddingTop: 40
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  text: {
    width: '50%',
    color: 'rgb(200, 200, 200)'
  },
  tableTextSelected: {
    color: '#1db954',
    width: '50%'
  },
  tableText: {
    color: 'white',
    width: '50%'
  }
});
