import { Text, View, StyleSheet, Pressable } from "react-native";
import { MoreVertical } from "lucide-react-native";
import theme from "../app/theme";

interface ListCardProps {
    title: string;
    itemsPreview: string;
    onPress: () => void;
    onPressMenu: () => void;
}

export default function ListCard({ title, itemsPreview, onPress, onPressMenu }: ListCardProps) {
    return (
        <View style={styles.card}>
            <Pressable style={styles.mainContent} onPress={onPress}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {itemsPreview}
                </Text>
            </Pressable>

            <Pressable style={styles.menuButton} onPress={onPressMenu}>
                <MoreVertical size={24} color={theme.colors.text} />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: '100%',
        elevation: 2,
        borderWidth: 0.1,
        borderColor: '#f5f5f5ff',
        marginVertical: 8,
    },
    mainContent: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 14,
        color:  theme.colors.text3,
        fontWeight: '500',
    },
    menuButton: {
        justifyContent: 'center',
    }
});