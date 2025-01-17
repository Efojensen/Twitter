import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { login } from '../../lib/api/auth'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const onSignIn = async () => {
        try{
            await login({email})
            router.push({pathname: '/authenticate', params: { email } })
        }catch (e){
            Alert.alert('Error ', e.message)
        }
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.label}>Sign In or create an account</Text>
            <TextInput
                placeholder = "Email"
                value = {email}
                onChangeText = {setEmail}
                style = {styles.input}
            />

            <Pressable style = {styles.button} onPress = {onSignIn}>
                <Text style = {styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    label: {
        fontSize: 24,
        marginVertical: 5,
        color: 'gray'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#050A12',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 10,
    },
    input: {
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        fontSize: 20,
        marginVertical: 5,
        borderRadius: 10,
    }
})

export default SignIn