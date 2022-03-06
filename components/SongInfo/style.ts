import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    song: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: '100%',
        height: 60,
        alignItems: 'center',
        marginVertical: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    info: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444444',
    },
    textOption: {
        fontSize: 14,
        color: '#c5c5c5',
    },
});
