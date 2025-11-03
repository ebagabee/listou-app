import { SplashScreen, Stack } from "expo-router";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { useEffect } from "react"; 
import DefaultHeader from "../components/defaultHeader";
import { SQLiteProvider } from "expo-sqlite";
import { createTables } from "../database/migrations";

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
            <Layout /> 
        </SQLiteProvider>
    );
}

function Layout() {
    useEffect(() => {
        console.log("Fontes e DB prontos. Escondendo splash screen.");
        SplashScreen.hideAsync();
    }, []);

    return (
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
    );
}