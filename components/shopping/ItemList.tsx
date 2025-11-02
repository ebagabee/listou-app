import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import theme from "../../app/theme";
import { Pencil, Trash } from "lucide-react-native";

interface ItemListProps {
    name: string,
}

export default function ItemList({ name }: ItemListProps) {
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                style={styles.checkbox}
                color={isChecked ? theme.colors.primary : undefined
                }></Checkbox>
            <View>
                <Text style={styles.name}>{name}</Text>
                <View>
                    <Text style={styles.info}> Qtd: 4 | R$ 40,00 </Text>
                </View>
            </View>
            </View>

            {/* TODO: Adicionar os botoes aqui */}
            <View style={styles.actionBtns}>
                <Pencil color={theme.colors.text2}/> 
                <Trash color={theme.colors.negative}/>
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