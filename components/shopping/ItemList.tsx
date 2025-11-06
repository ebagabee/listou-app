import { StyleSheet, Text, View, Pressable } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { Pencil, Trash, Check } from "lucide-react-native";
import { ItemListInterface } from "../../types/list";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

interface ItemListProps {
    item: ItemListInterface;
    onToggleChecked: (itemId: number, newCheckedState: boolean) => void;
    onEditClicked: (currentItem: ItemListInterface) => void;
    onDeleteItem: (itemId: number) => void;
}

export default function ItemList({ item, onToggleChecked, onEditClicked, onDeleteItem }: ItemListProps) {
    const { theme } = useTheme();
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 6,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.isDark ? '#333' : '#eaeaea',
            marginBottom: 8,
        },
        leftContainer: {
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            flex: 1,
        },
        name: {
            fontSize: 18,
            fontWeight: '400',
            marginLeft: 2,
            color: theme.colors.text,
        },
        nameChecked: {
            textDecorationLine: 'line-through',
            color: theme.colors.text2,
        },
        info: {
            fontSize: 14,
            color: theme.colors.text2,
            fontWeight: '400',
        },
        checkbox: {
            padding: 10,
            marginRight: 8,
        },
        actionBtns: {
            flexDirection: 'row',
            gap: 24,
        },
        actionButton: {
            padding: 4,
        },
        pressed: {
            opacity: 0.6,
        },
    });

    const handleValueChange = () => {
        onToggleChecked(item.id, !item.is_checked);
    };

    const handleEdit = () => {
        onEditClicked(item);
    };

    const handleDeletePress = () => {
        setConfirmingDelete(true);
    };

    const handleConfirmDelete = () => {
        onDeleteItem(item.id);
        setConfirmingDelete(false);
    };

    const handleCancelDelete = () => {
        setConfirmingDelete(false);
    };

    const quantity = item.quantity || 0;
    const price = (item.price || 0) * quantity;
    const infoText = `Qtd: ${quantity} | R$ ${price.toFixed(2).replace('.', ',')}`;

    return (
        <View style={[styles.container, item.is_checked && { opacity: 0.6 }]}>
            <View style={styles.leftContainer}>
                <Checkbox
                    value={item.is_checked}
                    onValueChange={handleValueChange}
                    style={styles.checkbox}
                    color={item.is_checked ? theme.colors.primary : theme.colors.text3}
                />
                <View style={{ flex: 1 }}>
                    <Text style={[styles.name, item.is_checked && styles.nameChecked]}>
                        {item.name}
                    </Text>
                    <Text style={styles.info}>{infoText}</Text>
                </View>
            </View>

            <View style={styles.actionBtns}>
                {!confirmingDelete ? (
                    <>
                        <Pressable
                            onPress={handleEdit}
                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                            accessibilityRole="button"
                            accessibilityLabel="Editar item"
                        >
                            <Pencil size={20} color={theme.colors.text2} />
                        </Pressable>
                        <Pressable
                            onPress={handleDeletePress}
                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                            accessibilityRole="button"
                            accessibilityLabel="Excluir item"
                        >
                            <Trash size={20} color={theme.colors.negative} />
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Pressable
                            onPress={handleCancelDelete}
                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                            accessibilityRole="button"
                            accessibilityLabel="Cancelar exclusão"
                        >
                            <Trash size={20} color={theme.colors.text3} />
                        </Pressable>
                        <Pressable
                            onPress={handleConfirmDelete}
                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                            accessibilityRole="button"
                            accessibilityLabel="Confirmar exclusão"
                        >
                            <Check size={20} color="#22c55e" strokeWidth={3} />
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    );
}