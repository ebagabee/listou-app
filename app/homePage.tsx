import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import theme from '../app/theme';
import ListCard from '../components/ListCard';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as shoppingListDB from "../database/shoppingList";
import { useSQLiteContext } from 'expo-sqlite';

export default function HomePage() {
    const router = useRouter();

    const db = useSQLiteContext();

    const handleCreateListAndNavigate = async () => {
        const defaultListName = "Nova Lista";

        try {
            const result = await shoppingListDB.addList(db, defaultListName);

            const newListId = result.lastInsertRowId;

            if (newListId) {
                router.push({
                    pathname: `/list/${newListId}`,
                    params: { listName: defaultListName }
                })
            } else {
                throw new Error("Não foi possível obter o ID da nova lista.");
            }
        } catch (error) {
            console.error("Erro ao criar a lista:", error);
            Alert.alert("Erro", "Não foi possível criar a nova lista.");
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ListCard
                    title="Churrasco Fim de Semana"
                    itemsPreview="Picanha, Linguiça, Pão de Alho, Cerveja"
                    onPress={() => console.log("Abrir Churrasco")}
                    onPressMenu={() => console.log("Menu Churrasco")}
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleCreateListAndNavigate}
            >
                <Plus size={24} color="white" />
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingTop: 16,
        paddingHorizontal: 10,
        paddingBottom: 100,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        margin: 16,
        marginTop: 24,
    },
    actionBtn: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: theme.colors.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
    }
});