import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    header: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    textHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(254,144,61)',
    },
});
