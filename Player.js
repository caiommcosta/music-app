import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';


export default function Player(props) {
    const handleBack = async () => {
        let newIndex = props.audioIndex - 1;

        if (newIndex < 0) {
            newIndex = props.musics.length - 1;
        }
        props.setAudioIndex(newIndex);

        let curFile = props.musics[newIndex].file;

        let newMusics = props.musics.filter((val, k) => {
            if (props.audioIndex == k) {
                props.musics[k].playing = true;
                curFile = props.musics[k].file;
            }
            else
                props.musics[k].playing = false;

            return props.musics[k];
        })
        if (props.audio != null) {
            props.audio.unloadAsync();
        }

        let curAudio = new Audio.Sound();

        try {
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        } catch (error) { }
        
        props.setAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true);
    }



    const handleNext = async () => {
        let newIndex = props.audioIndex + 1;

        if (newIndex >= props.musics.length) {
            newIndex = 0;
        }
        props.setAudioIndex(newIndex);

        let curFile = props.musics[newIndex].file;

        let newMusics = props.musics.filter((val, k) => {
            if (props.audioIndex == k) {
                props.musics[k].playing = true;
                curFile = props.musics[k].file;
            }
            else
                props.musics[k].playing = false;

            return props.musics[k];
        })
        if (props.audio != null) {
            props.audio.unloadAsync();
        }

        let curAudio = new Audio.Sound();

        try {
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        } catch (error) { }

        props.setAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true);
    }



    const handlePlay = async () => {
        let curFile = props.musics[props.audioIndex].file;
        let newMusics = props.musics.filter((val, k) => {
            if (props.audioIndex == k) {
                props.musics[k].playing = true;
                curFile = props.musics[k].file;
            }
            else
                props.musics[k].playing = false;

            return props.musics[k];
        })


        try {
            if (props.audio != null) {
                props.setPlaying(true);
                props.setMusics(newMusics);
                await props.audio.playAsync();
            } else {
                let curAudio = new Audio.Sound();

                try {
                    await curAudio.loadAsync(curFile);
                    curAudio.playAsync();
                } catch (error) { }

                props.setAudio(curAudio);
                props.setMusics(newMusics);
                props.setPlaying(true);
            }
        } catch (error) { }


    }


    const handlePause = async () => {
        if (props.audio != null)
            props.audio.pauseAsync();

        props.setPlaying(false);
    }


    return (
        <View style={styles.player}>

            <View style={styles.playerButtons}>
                <TouchableOpacity onPress={() => handleBack()} style={{ right: 0, bottom: 0}}>
                    <AntDesign name='banckward' size={35} color={"white"} />
                </TouchableOpacity>
                {
                    (!props.playing) ?
                        <TouchableOpacity onPress={() => handlePlay()} style={styles.btnPlay}>
                            <AntDesign name='playcircleo' size={40} color={"white"} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => handlePause()} style={styles.btnPause}>
                            <AntDesign name='pausecircleo' size={40} color={"#111"} />
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => handleNext()} style={{ right: 0, bottom:0}}>
                    <AntDesign name='forward' size={35} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    player: {
        width: '100%',
        height: 180,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 998,
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    playerButtons: {
        width: '100%',
        paddingLeft: 70,
        paddingRight: 70,
        height: 100,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#191919',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    slider: {
        width: '80%',
        height: 40,
        bottom: 100,
        position: 'absolute',
        zIndex: 999
    },
    text: {
        color: 'white'
    },
    musicTime: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: 100,
        padding: 10
    },
    btnPlay: {
        bottom: 0,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#111",
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#111",
        color: "white"
    },
    btnPause: {
        bottom: 0,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#1db954",
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#1db954",
        color: "111"
    }
})