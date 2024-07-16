import { useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const segments = useSegments();
    const router = useRouter();

    console.log(segments);
    console.log('Auth token: ', authToken);

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';

        if (!authToken && !isAuthGroup) {
            console.log('User is not yet authenticated and cannot see this page');
            router.replace('/sign_in');
        }
        if (authToken && isAuthGroup) {
            router.replace('/');
        }
    }, [segments, authToken]);

    useEffect(() => {
        const loadAuthToken = async () => {
            try {
                console.log('Loading auth token...');
                const res = await SecureStore.getItemAsync('authToken');
                if (res) {
                    setAuthToken(res);
                }
            } catch (error) {
                console.error('Failed to load auth token:', error);
            }
        };
        loadAuthToken();
    }, []);

    const updateAuthToken = async (newToken: string) => {
        try {
            await SecureStore.setItemAsync('authToken', newToken);
            setAuthToken(newToken);
        } catch (error) {
            console.error('Failed to update auth token:', error);
        }
    };

    const removeAuthToken = async () => {
        try {
            await SecureStore.deleteItemAsync('authToken');
            setAuthToken(null);
        } catch (error) {
            console.error('Failed to remove auth token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
