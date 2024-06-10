import { View, StyleSheet, Image, TextInput, Pressable } from 'react-native'
import { Link } from "expo-router"

const user = {
    id: 't0',
    user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
    },
}
export default function NewTweet(){
    return (
        <View style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <Link href = '../' style = {{fontSize: 20}}>Cancel</Link>

            </View>
            <View style = {styles.inputContainer}>
                <Image source = {{uri: user.user.image}} style={styles.image}></Image>
                <TextInput placeholder= "What's happening?"
                multiline
                numberOfLines = {8}
                style = {{flex: 1}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    }
})