import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function ListDetailPage() {
    const params = useLocalSearchParams();

    const { id, listName } = params;

    return (
        <View style={styles.container}>
            <Text>
                {listName ? String(listName) : 'Carregando...'}
            </Text>

            <Text>ID da Lista: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
    }
})