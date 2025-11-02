import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Settings2 } from "lucide-react-native";
import theme from "../app/theme";

interface propsInterface  {
    title?: string;
    back?: boolean;
    settings?: boolean;
}

export default function DefaultHeader({title, back, settings = true}: propsInterface) {
     return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.headerContainer}>
                {back ? <ArrowLeft /> : null}
                <Text style={styles.logoText}>{title ? title : 'L i s t o u'}</Text>
                {settings ? <Settings2 size={26} color={theme.colors.text}/> : null }
             </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 3.84,
        elevation: 5,
},
    headerContainer: {
        padding: 16,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoText: {
        fontSize: 20,
        fontStyle: "italic",
         fontWeight: "800",
         color: theme.colors.text,
    }
});