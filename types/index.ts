import 'react-native-gesture-handler'
import 'expo-router/entry'

export type User = {
    id: string,
    name: string,
    username: string,
    image?: string,
}
export type TweetType = {
    id: string,
    user: User,
    content: string,
    createdAt: string,
    image?: string,
    numberOfComments?: number,
    numberOfRetweets?: number,
    numberOfLikes?: number,
    impressions?: number,
}
