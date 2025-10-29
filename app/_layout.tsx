import { SplashScreen, Stack } from "expo-router";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen
                name="welcomePage"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
