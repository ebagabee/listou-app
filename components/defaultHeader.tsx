import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings2 } from "lucide-react-native";

export default function DefaultHeader() {
    return (
        <SafeAreaView>
            <View style={{ padding: 10, paddingHorizontal: 16, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: 800 }}>Listou</Text>
                <Settings2 size={26} />
            </View>
        </SafeAreaView>
    )
}