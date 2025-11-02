import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from 'expo-checkbox';
import theme from "../../app/theme";
import { Pencil, Trash } from "lucide-react-native";

type Item = {
    id: number;
    name: string;
    price?: number;
    quantity?: number;
    is_checked: boolean;
};

interface ItemListProps {
    item: Item; 
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
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Checkbox
                    value={item.is_checked}
                    onValueChange={handleValueChange}
                    style={styles.checkbox}
                    color={item.is_checked ? theme.colors.primary : undefined}
                />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <View>
                        <Text style={styles.info}>{infoText}</Text>
                    </View>
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
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 400,
        marginLeft: 2,
    },
    info: {
        fontSize: 12,
        color: theme.colors.text2,
        fontWeight: 400,
    },
    checkbox: {
        padding: 10
    },
    actionBtns: {
        flexDirection: 'row',
        gap: 6
    }
});