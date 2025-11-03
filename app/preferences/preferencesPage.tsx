import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function PreferencesPage() {
  const { theme } = useTheme();
  const { setAppTheme } = useTheme();
  
  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 18, color: theme.colors.text },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setAppTheme("#3498DB")}>
        <Text>Mudar para Azul </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setAppTheme("#FF730F")}>
        <Text>Mudar para Laranja (Padrão) </Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

