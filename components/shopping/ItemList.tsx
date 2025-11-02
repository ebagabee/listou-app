import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from 'expo-checkbox';
import theme from "../../app/theme";
import { Pencil, Trash } from "lucide-react-native";
import { ItemListInterface } from "../../types/list";

interface ItemListProps {
    item: ItemListInterface; 
    onToggleChecked: (itemId: number, newCheckedState: boolean) => void;
}

export default function ItemList({ item, onToggleChecked }: ItemListProps) {

    const handleValueChange = () => {
        onToggleChecked(item.id, !item.is_checked);
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
                    color={item.is_checked ? theme.colors.primary : undefined}
                />
                <View>
                    <Text style={[styles.name, item.is_checked && styles.nameChecked]}>
                        {item.name}
                    </Text>
                    <Text style={styles.info}>{infoText}</Text>
                </View>
            </View>

            <View style={styles.actionBtns}>
                <Pencil color={theme.colors.text2} />
                <Trash color={theme.colors.negative} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eaeaeaff',
        marginBottom: 8,
    },
    leftContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 2,
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
    }
});