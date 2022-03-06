import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        right: 20,
    },
    img: {
        width: 240,
        height: 240,
        borderRadius: 15,
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#686868',
        marginTop: 20,
        marginBottom: 10,
    },
    textSinger: {
        fontSize: 16,
        color: '#9a9a9a',
    },
    content: { width: '80%', marginTop: 30 },
    slider: {
        width: '100%',
    },
    timer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textTime: {
        color: '#787878',
    },
});
