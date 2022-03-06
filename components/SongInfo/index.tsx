import { FunctionComponent } from 'react';
import { View, Image, Text } from 'react-native';

// Helpers
import { convertTime } from '../../helpers';

// Style
import styles from './style';

// Interface
interface Props {
    sourceImage: string;
    name: string;
    singer: string;
    duration: number;
}

const Index: FunctionComponent<Props> = props => {
    // Props
    const { singer, sourceImage, name, duration } = props;

    return (
        <View style={styles.song}>
            <Image
                style={styles.image}
                source={{
                    uri: sourceImage,
                }}
            />
            <View style={styles.info}>
                <Text style={styles.textName}>{name}</Text>
                <View style={styles.option}>
                    <Text style={styles.textOption}>{singer}</Text>
                    <Text style={styles.textOption}>
                        {convertTime(duration)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Index;
