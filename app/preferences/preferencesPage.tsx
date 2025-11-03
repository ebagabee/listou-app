import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function PreferencesPage() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 18, color: theme.colors.text },
  });
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.text}>oi</Text>
      </View>
    </SafeAreaView>
  );
}

