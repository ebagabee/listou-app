import { SplashScreen, Stack } from "expo-router";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { useEffect } from "react";
import DefaultHeader from "../components/defaultHeader";
import { SQLiteProvider } from "expo-sqlite";
import { createTables } from "../database/migrations";

SplashScreen.preventAutoHideAsync();

async function onInitErrorHandler(db: any) {
    try {
        await createTables(db);
        console.log('Banco inicializado');
    } catch (error) {
        console.error('Erro ao criar tabelas', error);
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
        <SQLiteProvider databaseName="shoppingList.db" onInit={onInitErrorHandler}>
            <Stack>
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
        </SQLiteProvider>
    );
}
