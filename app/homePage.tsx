import { View, Text, StyleSheet, ScrollView } from 'react-native';
import theme from '../app/theme';
import ListCard from '../components/ListCard';

export default function HomePage() {
    return (
        <ScrollView style={styles.container}>

            <ListCard
                title="Churrasco Fim de Semana"
                itemsPreview="Picanha, Linguiça, Pão de Alho, Cerveja"
                onPress={() => console.log("Abrir Churrasco")}
                onPressMenu={() => console.log("Menu Churrasco")}
            />
            
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        margin: 16,
        marginTop: 24,
    }
});