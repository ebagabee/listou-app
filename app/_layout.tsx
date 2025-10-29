import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
