import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from "./theme"
import WelcomeHero from "../assets/images/welcome-hero.png";

export default function WelcomePage() {
    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.container}>
                <Text style={style.title}>
                    Crie a sua{'\n'}<Text style={{ color: theme.colors.primary }}>Lista de Compras</Text>
                </Text>

                <Text style={style.subtitle}>
                    Com o Listou, você pode criar{'\n'}
                    e organizar suas compras com{'\n'}
                    facilidade
                </Text>
            </View>
            <Image source={WelcomeHero} style={style.heroImage}></Image>

            <TouchableOpacity style={style.custonButton}>
                <Text style={{ color: "#fff", fontSize: 20, textAlign: 'center', fontFamily: 'Nunito_700Bold' }}>
                    Criar minha lista!
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Nunito_700Bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        color: '#555',
    },
    heroImage: {
        width: 350,
        objectFit: "contain"
    },
    custonButton: {
        padding: 14,
        backgroundColor: '#FF5900',
        borderRadius: 40,
        width: 300
    }
});