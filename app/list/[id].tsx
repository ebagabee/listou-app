import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

export default function ListDetailPage() {
    const params = useLocalSearchParams();

    const { id, listName } = params;

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text>4 Items </Text>

                <Text>Total: R$9890 </Text>
            </View>

            <View>
                <TouchableOpacity style={styles.customBtn}>
                    <Text style={styles.btnText}> + Adicionar Item </Text>
                </TouchableOpacity>
            </View>
        </View>
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
    },

    customBtn: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
    },

    btnText: {
        textAlign: 'center',
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: 700,
    }
})