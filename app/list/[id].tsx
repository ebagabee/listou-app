import { useLocalSearchParams } from "expo-router";
import {
    StyleSheet, Text, TouchableOpacity, View,
    TextInput, Alert, KeyboardAvoidingView, Platform // 1. Imports
} from "react-native";
import theme from "../theme";
import React, { useState } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import * as shoppingListDB from "../../database/shoppingList";

export default function ListDetailPage() {
    const params = useLocalSearchParams();
    const { id, listName } = params;
    const db = useSQLiteContext();

    const [isFormVisible, setFormVisible] = useState(false);

    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleCancel = () => {
        setItemName("");
        setQuantity("");
        setPrice("");
        setFormVisible(false);
    }

    const handleAddItem = async () => {
        if (itemName.trim().length === 0) {
            Alert.alert("Erro", "O nome do item é obrigatório.");
            return;
        }

        try {
            const listIdNum = parseInt(String(id), 10);
            const qtyNum = parseFloat(quantity.replace(',', '.')) || 1;
            const priceNum = parseFloat(price.replace(',', '.')) || undefined;

            await shoppingListDB.addListItem(
                db,
                listIdNum,
                itemName,
                qtyNum,
                priceNum
            );
            handleCancel();

        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            Alert.alert("Erro", "Não foi possível adicionar o item.");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.topContainer}>
                <Text style={styles.textLabel}>4 Items </Text>
                <Text style={styles.textLabel}>Total: R$9890 </Text>
            </View>

            {isFormVisible ? (
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Nome do item"
                        style={styles.input}
                        value={itemName}
                        onChangeText={setItemName}
                        autoFocus={true}
                    />
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Quantidade (opc.)"
                            style={[styles.input, styles.inputHalf]}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                        <TextInput
                            placeholder="Preço (opc.)"
                            style={[styles.input, styles.inputHalf]}
                            keyboardType="decimal-pad"
                            value={price}
                            onChangeText={setPrice}
                        />
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.formButton, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.formButton, styles.addButton]}
                            onPress={handleAddItem}
                        >
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            ) : (
                <View>
                    <TouchableOpacity
                        style={styles.customBtn}
                        onPress={() => setFormVisible(true)}
                    >
                        <Text style={styles.customBtnText}> + Adicionar Item </Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    textLabel: {
        fontSize: 16,
        color: theme.colors.text,
        paddingRight: 5,
    },
    customBtn: {
        backgroundColor: theme.colors.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
    },
    customBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputHalf: {
        width: '48%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    formButton: {
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
    },
    addButton: {
        backgroundColor: theme.colors.primary,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});