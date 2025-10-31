import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import theme from "../../app/theme";

interface ItemListProps {
    name: string,
}

export default function ItemList({ name }: ItemListProps) {
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                style={styles.checkbox}
                color={isChecked ? theme.colors.primary : undefined
                }></Checkbox>
            <Text>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
    checkbox: {
        padding: 10
    }
});