import { Text, View, StyleSheet, Pressable } from "react-native";
import { MoreVertical, Trash } from "lucide-react-native";
import { useState } from "react";
import theme from "../app/theme";

interface ListCardProps {
    title: string;
    itemsPreview: string;
    onPress: () => void;
    onDelete: () => void;
}

export default function ListCard({ title, itemsPreview, onPress, onDelete }: ListCardProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleDeletePress = () => {
        setMenuVisible(false);
        onDelete();
    };

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

            <Pressable style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
                <MoreVertical size={24} color={theme.colors.text} />
            </Pressable>

            {menuVisible && (
                <View style={styles.menu}>
                    <Pressable style={styles.menuItem} onPress={handleDeletePress}>
                        <View style={styles.menuItemContent}>
                            <Text style={styles.menuText}>Excluir</Text>
                            <Trash size={18} />
                        </View>
                    </Pressable>
                </View>
            )}
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
        width: '96%',
        elevation: 2,
        borderWidth: 0.1,
        borderColor: '#f5f5f5ff',
        marginVertical: 8,
        alignSelf: 'center',
        overflow: 'visible',
        zIndex: 1,
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
        color: theme.colors.text3,
        fontWeight: '500',
    },
    menuButton: {
        justifyContent: 'center',
        padding: 4,
        zIndex: 3,
    },

    menu: {
        position: 'absolute',
        top: 45,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 6,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 2,
    },
    menuItem: {
    },
    menuItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    menuText: {
        fontSize: 16,
        marginRight: 8
    }
});