import { FunctionComponent, useState } from 'react';
import {
    Modal,
    Pressable,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// Helpers
import { convertTime } from '../../helpers';

// Style
import styles from './style';

// Interface
interface SongInterface {
    sourceImage: string;
    sourceUri: string;
    name: string;
    singer: string;
    duration: number;
    id: string;
}
interface Props {
    isModal: boolean;
    positionSong: number;
    isPlaying: boolean;
    isBuffering: boolean;
    handleCloseModal: () => Promise<void>;
    handleUpdatePositionSong: (value: number) => void;
    handlePlay: () => void;
    song: SongInterface;
    handleUpdateSong: (id: string, type: 'next' | 'previous') => Promise<void>;
    handleUpdatePosition: (value: number) => Promise<void>;
}

const Index: FunctionComponent<Props> = props => {
    // Props
    const {
        isBuffering,
        isModal,
        isPlaying,
        positionSong,
        song,
        handleCloseModal,
        handlePlay,
        handleUpdatePositionSong,
        handleUpdateSong,
        handleUpdatePosition,
    } = props;

    return (
        <Modal
            style={{ flex: 1 }}
            animationType='slide'
            transparent={true}
            visible={isModal}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.close}
                    onPress={handleCloseModal}
                >
                    <FontAwesome name='close' size={24} color='#767676' />
                </TouchableOpacity>
                <Image
                    source={{
                        uri: song.sourceImage,
                    }}
                    style={styles.img}
                />
                <Text style={styles.textName}>{song.name}</Text>
                <Text style={styles.textSinger}>{song.singer}</Text>
                <View style={styles.content}>
                    <View style={styles.timer}>
                        <Text style={styles.textTime}>
                            {convertTime(positionSong)}
                        </Text>
                        <Text style={styles.textTime}>
                            {convertTime(song.duration)}
                        </Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={song.duration}
                        value={positionSong}
                        minimumTrackTintColor='#fe8e3a'
                        maximumTrackTintColor='#dbdbdb'
                        onValueChange={handleUpdatePositionSong}
                        onSlidingComplete={handleUpdatePosition}
                        tapToSeek={true}
                        disabled={isBuffering}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => handleUpdateSong(song.id, 'previous')}
                    >
                        <FontAwesome
                            name='backward'
                            size={30}
                            color='#686868'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={handlePlay}
                    >
                        <FontAwesome
                            name={
                                isPlaying ? 'pause-circle-o' : 'play-circle-o'
                            }
                            size={50}
                            color='#ff7143'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleUpdateSong(song.id, 'next')}
                    >
                        <FontAwesome name='forward' size={30} color='#686868' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default Index;
