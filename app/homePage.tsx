
import { Plus } from 'lucide-react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomePage() {
    return (
        <View>
            <Text>Home</Text>

            <TouchableOpacity style={styles.btn}>
                <Plus size={30} color={"#FFF"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 40,
        right: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    }
})