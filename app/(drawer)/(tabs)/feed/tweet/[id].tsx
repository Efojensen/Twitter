import { Text } from 'react-native';
import tweets from '../../../../../assets/data/tweets'
import { useLocalSearchParams } from 'expo-router';
import Tweet from '../../../../../components/Tweet_structure';

export default function TweetScreen() {
    const {id} = useLocalSearchParams();
    console.warn(id);

    const tweet = tweets.find((t) => t.id === id)

    if (!tweet){
        return <Text>Tweet {id} not found</Text>
    }

    return <Tweet tweet = {tweet} />
}