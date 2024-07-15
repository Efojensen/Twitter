import { useState } from 'react'
import { Link, useRouter } from "expo-router"
import { View, StyleSheet, Image, SafeAreaView,
            TextInput, Pressable, Text, ActivityIndicator} from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTweet } from '@/lib/api/tweets';

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

// Logic that calls the post method for a new tweet

export default function NewTweet(){
    const [text, setText] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();

    const {mutateAsync, isPending, isError, error } = useMutation({
        mutationFn: createTweet,
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ['tweets']})
            queryClient.setQueriesData(['tweets'], (existingTweets) => {
                return [data, ...existingTweets]
            })
        }
    });

    const onTweetPress = async() => {
        try{
            await mutateAsync({ content: text})
            setText('')
            router.back()
        }catch (e){
            console.log('Error: ', e.message);
        }

    }
    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
            <View style = {styles.container}>
                <View style = {styles.buttonContainer}>
                    <Link href = '../' style = {{fontSize: 20}}>Cancel</Link>
                    {isPending && <ActivityIndicator />}

                    <Pressable onPress = {onTweetPress} style = {styles.button}>
                        <Text style = {styles.buttonText}>Tweet</Text>
                    </Pressable>
                </View>
                <View style = {styles.inputContainer}>
                    <Image source = {{uri: user.user.image}} style={styles.image}></Image>
                    <TextInput placeholder= "What's happening?"
                        value = {text}
                        multiline
                        onChangeText = {setText}
                        numberOfLines = {8}
                        style = {{flex: 1}}
                    />
                </View>
                {isError && <Text>Error: {error.message}</Text>}
            </View>
        </SafeAreaView>
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
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#1c98F0',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
    }
})