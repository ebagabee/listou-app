import { SplashScreen, Stack } from "expo-router";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { useEffect } from "react";
import DefaultHeader from "../components/defaultHeader";
import { SQLiteProvider } from "expo-sqlite";
import { createTables } from "../database/migrations";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import * as NavigationBar from 'expo-navigation-bar';

SplashScreen.preventAutoHideAsync();

async function initializeDatabase(db: any) {
    try {
        await createTables(db);
        console.log('Banco inicializado e migrações rodadas.');
    } catch (error) {
        console.error('Erro ao inicializar o banco:', error);
    }
}

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
        <SQLiteProvider databaseName="listou.db" onInit={initializeDatabase}>
            <ThemeProvider>
                <Layout />
            </ThemeProvider>
        </SQLiteProvider>
    );
}

function Layout() {
    const { theme } = useTheme();

    useEffect(() => {
        NavigationBar.setButtonStyleAsync(theme.isDark ? 'light' : 'dark');
    }, [theme]);

    return (
        <Stack screenOptions={{ animation: 'fade' }}>
            
            <Stack.Screen name="index" options={{ headerShown: false }} /> 

            <Stack.Screen
                name="welcomePage"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="homePage"
                options={{
                    header: () => <DefaultHeader />
                }}
            />
        </Stack>
    );
}