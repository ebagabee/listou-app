import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import WelcomeHero from "../assets/images/welcome-hero.png";
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomePage() {
    const { theme } = useTheme();

    const style = StyleSheet.create({
        safeArea: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            paddingVertical: 30
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
            color: theme.colors.text,
        },
        subtitle: {
            fontSize: 20,
            fontFamily: 'Nunito_400Regular',
            textAlign: 'center',
            color: theme.colors.text,
        },
        highlightedText: {
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        heroImage: {
            width: 305,
            height: 285,
            objectFit: "contain"
        },
        custonButton: {
            padding: 14,
            borderRadius: 40,
            width: 300
        }
    });
    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.container}>
                <Text style={style.title}>
                    Crie a sua{'\n'}<Text style={{ color: theme.colors.primary }}>Lista de Compras</Text>
                </Text>

                <Text style={style.subtitle}>
                    Com o <Text style={style.highlightedText}>Listou</Text>, você pode criar{'\n'}
                    e organizar suas compras com{'\n'}
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>facilidade</Text>
                </Text>
            </View>
            <Image source={WelcomeHero} style={style.heroImage}></Image>
            <TouchableOpacity>
                <LinearGradient
                    colors={theme.colors.primaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={style.custonButton}
                >
                    <Link href="homePage" style={{ color: "#fff", fontSize: 20, textAlign: 'center', fontFamily: 'Nunito_700Bold' }}>
                        Criar minha lista!
                    </Link>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

