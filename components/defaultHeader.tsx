import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings2 } from "lucide-react-native";
import theme from "../app/theme";

export default function DefaultHeader() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.headerContainer}>
                <Text style={styles.logoText}>L i s t o u</Text>
                <Settings2 size={26} color={theme.colors.text} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        padding: 16,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderBottomColor: 'rgba(0, 0, 0, 0.10)',
        borderBottomWidth: 1,
    },
    logoText: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "800",
        color: theme.colors.text,
    }
});