import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import theme from '../app/theme';
import ListCard from '../components/ListCard';
import { Plus } from 'lucide-react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as shoppingListDB from "../database/shoppingList";
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type List = {
    id: number;
    name: string;
};

export default function HomePage() {
    const router = useRouter();
    const db = useSQLiteContext();
    const [lists, setLists] = useState<List[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            async function loadLists() {
                try {
                    const allLists = await shoppingListDB.getLists(db);
                    setLists(allLists);
                } catch (error) {
                    console.error("Erro ao carregar listas:", error);
                    Alert.alert("Erro", "Não foi possível carregar suas listas.");
                }
            }

            loadLists();
        }, [db])
    );

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
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <ListCard
                            key={list.id}
                            title={list.name}
                            itemsPreview="JAJA EU COLOCO DINAMICO ISSO"

                            onPress={() => router.push({
                                pathname: `/list/${list.id}`,
                                params: { listName: list.name }
                            })}

                            onDelete={() => console.log("teste")}
                        />
                    ))
                ) : (
                    <Text>Nenhuma lista criada ainda.</Text>
                )
                }
            </ScrollView>

            <TouchableOpacity
                onPress={handleCreateListAndNavigate}
            >
                <LinearGradient
                    colors={['#FFA879', '#FF5900']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.actionBtn}
                >
                    <Plus size={32} color="white" strokeWidth={3} />
                </LinearGradient>
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
        bottom: 60,
        right: 16,
        shadowColor: '#000',
        width: 65,
        height: 65,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
    }
});