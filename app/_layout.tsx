import { SplashScreen, Stack } from "expo-router";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { useEffect, useState } from "react";
import DefaultHeader from "../components/defaultHeader";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { createTables } from "../database/migrations";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import * as NavigationBar from 'expo-navigation-bar';
import * as shoppingListDB from "../database/shoppingList";

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
    const {theme} = useTheme();
    const db = useSQLiteContext();
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        async function prepare() {
            try {
                const viewed = await shoppingListDB.getPreference(db, 'welcome_screen_viewed');
                
                if (viewed === 'true') {
                    console.log("Usuário já viu welcome. Indo para Home.");
                    setInitialRoute('homePage');
                } else {
                    console.log("Primeira vez. Indo para Welcome.");
                    setInitialRoute('welcomePage');
                }
            } catch (e) {
                console.warn("Erro ao ler preferência:", e);
                setInitialRoute('welcomePage');
            } finally {
                console.log("Tudo pronto. Escondendo Splash.");
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        console.log("Fontes e DB prontos. Escondendo splash screen.");
        SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        NavigationBar.setButtonStyleAsync(theme.isDark ? 'light' : 'dark');
    }, [theme]);

    if (!initialRoute) {
        return null;
    }


    return (
            <Stack initialRouteName={initialRoute} screenOptions={{ animation: 'fade' }}>
                <Stack.Screen
                    name="welcomePage"
                    options={{
                        headerShown: false,
                    }}
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