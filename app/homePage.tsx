import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable, Modal, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ListCard from '../components/ListCard';
import { Plus } from 'lucide-react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as shoppingListDB from "../database/shoppingList";
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ListInterface } from '../types/list';

export default function HomePage() {
    const { theme } = useTheme();

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

    const modalStyles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        },
        container: {
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 12,
            width: '90%',
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 16,
            textAlign: 'center',
        },
        input: {
            width: '100%',
            height: 50,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 20,
            fontSize: 16,
            backgroundColor: '#f9f9f9',
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            paddingVertical: 12,
            borderRadius: 8,
            flex: 1,
            alignItems: 'center',
        },
        cancelButton: {
            backgroundColor: '#f0f0f0',
            marginRight: 10,
        },
        cancelButtonText: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 16,
        },
        saveButton: {
            backgroundColor: theme.colors.primary,
        },
        saveButtonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });
    const router = useRouter();
    const db = useSQLiteContext();

    const [lists, setLists] = useState<ListInterface[]>([]);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
    const [listToRename, setListToRename] = useState<ListInterface | null>(null);
    const [modalNewName, setModalNewName] = useState("");

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

    const handleMenuToggle = (listId: number) => {
        setActiveMenuId(prevId => (prevId === listId ? null : listId));
    }

    const closeActiveMenu = () => {
        setActiveMenuId(null);
    }

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

    const handleRenamePress = (list: ListInterface) => {
        setListToRename(list);
        setModalNewName(list.name);
        setIsRenameModalVisible(true);
    };

    const handleRenameCancel = () => {
        setIsRenameModalVisible(false);
        setListToRename(null);
        setModalNewName("");
    };

    const handleRenameSubmit = async () => {
        if (!listToRename || !modalNewName.trim()) {
            return;
        }

        const newName = modalNewName.trim();

        try {
            await shoppingListDB.updateListName(db, listToRename.id, newName);

            setLists((currentLists) => {
                return currentLists.map((list) => {
                    return list.id === listToRename.id ? { ...list, name: newName } : list
                })
            });

            handleRenameCancel();
        } catch (error) {
            console.error("Erro ao renomear lista: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={{ flex: 1 }} onPress={closeActiveMenu}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    onScrollBeginDrag={closeActiveMenu}
                    keyboardShouldPersistTaps='handled'
                >
                    <View onStartShouldSetResponder={() => true}>
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

                                    onDelete={() => {
                                        console.log("teste");
                                        closeActiveMenu();
                                    }}

                                    onRename={() => handleRenamePress(list)}

                                    isMenuOpen={activeMenuId === list.id}
                                    onMenuToggle={() => handleMenuToggle(list.id)}
                                />
                            ))
                        ) : (
                            <Text>Nenhuma lista criada ainda.</Text>
                        )
                        }
                    </View>

                </ScrollView>
            </Pressable>


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

            <Modal
                transparent={true}
                animationType="fade"
                visible={isRenameModalVisible}
                onRequestClose={handleRenameCancel}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={modalStyles.overlay}
                >
                    <Pressable style={modalStyles.overlay} onPress={handleRenameCancel}>
                        <View style={modalStyles.container} onStartShouldSetResponder={() => true}>
                            <Text style={modalStyles.title}>Renomear Lista</Text>
                            <TextInput
                                value={modalNewName}
                                onChangeText={setModalNewName}
                                style={modalStyles.input}
                                autoFocus={true}
                                placeholder="Novo nome da lista"
                            />
                            <View style={modalStyles.buttonRow}>
                                <TouchableOpacity
                                    style={[modalStyles.button, modalStyles.cancelButton]}
                                    onPress={handleRenameCancel}
                                >
                                    <Text style={modalStyles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[modalStyles.button, modalStyles.saveButton]}
                                    onPress={handleRenameSubmit}
                                >
                                    <Text style={modalStyles.saveButtonText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Pressable>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
}


