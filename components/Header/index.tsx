import { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

// Styles
import styles from './style';

const Index: FunctionComponent = () => (
    <View style={styles.header}>
        <Text style={styles.textHeader}>List Song</Text>
    </View>
);

export default Index;
