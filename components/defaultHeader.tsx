import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Settings2 } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRouter } from "expo-router";

interface propsInterface {
  title?: string;
  back?: boolean;
  settings?: boolean;
}

export default function DefaultHeader({ title, back, settings = true }: propsInterface) {
  const navigation = useNavigation();
  const router = useRouter();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.card,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: theme.isDark ? 0.3 : 0.08,
      shadowRadius: 3.84,
      elevation: 5,
      borderBottomWidth: theme.isDark ? 1 : 0,
      borderBottomColor: '#333',
    },
    headerContainer: {
      padding: 16,
      paddingHorizontal: 16,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      backgroundColor: theme.colors.card,
    },
    logoText: {
      fontSize: 20,
      fontWeight: "500",
      color: theme.colors.text,
    }
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {back ? (
            <Pressable onPress={() => (navigation as any).goBack()} hitSlop={8}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </Pressable>
          ) : null}
          <Text style={styles.logoText}>{title ? title : "Listou App"}</Text>
        </View>

        {settings ? (
          <Pressable onPress={() => router.push("/preferences/preferencesPage")} hitSlop={8}>
            <Settings2 size={26} color={theme.colors.text} />
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}