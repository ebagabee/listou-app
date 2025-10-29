import { Stack } from "expo-router";

export default function RootLayout() {
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
