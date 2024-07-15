import { ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Tweet from '../../../../../components/Tweet_structure';
import { useQuery } from '@tanstack/react-query';
import { getTweet } from '../../../../../lib/api/tweets';

export default function TweetScreen() {
    const {id} = useLocalSearchParams();
    // console.warn(id);

    const {data, isLoading, error} = useQuery({
        queryKey: ['tweet', id],
        queryFn: () => getTweet(id as string),
    })

    if (isLoading){
        return <ActivityIndicator />
    }

    if (error){
        return <Text>Tweet {id} not found</Text>
    }

    return <Tweet tweet = {data} />
}