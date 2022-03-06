import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
} from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';

// Components
import { Header, SongInfo, Player } from './components';

// Data
import Data, { DataInterface } from './Data';

export default function App() {
    // State
    const [song, setSong] = useState<DataInterface>();
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);
    const [positionSong, setPositionSong] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [sound, setSound] = useState<Audio.Sound>();

    const renderItem: ListRenderItem<DataInterface> = ({ item }) => (
        <TouchableOpacity onPress={() => handleUpdateSong(item.id)}>
            <SongInfo
                name={item.name}
                duration={item.duration}
                singer={item.singer}
                sourceImage={item.sourceImage}
            />
        </TouchableOpacity>
    );

    // Effect
    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);
    useEffect(() => {
        const getSong = async (): Promise<void> => {
            if (song) {
                setPositionSong(0);
                setIsPlaying(false);
                setIsBuffering(true);

                const soundAsync = await Audio.Sound.createAsync(
                    {
                        uri: song.sourceUri,
                    },
                    { shouldPlay: true }
                );
                setSound(soundAsync.sound);

                soundAsync.sound.setOnPlaybackStatusUpdate(
                    onPlaybackStatusUpdate
                );
            }
        };

        getSong();
    }, [song]);

    // Handle
    const handleUpdateSong = async (id: string): Promise<void> => {
        const findSong = Data.find(item => item.id === id);

        if (findSong) {
            setSong(findSong);
            setIsModal(true);
        }
    };
    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            setIsBuffering(status.isBuffering);
            setPositionSong(status.positionMillis);
            setIsPlaying(status.isPlaying);
        }
    };
    const handleCloseModal = async (): Promise<void> => {
        setIsModal(false);

        await sound?.pauseAsync();
    };
    const handleUpdatePositionSong = (value: number) => setPositionSong(value);
    const handleUpdateIndexSong = async (
        id: string,
        type: 'next' | 'previous'
    ): Promise<void> => {
        await sound?.pauseAsync();
        setIsPlaying(false);

        const indexSong = Data.findIndex(item => item.id === id);

        if (indexSong !== -1) {
            setPositionSong(0);

            if (type === 'next') {
                if (indexSong + 1 >= Data.length) {
                    setSong(Data[0]);

                    return;
                }

                setSong(Data[indexSong + 1]);

                return;
            }

            if (type === 'previous') {
                if (indexSong - 1 < 0) {
                    setSong(Data[Data.length - 1]);

                    return;
                }

                setSong(Data[indexSong - 1]);
            }
        }
    };
    const handlePlay = async (): Promise<void> => {
        if (sound) {
            setIsPlaying(preIsPlaying => !preIsPlaying);

            if (isPlaying) {
                await sound.pauseAsync();

                return;
            }

            await sound.playAsync();
        }
    };
    const handleUpdatePosition = async (value: number): Promise<void> => {
        if (sound) {
            await sound.setPositionAsync(value);
        }
    };

    return (
        <>
            <StatusBar style='dark' />
            <Header />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={Data}
                    keyExtractor={item => item.name}
                    renderItem={renderItem}
                />
            </SafeAreaView>
            {song && (
                <Player
                    song={song}
                    isModal={isModal}
                    isBuffering={isBuffering}
                    isPlaying={isPlaying}
                    positionSong={positionSong}
                    handleCloseModal={handleCloseModal}
                    handleUpdatePositionSong={handleUpdatePositionSong}
                    handleUpdateSong={handleUpdateIndexSong}
                    handlePlay={handlePlay}
                    handleUpdatePosition={handleUpdatePosition}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
