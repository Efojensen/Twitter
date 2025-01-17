import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { authenticate } from '@/lib/api/auth';
import { useAuth } from '@/context/authContext';

const Authenticate = () => {
    const [code, setCode] = useState('');
    const { email } = useLocalSearchParams()

    const { updateAuthToken } = useAuth()

    const onConfirm = async () => {
        if (typeof email !== 'string'){
            return;
        }
        try{
            const res = await authenticate({ email, emailToken: code })
            await updateAuthToken(res.authToken)
        }catch (e){
            Alert.alert("Error ", "Email code doesn't match")
        }
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.label}>Confirm your email</Text>
            <TextInput
                placeholder = "Email code"
                value = {code}
                onChangeText = {setCode}
                style = {styles.input}
            />

            <Pressable style = {styles.button} onPress = {onConfirm}>
                <Text style = {styles.buttonText}>Confirm</Text>
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

export default Authenticate