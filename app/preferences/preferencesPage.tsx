import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

// Interface para definir os tipos das props
interface ThemeOptionProps {
  color: string;
  label: string;
}

export default function PreferencesPage() {
  const { theme, setAppTheme } = useTheme();

  const THEME_BLUE = "#3498DB";
  const THEME_ORANGE = "#FF730F";

  const activeColor = theme.colors.primary;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background || "#f5f5f5",
      padding: 24,
    },
    header: {
      marginBottom: 32,
      marginTop: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.6,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 16,
    },
    themeButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: "transparent",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    themeButtonActive: {
      borderColor: theme.colors.primary,
    },
    colorPreview: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
    },
    themeButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
    activeLabel: {
      marginLeft: "auto",
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
  });

  const ThemeOption = ({ color, label }: ThemeOptionProps) => {
    const isActive = activeColor === color;

    return (
      <TouchableOpacity
        style={[styles.themeButton, isActive && styles.themeButtonActive]}
        onPress={() => setAppTheme(color)}
        activeOpacity={0.8}
        disabled={isActive}
      >
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        <Text style={styles.themeButtonText}>{label}</Text>
        {isActive && (
          <Text style={styles.activeLabel}>Ativo</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Preferências</Text>
        <Text style={styles.subtitle}>Personalize a aparência do app</Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Cor Principal</Text>
        
        <ThemeOption color={THEME_BLUE} label="Azul Oceano" />
        <ThemeOption color={THEME_ORANGE} label="Laranja (Padrão)" />
      </View>
    </View>
  );
}