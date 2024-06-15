import { Link } from 'expo-router'
import { TweetType } from '../types'
import { Entypo } from "@expo/vector-icons"
import IconButton from '../components/IconButton'
import { View, Image, StyleSheet, Text, Pressable } from "react-native"


type TweetProps = {
    tweet: TweetType;
}

const Tweet = ({ tweet }: TweetProps) => {
    return (
        <Link href = {`feed/tweet/${tweet.id}`} asChild>
        <Pressable style={styles.container}>
            <Image source = {{uri: tweet.user.image}} style = {styles.userImage} />
            <View style = {styles.mainContainer}>
                <View style={{flexDirection: 'row'}}>
                <Text style = {styles.userName}>{tweet.user.name}</Text>
                <Text style = {styles.name}>{tweet.user.username}·2h</Text>
                <Entypo
                    name='dots-three-horizontal'
                    size={16} color='gray'
                    style = {{marginLeft: 'auto'}}
                />
            </View>
            <Text style = {styles.content}>{tweet.content}</Text>
            {tweet.image && <Image source = {{uri: tweet.image}} style={styles.image} />}

            <View style ={styles.footer}>
                <IconButton icon = 'comment' text = {tweet.numberOfComments} />
                <IconButton icon = 'retweet' text = {tweet.numberOfRetweets} />
                <IconButton icon = 'heart' text = {tweet.numberOfLikes} />
                <IconButton icon = 'chart' text = {tweet.impressions || 0} />
                <IconButton icon = 'share-apple' />
            </View>
            </View>
        </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white'
},
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    mainContainer: {
        marginLeft: 10,
        flex: 1
    },
    name: {
        fontWeight: "bold"
    },
    content: {
        lineHeight: 20
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginVertical: 10,
        borderRadius: 12,
    },
    userName: {
        color: 'gray',
        marginLeft: 5,
    },
    footer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between'
    }
});

export default Tweet;