import { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 3000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Teste</Text>
        </View>
    );
}
