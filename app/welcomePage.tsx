
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomePage() {
    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontSize: 30, fontFamily: 'Nunito_400Regular' }}>Welcome Page</Text>
            </View>
        </SafeAreaView>
    );
}
