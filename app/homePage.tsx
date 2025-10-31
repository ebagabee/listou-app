import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import theme from '../app/theme';
import ListCard from '../components/ListCard';
import { Plus } from 'lucide-react-native';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ListCard
                    title="Churrasco Fim de Semana"
                    itemsPreview="Picanha, Linguiça, Pão de Alho, Cerveja"
                    onPress={() => console.log("Abrir Churrasco")}
                    onPressMenu={() => console.log("Menu Churrasco")}
                />
            </ScrollView>

            <TouchableOpacity style={styles.actionBtn}>
                <Plus size={24} color="white" />
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingTop: 16,
        paddingHorizontal: 10,
        paddingBottom: 100,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        margin: 16,
        marginTop: 24,
    },
    actionBtn: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: theme.colors.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
    }
});